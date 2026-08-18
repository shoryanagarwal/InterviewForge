import {GetObjectCommand} from "@aws-sdk/client-s3"
import {s3Client} from "@/lib/s3"
import {parseResume} from "@/lib/resumeParse"


export async function ResumeText(key:string){

    
        const command=new GetObjectCommand({
            Bucket:process.env.AWS_S3_BUCKET_NAME,
            Key:key
        })

        const response=await s3Client.send(command)

        if(!response.Body){
             throw new Error("Resume file not found in S3");
        }


        const bytes=await response.Body.transformToByteArray();
        const buffer=Buffer.from(bytes)

        return await parseResume(buffer);
    
   

}