import {NextResponse} from "next/server";
import {auth} from "@/auth"
import {prisma} from "@/lib/prisma"

type Props={
    params:Promise<{interviewId:string}>
}


export async function GET(req:Request , {params}:Props){
    try{
        const session =await auth();

        if(!session?.user?.id){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }

        const {interviewId}=await params;
        const response = await prisma.interview.findUnique({
            where:{
                id:interviewId,
                userId:session.user.id

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
            return NextResponse.json(
                {message: "Interview not found"},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: "Interview fetched successfully",response},
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