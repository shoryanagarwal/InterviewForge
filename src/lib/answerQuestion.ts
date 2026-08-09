import {groq} from "@/lib/groq"




export async function answerQuestion({question,expectedAnswer,userAnswer}:{question:string,expectedAnswer:string,userAnswer:string}){

    const completion=await groq.chat.completions.create({
        messages: [
      {
        role: "system",
        content: `
            You are an expert technical interviewer.

            Evaluate the candidate's answer against the given question and expected answer.

            Return ONLY valid JSON in this exact format:
            {
            "score": number,
            "feedback": string
            }

            Score must be between 0 and 10.
            Give concise but useful feedback explaining what was good and what could be improved.
        `,
      },
      {
        role: "user",
        content: `
Question:
${question}

Expected Answer:
${expectedAnswer}

Candidate Answer:
${userAnswer}
        `,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    })



    const response=completion.choices[0].message?.content

    if(!response){
        throw new Error("No response from the model")
    }

    return JSON.parse(response) as {score:number,feedback:string}
   



}