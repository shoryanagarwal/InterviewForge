import {NextResponse} from "next/server";
import{auth} from "@/auth"
import {prisma} from "@/lib/prisma"

import {answerQuestion} from "@/lib/answerQuestion"

export async function POST(req:Request,
    {params}:{params:Promise<{interviewId:string , questionsId:string}>}

){

    try{
        const session =await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }

        const {interviewId,questionsId}=await params;

        const response= await prisma.interview.findFirst({
            where:{
                id:interviewId,
                userId:session.user.id

            }
        })

        if(!response){
            return NextResponse.json(
                {message: "Interview not found"},
                {status: 404}
            )
        }

        const question =await prisma.question.findFirst({
            where:{
                id:questionsId,
                interviewId:interviewId
            }
        })
        if(!question){
            return NextResponse.json(
                {message: "Question not found"},
                {status: 404}
            )
        }

        const body = await req.json();

        const {userAnswer}=body;
        
        if(!userAnswer){
            return NextResponse.json(
                {message: "Missing required fields"},
                {status: 400}
            )
        }
        

       const evaluate=await answerQuestion({
            question:question.question,
            expectedAnswer:question.expectedAnswer,
            userAnswer:userAnswer
        })


        const {score,feedback}=evaluate;


       
        const updatedAnswer=await prisma.question.update({
            where:{
                id:questionsId,
                interviewId:interviewId
            },
            data:{
                userAnswer:userAnswer,
                score:score,
                feedback:feedback,
                status:"ANSWERED"
            }
        })

        return NextResponse.json(
            {message: "Answer submitted successfully",data:updatedAnswer},
            {status: 200}
        )
            

            


    }
    catch(error){

        console.log(error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )


    }



}