import {groq} from "@/lib/groq"

type GenerateQuestionParams = {
  role: string;
  difficulty: string;
  interviewType: string;
  batchSize: number;
  resumeText: string | null;
  batchNumber: number;
  totalBatches: number;
};


export async function generateQuestionBatch({
  role,
  difficulty,
  interviewType,
  batchSize,
  resumeText,
  batchNumber,
  totalBatches,
}: GenerateQuestionParams) {
  const prompt = `
You are an expert technical interviewer designing a realistic ${interviewType} interview.

Your task is to generate exactly ${batchSize} unique interview questions for the following candidate configuration.

TARGET ROLE:
${role}

DIFFICULTY:
${difficulty}

INTERVIEW TYPE:
${interviewType}

This is batch ${batchNumber} of ${totalBatches}.
Generate only ${batchSize} questions in this batch.
Do not repeat questions that are likely to appear in other batches.

${
  resumeText
    ? `
CANDIDATE RESUME:
${resumeText}

RESUME PERSONALIZATION RULES:
- Use the resume as a source of factual context about the candidate.
- You MUST NOT invent any project, technology, internship, responsibility, achievement, skill, or experience that is not explicitly supported by the resume.
- Some questions should be personalized around projects, technologies, architecture decisions, implementation details, challenges, trade-offs, debugging, scalability, or lessons learned mentioned in the resume.
- Resume-based questions must still be relevant to the target role and interview type.
- Do not make every question resume-specific. Combine role-based questions with resume-based questions.
`
  : `
No resume was provided.
Generate questions only from the target role, interview type, and difficulty.
`
}

GENERAL QUESTION QUALITY RULES:
- Every question must be realistic for an actual software engineering interview.
- Questions must match the requested difficulty.
- Questions must test understanding, reasoning, problem solving, or practical engineering judgment.
- Avoid trivial questions.
- Avoid duplicate concepts unless they test clearly different skills.
- Cover different relevant topics across the batch.
- Do not ask questions unrelated to the target role.
- Do not make assumptions about the candidate that are not supported by the provided information.

INTERVIEW TYPE RULES:

TECHNICAL INTERVIEW:
Generate conceptual and practical technical questions.

For MERN / Full Stack roles, relevant areas include:
- JavaScript
- TypeScript
- React
- Next.js
- Node.js
- Express.js
- MongoDB
- PostgreSQL
- REST APIs
- Authentication and authorization
- JWT
- WebSockets and Socket.IO
- asynchronous programming
- event loop
- caching
- database design
- indexing
- transactions
- performance optimization
- security
- error handling
- debugging
- backend architecture
- frontend architecture
- system design fundamentals

Technical questions should focus on:
- Why something works
- How something works internally
- Trade-offs
- When to choose one approach over another
- Real-world engineering decisions
- Debugging and performance scenarios

DO NOT generate:
- competitive programming problems
- DSA problems
- "write a function" questions
- simple array/string manipulation tasks
- Input/Output/Constraints sections
- trivial syntax questions

Examples of good technical questions:
- Explain how Node.js handles asynchronous I/O.
- What happens in the JavaScript event loop when a Promise is resolved?
- How would you prevent unnecessary React re-renders?
- What is the difference between authentication and authorization?
- When would you choose PostgreSQL instead of MongoDB?
- How does JWT authentication work and what are its security risks?
- How would you scale a Socket.IO based application?
- What is database indexing and when can an index hurt performance?

CODING INTERVIEW:
Generate actual algorithmic programming / DSA problems.

The problem must require the candidate to design and implement an algorithm.

Prefer common DSA patterns such as:
- arrays
- strings
- hashing
- two pointers
- sliding window
- binary search
- stacks
- queues
- linked lists
- trees
- heaps
- graphs
- BFS
- DFS
- greedy algorithms
- recursion
- backtracking
- dynamic programming
- disjoint set union

Difficulty requirements:
- EASY: straightforward use of a known data structure or basic algorithm.
- MEDIUM: requires combining ideas, careful edge cases, or non-trivial optimization.
- HARD: requires deeper algorithmic reasoning, multiple techniques, or advanced optimization.

DO NOT generate:
- React implementation tasks
- Node.js implementation tasks
- Express/API tasks
- MongoDB queries
- simple JavaScript syntax tasks
- basic arithmetic
- simple object property access
- one-line function exercises

Every coding question MUST contain:

Problem Statement:
A complete competitive-programming-style description of the problem.

Input:
The exact input format.

Output:
The exact output format.

Constraints:
At least 2 meaningful constraints that are consistent with the algorithm.

Example 1:
Input:
A complete valid input.

Output:
The correct output.

Example 2:
Input:
A complete valid input.

Output:
The correct output.

The coding question must be detailed enough that another programmer can implement a solution without asking for clarification.

EXPECTED ANSWER FOR CODING:
Explain the intended algorithm, key idea, time complexity, and space complexity.
Do not provide a full code solution unless explicitly requested.

BEHAVIORAL INTERVIEW:
Generate realistic behavioral and situational interview questions.

Focus on:
- teamwork
- leadership
- conflict resolution
- communication
- ownership
- failure
- handling ambiguity
- time management
- decision making
- learning
- adapting to new technology
- project challenges
- handling pressure

When the resume contains relevant projects or experiences:
- personalize behavioral questions around those experiences
- ask about the candidate's role, decisions, challenges, outcomes, or lessons learned
- do not invent responsibilities

DO NOT generate coding problems.
DO NOT generate purely theoretical technical questions.

QUESTION DISTRIBUTION:
When a resume is provided, aim for approximately 60-70% role/interview-type questions and 30-40% resume-personalized questions.
The exact distribution may vary when the batch size is small, but resume personalization should be visible.

OUTPUT REQUIREMENT:
Return exactly ${batchSize} questions.

Each question must contain:
- topic
- question
- expectedAnswer

The question text for coding problems must preserve all required sections and line breaks.

Do not output explanations outside the structured response.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content:
          "You are an expert interviewer that generates structured interview questions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "interview_questions",
        strict: true,
        schema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  topic: { type: "string" },
                  question: { type: "string" },
                  expectedAnswer: { type: "string" },
                },
                required: [
                  "topic",
                  "question",
                  "expectedAnswer",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["questions"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No content returned from Groq");
  }

  const parsed = JSON.parse(content);

  return parsed.questions;
}