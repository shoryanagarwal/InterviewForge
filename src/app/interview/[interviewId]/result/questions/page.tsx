"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  questionNumber: number;
  question: string;
  expectedAnswer: string | null;
  userAnswer: string | null;
  score: number | null;
  feedback: string | null;
};

type ResultData = {
  questions: Question[];
};

export default function QuestionReviewPage() {
  const { interviewId } = useParams();

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `/api/interview/${interviewId}/result`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch interview result"
          );
        }

        setResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [interviewId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        <div className="text-center">
          <Sparkles
            size={28}
            className="mx-auto mb-4 animate-pulse text-blue-400"
          />

          <p className="text-sm text-gray-400">
            Loading question review...
          </p>
        </div>
      </main>
    );
  }

  if (!result || result.questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        <p className="text-sm text-red-400">
          No questions found.
        </p>
      </main>
    );
  }

  const currentQuestion = result.questions[currentIndex];

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === result.questions.length - 1;

  return (
    <main className="min-h-screen bg-[#05070D] text-white">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Interview Review
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-100 sm:text-3xl">
              Question {currentIndex + 1}
              <span className="text-gray-600">
                {" "}
                / {result.questions.length}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-500/10 px-3 py-2">
            <CheckCircle2 size={15} className="text-green-400" />

            <span className="text-sm font-semibold text-green-400">
              {currentQuestion.score ?? 0}/10
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{
              width: `${
                ((currentIndex + 1) / result.questions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Question */}
        <section className="mb-5 rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
            Question
          </p>

          <div className="max-h-[300px] overflow-y-auto pr-2">
            <p className="whitespace-pre-line text-base leading-7 text-gray-100">
              {currentQuestion.question}
            </p>
          </div>
        </section>

        {/* Your Answer */}
        <section className="mb-5 rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
            Your Answer
          </p>

          <div className="rounded-xl border border-white/[0.10] bg-[#070A12] p-4">
            <p className="whitespace-pre-line text-sm leading-6 text-gray-300">
              {currentQuestion.userAnswer ||
                "No answer was submitted."}
            </p>
          </div>
        </section>

        {/* Expected Answer */}
        <section className="mb-5 rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
            Expected Answer
          </p>

          <div className="rounded-xl border border-blue-400/10 bg-blue-500/[0.04] p-4">
            <p className="whitespace-pre-line text-sm leading-6 text-gray-300">
              {currentQuestion.expectedAnswer ||
                "No expected answer available."}
            </p>
          </div>
        </section>

        {/* Feedback */}
        <section className="mb-6 rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <Sparkles size={17} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-100">
                AI Feedback
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Feedback for this answer
              </p>
            </div>
          </div>

          <p className="whitespace-pre-line text-sm leading-7 text-gray-400">
            {currentQuestion.feedback ||
              "No feedback available."}
          </p>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.10] bg-[#0B0F1A] p-4">
          <button
            type="button"
            disabled={isFirst}
            onClick={() =>
              setCurrentIndex((prev) => prev - 1)
            }
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              isFirst
                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button
            type="button"
            disabled={isLast}
            onClick={() =>
              setCurrentIndex((prev) => prev + 1)
            }
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              isLast
                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}