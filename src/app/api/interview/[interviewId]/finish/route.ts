import {auth} from "@/auth"
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {evaluateAnswers} from "@/lib/answerEvaluation"

export async function POST(req:Request,{params}:{params:Promise<{interviewId:string}>}){

    try{

        //session check
        const session =await auth();

        if(!session?.user?.id){
          return  NextResponse.json({message:"Unauthorized"}, {status:401})
        }

        const {interviewId} = await params;
        const response=await prisma.interview.findUnique({
            where:{
                id:interviewId,
                userId:session?.user?.id
            },
            include:{
                questions:{
                    orderBy:{
                        questionNumber:"asc"
                    }
                }
            }
        })


        if(!response){
            return NextResponse.json({message:"Interview not found"}, {status:404})
        }

        //fetching questions with score and feedback

        await prisma.question.updateMany({
            where:{
                interviewId:interviewId,
               status:"PENDING",
            },
            data:{
                status:"MISSED"
            }
        })


        const totalscore=response.questions.reduce((sum,q)=>sum+(q.score??0),0);
        const averageScore=response.questions.length>0?totalscore/response.questions.length:0;

        const evaluation=response.questions.map((q)=>({
            question:q.question,
            score:q.score,
            feedback:typeof q.feedback==="string"?q.feedback:JSON.stringify(q.feedback)
        }))
        const finalcall=await evaluateAnswers(evaluation);

        const updateInterview=await prisma.interview.update({
            where:{
                id:interviewId

            },
            data:{
                status:"COMPLETED",
                score:Math.round(averageScore),
                feedback:finalcall
            }
        })

        return NextResponse.json({
            message:"Interview completed successfully",
            interview:updateInterview,

        },
       { status:200}
    )



    }

    catch(error){

        console.error(error);
        return NextResponse.json({message:"Internal Server Error"}, {status:500})

    }







}