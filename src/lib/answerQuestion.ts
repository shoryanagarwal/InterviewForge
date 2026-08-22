import { groq } from "@/lib/groq";

type AnswerEvaluation = {
  score: number;
  feedback: string;
};

export async function answerQuestion({
  question,
  expectedAnswer,
  userAnswer,
}: {
  question: string;
  expectedAnswer: string;
  userAnswer: string;
}): Promise<AnswerEvaluation> {
  const prompt = `
You are an expert software engineering interviewer evaluating a candidate's answer.

QUESTION:
${question}

EXPECTED ANSWER / REFERENCE:
${expectedAnswer}

CANDIDATE ANSWER:
${userAnswer || "(No answer provided)"}

Evaluate the candidate strictly but fairly.

GENERAL EVALUATION RULES:
- Evaluate the actual answer, not just keywords.
- Judge correctness, reasoning, completeness, and relevance.
- A valid alternative approach must receive full credit even if it differs
  from the reference answer.
- Do not require the candidate to use the exact wording or exact approach
  from the expected answer.
- Do not invent requirements that are not present in the question.
- Do not give a high score merely because the candidate mentions some correct terms.
- Keep feedback concise but specific.
- Score must be an integer from 0 to 10.

SCORING RUBRIC:

9-10:
- Fully correct answer.
- Clear and correct reasoning.
- Covers the important aspects of the question.
- For coding questions, the proposed solution correctly solves the problem
  and has an appropriate time and space complexity.
- Only very minor omissions or wording issues may remain.

7-8:
- Mostly correct.
- Core reasoning is correct.
- Minor mistakes, omissions, or small inefficiencies exist.
- The candidate demonstrates solid understanding.

5-6:
- Partially correct.
- Some important understanding is present.
- There are meaningful gaps, incorrect assumptions, incomplete reasoning,
  or inefficient decisions.

3-4:
- Majorly incorrect.
- Some relevant ideas may be present, but important parts are wrong or missing.
- The candidate does not demonstrate sufficient understanding.

1-2:
- Very weak answer.
- Only a small relevant idea is present.
- The answer does not meaningfully solve or explain the question.

0:
- Completely incorrect.
- Irrelevant.
- Empty answer.
- No meaningful attempt.

CODING QUESTION RULES:
If this is a coding/DSA problem, evaluate:

1. Correctness
2. Algorithm / approach
3. Time complexity
4. Space complexity
5. Important edge cases

Additional coding rules:
- Accept any correct algorithm, not only the reference approach.
- If the algorithm does not actually solve the problem, do not give 9-10.
- If the algorithm is correct but unnecessarily inefficient for the stated
  constraints, reduce the score appropriately.
- If the candidate explains a correct approach but misses implementation details,
  score based on the quality and completeness of the explanation.
- Do not penalize harmless differences in variable names or implementation style.

TECHNICAL / CONCEPTUAL QUESTION RULES:
- Reward correct understanding and practical reasoning.
- Do not require exact textbook wording.
- A concise but correct explanation can receive a high score.
- If the answer is only a vague definition without addressing the actual question,
  reduce the score.

BEHAVIORAL QUESTION RULES:
- Evaluate relevance, clarity, ownership, reasoning, and completeness.
- Do not require a specific framework such as STAR, but a concrete example
  is better than a generic answer.

FEEDBACK:
Feedback should briefly explain:
- what the candidate did well
- what was incorrect or missing
- what should be improved

Return only the structured response.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    temperature: 0.2,

    messages: [
      {
        role: "system",
        content:
          "You are a strict but fair expert software engineering interviewer and evaluator.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "answer_evaluation",
        strict: true,
        schema: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              minimum: 0,
              maximum: 10,
            },
            feedback: {
              type: "string",
            },
          },
          required: ["score", "feedback"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response from the evaluation model");
  }

  const parsed = JSON.parse(content) as AnswerEvaluation;

  if (
    typeof parsed.score !== "number" ||
    parsed.score < 0 ||
    parsed.score > 10
  ) {
    throw new Error("Invalid evaluation score returned by model");
  }

  if (typeof parsed.feedback !== "string") {
    throw new Error("Invalid evaluation feedback returned by model");
  }

  return parsed;
}