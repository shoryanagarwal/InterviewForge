import {NextResponse} from "next/server";
import {auth} from "@/auth"
import {prisma} from "@/lib/prisma"
import {generateQuestionBatch} from "@/lib/generateQuestion"
import {ResumeText} from "@/lib/getResumeText"


export async function POST(req: Request){
    console.log("Interview creation request received");
    try{
        const session = await auth();
        console.log(session)

        if(!session?.user?.id){
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }
            
        const body =await req.json();

        const {
            role,
            interviewType,
            difficulty,
            questionCount,
            resumeUrl
        } = body;

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
                resumeUrl: resumeUrl || null,


            }


        })

        let resumeText:string|null=null;

        if(resumeUrl){
             resumeText = await ResumeText(resumeUrl);

            console.log("========== RESUME TEXT ==========");
            console.log(resumeText);
            console.log("=================================");



        }

        const batchSize = 5;
const totalBatches = Math.ceil(
  questionCount / batchSize
);

const batches = [];

for (let i = 0; i < totalBatches; i++) {
  const remaining =
    questionCount - i * batchSize;

  const currentBatchSize = Math.min(
    batchSize,
    remaining
  );

  

  const batch = await generateQuestionBatch({
    role,
    difficulty,
    interviewType,
    batchSize: currentBatchSize,
    resumeText,
    batchNumber: i + 1,
    totalBatches,
  });

  batches.push(batch);
}

const questions = batches.flat();

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


        


      


    }
    catch(error){


        console.log(error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )

    }




}