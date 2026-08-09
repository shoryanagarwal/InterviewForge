import {NextResponse} from "next/server";
import {auth} from "@/auth"
import {prisma} from "@/lib/prisma"
import {generateQuestion} from "@/lib/generateQuestion"


export async function POST(req: Request){

    try{
        const session = await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
            
        const body =await req.json();

        const {role,interviewType,difficulty,questionCount} = body;

        if(!role || !interviewType || !difficulty || !questionCount){
            return NextResponse.json(
                {message: "Missing required fields"},
                {status: 400}
            )
        }

        const interview = await prisma.interview.create({
            data:{
                userId: session.user.id,
                role,
                interviewType,
                difficulty,
                numberOfQuestions:questionCount,


            }


        })

        const questions = await generateQuestion({
            role,
            difficulty,
            interviewType,
            questionCount
        })

        await prisma.question.createMany({
            data: questions.map((q:any,index:number)=>({
                interviewId:interview.id,
                topic:q.topic,
                question:q.question,
                expectedAnswer:q.expectedAnswer,
                questionNumber:index+1
            }))
        })

        return NextResponse.json(
            {message: "Interview created successfully",interview},
            {status: 201}
        )


        


        return NextResponse.json(
            {message: "Interview created successfully",interview},
            {status: 201}
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