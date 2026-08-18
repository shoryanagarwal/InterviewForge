import {NextResponse} from "next/server";
import {auth} from "@/auth"
import {prisma} from "@/lib/prisma"


export async function GET(req:Request,{params}:{params:Promise<{interviewId:string}>}){


    try{
            // session check;
            const session =await auth();

            if(!session?.user?.id){

                return NextResponse.json({message:"Unauthorized"}, {status:401})
            }

            const {interviewId} = await params;
            const interview=await prisma.interview.findUnique({
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


            if(!interview){
                return NextResponse.json({message:"Interview not found"}, {status:404})
            }

            const questions=interview?.questions.filter((ques)=>ques.score!==null);
            const averageScore= questions.length > 0?questions.reduce((sum,q)=>sum+(q.score??0),0)/questions.length : 0;

            return NextResponse.json({
                interview:{
                    id:interview.id,
                    role:interview.role,
                    difficulty:interview.difficulty,
                    interviewType:interview.interviewType,
                    feedback:interview.feedback
                },
                averageScore,
                questions:interview.questions


            })


    }
    catch(error){

        console.error(error);   
        return NextResponse.json({message:"Internal Server Error"}, {status:500})

    }




}