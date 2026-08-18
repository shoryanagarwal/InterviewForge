import {groq} from "@/lib/groq"




export async function answerQuestion({question,expectedAnswer,userAnswer}:{question:string,expectedAnswer:string,userAnswer:string}){

    const completion=await groq.chat.completions.create({
        messages: [
      {
        role: "system",
        content: `
            You are an expert technical interviewer.

            Evaluate the candidate's answer against the given question and expected answer.
            Evaluate the candidate's answer based on correctness,
            approach, complexity, and whether it solves the given problem.

            Do not require the candidate to use the exact approach
            mentioned in expectedAnswer.

            For coding questions:
            - Accept multiple valid approaches.
            - Check whether the solution actually solves the problem.
            - Consider time and space complexity.
            - Give a score from 0-10.
            - Give concise feedback.

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
model: "openai/gpt-oss-120b",
    temperature: 0.2,
    })



    const response=completion.choices[0].message?.content

    if(!response){
        throw new Error("No response from the model")
    }

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleanedResponse) as {score:number,feedback:string}
   



}