import {groq} from "@/lib/groq"


type Question={
  role: string;
  difficulty: string;
  interviewType: string;
  questionCount: number;
}



export async function generateQuestion({
    role,difficulty,interviewType,questionCount
}:Question){

    const prompt=`You are an expert interviewer conduction a ${interviewType} interview.

    Genrate exactly ${questionCount} interview questions for the following role:
    role: ${role}
    difficulty: ${difficulty}
    interviewType: ${interviewType}

    Requirements:
    - Questions must be relevant to the role.
    - Match the requested difficulty.
    - Do not repeat questions.
    - Cover different relevant topics.
    - Each question must have a clear expected answer.
    - Keep expected answers concise but technically accurate.
    - Return ONLY valid JSON.
    - Do not include markdown or code fences.



        Return the following JSON structure:

        [
        {
            "topic": "string",
            "question": "string",
            "expectedAnswer": "string"
        }
        ]

    `
        
    const completion=await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        messages:[
            {
                role:"system",
                content:"You are a helpful assistant that generates interview questions."
            },
            {
                role:"user",
                content:prompt
            }
        ]
    })

    const content=completion.choices[0].message?.content

    if(!content){
        throw new Error("No content returned from the model.")
    }
    return JSON.parse(content)
}


