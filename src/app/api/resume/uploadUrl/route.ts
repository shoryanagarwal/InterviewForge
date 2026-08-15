import {auth} from "@/auth"
import {s3Client} from "@/lib/s3"
import { PutObjectCommand} from "@aws-sdk/client-s3"
import { NextResponse} from "next/server"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"



export async function POST(req:Request){

    try{
        const session=await auth();

        if(!session?.user?.id){
            return NextResponse.json({error:"Unauthorized"}, {status:401})

        }


        const body=await req.json();

        const {fileName, fileType}=body;

        if(!fileName || !fileType){
            return NextResponse.json({error:"Missing fileName or fileType"}, {status:400})
        }

        if(fileType !== "application/pdf"){
            return NextResponse.json({error:"Invalid file type. Only PDF files are allowed."}, {status:400})
        }
        const key=`resumes/${session.user.id}/${Date.now()}-${fileName}`; 
        const command=new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key:key,
            ContentType:fileType,
        })

        const uploadUrl=await getSignedUrl(s3Client, command, {expiresIn:60})

        return NextResponse.json({uploadUrl, key})


    }
    catch(error){

        return NextResponse.json({error:"Internal Server Error"}, {status:500})

    }


}