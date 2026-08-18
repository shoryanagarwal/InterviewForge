import {groq} from "./groq"

type QuestionEvaluation={
    question:string;
    score:number|null;
    feedback:string|null;
}

export async function evaluateAnswers(evaluations:QuestionEvaluation[]){
    const evaluationText=evaluations.map((item,index)=>
       ` Question ${index + 1}:
        ${item.question}

        Score: ${item.score ?? 0}/10

        Feedback:
        ${item.feedback ?? "No feedback available."}
        ` 
 
    ).join("\n---\n"); // to separate each question evaluation with a line of dashes

    const prompt=
   ` You are an expert interview evaluator.

        Analyze the candidate's complete interview performance using the
        individual question scores and feedback provided below.

        ${evaluationText}

        Your task is to generate a concise but useful final performance report.

        Evaluate the candidate across:
        1. Overall performance
        2. Technical/problem-solving ability
        3. Understanding of concepts
        4. Quality of answers
        5. Consistency across questions

        Identify:
        - Overall feedback
        - Key strengths
        - Key weaknesses
        - Specific areas to improve

        IMPORTANT:
        - Base your evaluation ONLY on the provided question scores and feedback.
        - Do not invent information about the candidate.
        - Do not penalize the candidate for using a different valid approach.
        - Keep the feedback constructive and interview-oriented.
        - Be concise but specific.
        - Return ONLY valid JSON.
        - Do not use markdown.
        - Do not wrap the JSON in code fences.

        Return exactly this structure:

        {
        "overallFeedback": "string",
        "strengths": ["string", "string", "string"],
        "weaknesses": ["string", "string", "string"],
        "recommendations": ["string", "string", "string"]
        }
        `;


        const completion=await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            temperature:0.2,
            messages:[
                {
                    role:"system",
                    content:`
                    You are an expert interview evaluator.`
                },
                {
                    role:"user",
                    content:prompt
                }

            ]
        })

        const response =completion.choices[0].message?.content
        if(!response){
            throw new Error("No response from evaluation model")
        }

        const cleanedResponse=response.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedResponse) 
}