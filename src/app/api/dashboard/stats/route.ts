import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(request:Request){

    try{

        const session=await auth();


        if(!session?.user?.id){
            return NextResponse.json({error:"Unauthorized"}, {status:401});
        }
        
        const userId=session.user.id;

        const response=await prisma.interview.findMany({
            where:{
                userId:userId
            },
            select:{
                status:true,
                score:true,
                createdAt:true,
                questions:{
                    select:{
                       status:true
                    }
                }
            }
        });


        const totalInterviews=response.length;
        const completedInterviews=response.filter(interview=>interview.status==="COMPLETED").length;

        const now=new Date();

        const interviewThisMonth=response.filter(interview=>{
            const createdAt=interview.createdAt;
            return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
        }).length

        const questionsAttempted=response.reduce((total,interview)=>{
            return (total+interview.questions.filter((question)=>question.status==="ANSWERED").length);
        }, 0)
            
        const completedScores=response.filter((interview)=>interview.status==="COMPLETED" && interview.score!==null).map((interview)=>interview.score as number);      

        const averageScore=completedScores.length>0?Math.round((completedScores.reduce((total,score)=>total+score,0)/completedScores.length)):0;


        return NextResponse.json({
            totalInterviews:totalInterviews,
            completedInterviews:completedInterviews,
            interviewThisMonth:interviewThisMonth,
            questionsAttempted:questionsAttempted,
            averageScore:averageScore
        });
    }

    catch(error){
        console.error("Error fetching interview status:",error);
        return NextResponse.json({error:"Failed to fetch interview status"}, {status:500});


    }



}