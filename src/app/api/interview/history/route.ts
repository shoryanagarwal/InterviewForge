import {NextResponse} from "next/server";
import {auth} from "@/auth"
import {prisma} from "@/lib/prisma";

export async function GET(){
    try{
        const session=await auth();

        if(!session?.user?.id){
            return NextResponse.json({message:"Unauthorized"}, {status:401});
        }

        const interviews=await prisma.interview.findMany({
            where:{
                userId:session.user.id
            },
            orderBy:{
                createdAt:"desc"
            },
            select:{
                 id: true,
                role: true,
                interviewType: true,
                difficulty: true,
                status: true,
                score: true,
                numberOfQuestions: true,
                createdAt: true,
            }
        })

        return NextResponse.json({
            message:"Interviews fetched successfully",
            interviews
        },
        {status:200})



    }
    catch(error){
        console.error(error);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}
