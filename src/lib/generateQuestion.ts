import { groq } from "@/lib/groq";

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
You are an expert interviewer conducting a realistic software engineering interview.

Generate exactly ${batchSize} unique interview questions for the candidate.

TARGET ROLE:
${role}

DIFFICULTY:
${difficulty}

INTERVIEW TYPE:
${interviewType}

BATCH:
${batchNumber} of ${totalBatches}

Generate only ${batchSize} questions in this batch.
Do not intentionally repeat questions from other batches.

==================================================
ROLE SELECTION RULE
==================================================

The TARGET ROLE is the primary source for determining the technical domain
and subject matter of the interview.

The user may enter ANY role.

Examples include:
- MERN Stack Developer
- Full Stack Developer
- Frontend Developer
- Backend Developer
- React Developer
- Next.js Developer
- Node.js Developer
- Python Developer
- Java Developer
- C++ Developer
- Android Developer
- iOS Developer
- DevOps Engineer
- Cloud Engineer
- Data Analyst
- Data Engineer
- Machine Learning Engineer
- AI Engineer
- Software Engineer

These are only examples.

Do NOT restrict InterviewForge to MERN, JavaScript, React, Node.js,
or any other specific technology stack.

Infer the most relevant and commonly expected concepts, technologies,
tools, algorithms, and engineering practices from the TARGET ROLE.

For example:

If the role is MERN / Full Stack:
focus on relevant frontend, backend, APIs, databases,
authentication, real-time communication, and web engineering concepts.

If the role is Python Backend:
focus on Python, backend development, APIs, databases,
async programming, frameworks, testing, and backend architecture.

If the role is Java Backend:
focus on Java, OOP, collections, concurrency,
Spring/Spring Boot, REST APIs, databases, and JVM fundamentals.

If the role is ML Engineer:
focus on Python, machine learning fundamentals,
data preprocessing, model evaluation, feature engineering,
statistics, deployment, and ML systems.

If the role is DevOps Engineer:
focus on Linux, networking, Docker, CI/CD, cloud,
monitoring, infrastructure, and deployment.

These examples MUST NOT restrict the generator.
For any other role, determine the appropriate domain yourself.

Prefer widely expected concepts for the role.
Do not invent obscure technologies simply because they can sometimes
be associated with the role.

==================================================
DIFFICULTY RULES
==================================================

The difficulty should match a strong internship or junior candidate
unless the selected difficulty explicitly requires more.

EASY:
- Fundamental concepts.
- Commonly expected knowledge.
- Direct questions.
- Basic reasoning.
- No obscure terminology.
- No advanced internals.

MEDIUM:
- Appropriate for a strong internship or junior candidate.
- Concepts commonly expected in undergraduate interviews.
- May combine one or two familiar concepts.
- Moderate reasoning.
- Reasonable edge cases.
- Practical understanding.
- Do NOT require niche, obscure, or highly advanced knowledge.
- Do NOT make a question difficult merely by using advanced terminology.

HARD:
- Intended for strong candidates.
- Deeper reasoning.
- Multiple interacting concepts.
- Advanced optimization.
- Advanced architecture, algorithms, or system design when appropriate.
- Less common concepts may be used when relevant.

IMPORTANT:
If uncertain between two difficulty levels, choose the simpler one.

Difficulty must come from reasoning and complexity,
not from obscure terminology.

==================================================
RESUME RULES
==================================================

${
  resumeText
    ? `
CANDIDATE RESUME:
${resumeText}

Use the resume as factual context.

Rules:
- Never invent any project, technology, internship, responsibility,
  achievement, skill, or experience.
- Some questions should be personalized around projects, technologies,
  decisions, implementation details, challenges, debugging,
  trade-offs, scalability, or lessons explicitly supported by the resume.
- Resume-based questions must remain relevant to the TARGET ROLE
  and INTERVIEW TYPE.
- Resume familiarity does NOT automatically increase difficulty.
- If the resume contains an advanced technology, do not automatically
  ask an advanced question unless the selected difficulty allows it.
- Do not make every question resume-specific.
- Combine role-based questions with resume-based questions.
`
    : `
NO RESUME PROVIDED.

Generate questions using the TARGET ROLE,
INTERVIEW TYPE, and DIFFICULTY only.
`
}

==================================================
GENERAL QUALITY RULES
==================================================

- Every question must be realistic for an actual interview.
- Every question must match the selected difficulty.
- Questions must be relevant to the TARGET ROLE.
- Avoid trivial questions.
- Avoid obscure concepts unless appropriate for HARD difficulty.
- Avoid duplicate questions.
- Cover different topics across the batch.
- Do not assume candidate experience without resume evidence.
- Do not ask unrelated questions.
- Do not repeat the same underlying concept unnecessarily.

Before returning every question, internally verify:

1. Is it relevant to the target role?
2. Is it appropriate for the selected difficulty?
3. Would a strong internship/junior candidate reasonably be expected
   to know this for EASY or MEDIUM?
4. Is the question difficult because of reasoning rather than obscure knowledge?
5. Does it test useful interview knowledge?

If any answer is NO, replace the question.

==================================================
TECHNICAL INTERVIEW
==================================================

Generate conceptual and practical technical interview questions
specific to the TARGET ROLE.

Technical questions should test:

- understanding of important concepts
- how technologies work
- why a technology or approach is used
- practical engineering decisions
- trade-offs
- debugging
- performance
- security
- architecture
- common real-world problems

Select technical topics from the target role rather than from a
fixed technology list.

Examples only:

For web development:
frontend, backend, APIs, databases, authentication,
browser concepts, performance, networking, architecture.

For Python development:
Python fundamentals, backend frameworks, APIs,
databases, async programming, testing.

For Java development:
Java, OOP, collections, concurrency, Spring,
APIs, databases, JVM concepts.

For ML/AI:
Python, ML fundamentals, data processing,
model evaluation, feature engineering, deployment,
ML systems.

For DevOps:
Linux, networking, containers, CI/CD, cloud,
monitoring, infrastructure.

Again, these are examples only.

DO NOT generate:
- competitive programming problems
- DSA problems
- "write a function" tasks
- trivial syntax questions
- simple array manipulation exercises
- Input/Output/Constraints sections

==================================================
CODING INTERVIEW
==================================================

Generate actual programming and algorithmic problems.

The problem must require the candidate to design and implement
a solution.

Use algorithms and data structures appropriate for the selected difficulty.

EASY:
Prefer:
- arrays
- strings
- hashing
- simple two pointers
- basic stacks/queues
- basic linked lists

MEDIUM:
Prefer:
- arrays
- strings
- hashing
- sliding window
- two pointers
- binary search
- linked lists
- stacks/queues
- binary trees
- BFS/DFS
- heaps
- standard greedy
- basic backtracking
- introductory dynamic programming

Avoid for MEDIUM unless clearly justified:
- advanced graph algorithms
- advanced shortest path problems
- minimum spanning tree
- advanced dynamic programming
- graph DP
- advanced string algorithms
- highly complex backtracking

HARD:
May include:
- advanced graphs
- shortest-path algorithms
- MST / DSU
- advanced dynamic programming
- advanced data structures
- complex backtracking
- multi-technique algorithmic problems

DO NOT generate:
- React implementation tasks
- Node.js implementation tasks
- framework-specific implementation tasks
- database query tasks
- basic object property questions
- trivial JavaScript syntax exercises
- one-line coding exercises

Every coding question MUST contain:

Problem Statement:
A complete competitive-programming-style problem.

Input:
The exact input format.

Output:
The exact output format.

Constraints:
At least 2 meaningful constraints consistent with the problem.

Example 1:
Input:
Complete valid input.

Output:
Correct output.

Example 2:
Input:
Complete valid input.

Output:
Correct output.

CODING FORMATTING RULES:

- Problem Statement, Input, Output, Constraints,
  Example 1, and Example 2 must be separate sections.
- Each section must appear on separate lines.
- Use actual line breaks.
- Do NOT output literal "\\n" characters.
- Do NOT collapse the entire problem into one paragraph.
- The problem must be readable directly by a candidate.

EXPECTED ANSWER FOR CODING:

Provide:
- intended algorithm
- key idea
- time complexity
- space complexity

Do NOT provide full source code unless explicitly requested.

==================================================
BEHAVIORAL INTERVIEW
==================================================

Generate realistic behavioral and situational questions.

Focus on:
- teamwork
- communication
- conflict resolution
- leadership
- ownership
- failure
- ambiguity
- time management
- decision making
- adaptability
- learning
- handling pressure
- project experiences

If a resume is provided:
- personalize questions around actual projects or experiences
- ask about the candidate's role
- ask about decisions and challenges
- ask about outcomes and lessons learned
- never invent responsibilities

Behavioral questions should feel like real interview questions,
not technical theory questions.

DO NOT generate:
- coding problems
- DSA problems
- purely theoretical technical questions

==================================================
QUESTION MIX
==================================================

If a resume exists:

Approximately:
- 60-70% role/interview-type questions
- 30-40% resume-personalized questions

For small batches, exact percentages are not required.

The resume should visibly influence some questions,
but the interview should still assess the target role.

If there is no resume:
all questions should be generated from role,
interview type, and difficulty.

==================================================
OUTPUT REQUIREMENTS
==================================================

Return exactly ${batchSize} questions.

Each question MUST contain:

topic
question
expectedAnswer

Return only the structured response.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content:
          "You are an expert interviewer who generates realistic, role-specific, appropriately difficult interview questions.",
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
                  topic: {
                    type: "string",
                  },
                  question: {
                    type: "string",
                  },
                  expectedAnswer: {
                    type: "string",
                  },
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

  const content =
    completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error(
      "No content returned from Groq"
    );
  }

  const parsed = JSON.parse(content);

  if (
    !parsed.questions ||
    !Array.isArray(parsed.questions) ||
    parsed.questions.length !== batchSize
  ) {
    throw new Error(
      `Groq returned an invalid question batch. Expected ${batchSize} questions.`
    );
  }

  return parsed.questions;
}