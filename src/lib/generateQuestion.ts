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

   
const prompt = `
You are an expert interviewer conducting a ${interviewType} interview.

Generate exactly ${questionCount} interview questions for the following role:

Role: ${role}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

GENERAL REQUIREMENTS:
- Questions must be relevant to the role.
- Match the requested difficulty.
- Do not repeat questions.
- Cover different relevant topics.
- Each question must have a clear expected answer.
- Keep expected answers concise but technically accurate.
- Return ONLY valid JSON.
- Do NOT use markdown code fences.
- Do NOT add any text before or after the JSON.

IMPORTANT:
The format of the "question" field depends on the interview type.

IF INTERVIEW TYPE IS "CODING":

Generate an actual programming/DSA problem suitable for a coding interview.


CRITICAL RULES:
- The question MUST be a complete competitive-programming-style problem. 
- NEVER return a one-line problem statement.
- NEVER combine all sections into one paragraph. 
- The "question" string MUST contain line breaks between every section. 
- The problem must have a clear algorithmic solution.
- The problem must have a well-defined input and output format. 
- The constraints must be consistent with the problem. 
- Examples must be valid and consistent with the stated input/output format.
- Prefer common DSA patterns such as arrays, strings, hashing, two pointers, binary search, stacks, queues, linked lists, trees, graphs, heaps, greedy, or dynamic programming depending on difficulty. 
- Do not create unnecessarily complicated or ambiguous problems.

The "question" field MUST follow EXACTLY this structure:

Problem:
[Complete description of the problem]

Input:
[Exact input format]

Output:
[The exact output format.]

Constraints:
[Atleast 2 minimal constraints]

Example 1:
Input:
[Valid input for the problem]

Output:
[Valid output for the problem]

Example 2:
Input:
[Valid input for the problem]

Output:
[Valid output for the problem]

IMPORTANT: 
Each section MUST be separated using newline characters.

For example, this is VALID:

Problem: 
Given an array of N integers, find the maximum element in the array.

Input: 
The first line contains an integer N. 
The second line contains N space-separated integers.

Output: 
Print the maximum element in the array.

Constraints: 
1 <= N <= 100000 
-10^9 <= A[i] <= 10^9

Example 1: 
Input: 5 
1 7 3 9 2

Output: 9

Example 2: 
Input: 
4 
-5 -2 -10 -3 

Output: -2

This is INVALID: 

"Given an array of N integers, find the maximum element. Input: ... Output: ... Constraints: ... Examples: ..."

NEVER generate the invalid format. 

The problem must be solvable by writing code. Do not generate theoretical questions such as:
- What is a stack? 
- Explain binary search. 
- What is the time complexity of merge sort? 


Generate actual coding problems instead.
IMPORTANT JSON RULES:
- The response MUST be valid JSON that can be directly passed to JSON.parse().
- Inside the "question" string, use escaped newline characters (\n) instead of literal line breaks.
- Do not place literal line breaks inside JSON string values.
- Do not use unescaped double quotes inside string values.
- Return ONLY the JSON array.


JSON FORMAT:
Return exactly this structure:

[
  {
    "topic": "string",
    "question": "string",
    "expectedAnswer": "string"
  }
]
`;

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


