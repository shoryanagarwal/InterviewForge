import {auth} from "@/auth";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma"


export async function GET(request:Request){


    try{
        const session=await auth();

        if(!session?.user?.id){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }


        const userId=session.user.id;

        const response=await prisma.interview.findMany({
            where:{
                userId:userId
            },
            orderBy:{
                createdAt:"desc"
            },
            take:5,
            select:{
                id:true,
                status:true,
                score:true,
                role:true,
                difficulty:true,
                createdAt:true,
                numberOfQuestions:true
            }
        })

        return NextResponse.json(response);



    }

    catch(error){
        console.error("Error fetching recent interviews:",error);
        return NextResponse.json({error:"Failed to fetch recent interviews"},{status:500});
    }





}