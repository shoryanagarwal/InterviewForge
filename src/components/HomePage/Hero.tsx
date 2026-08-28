"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[140px]" />

      <div className="pointer-events-none absolute left-[5%] top-[45%] h-[260px] w-[260px] rounded-full bg-violet-600/[0.04] blur-[120px]" />

      <div className="pointer-events-none absolute right-[8%] top-[30%] h-[220px] w-[220px] rounded-full bg-blue-500/[0.04] blur-[110px]" />

      {/* Decorative dots */}
      <div className="pointer-events-none absolute left-[12%] top-[24%] h-1 w-1 rounded-full bg-blue-400/60" />
      <div className="pointer-events-none absolute right-[18%] top-[28%] h-1 w-1 rounded-full bg-blue-400/40" />
      <div className="pointer-events-none absolute left-[22%] top-[62%] h-1 w-1 rounded-full bg-violet-400/50" />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
        {/* Badge */}
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-3.5 py-2 text-xs font-medium text-blue-300">
          <Sparkles size={13} />
          AI-Powered Interview Practice
        </div>

        {/* Heading */}
        <div className="mx-auto mt-7 max-w-5xl text-center">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Don&apos;t just prepare
            <br />
            <span className="text-blue-400">
              answers.
            </span>
            <br className="sm:hidden" />{" "}
            Prepare for the{" "}
            <span className="text-blue-400">
              interview.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            InterviewForge simulates realistic technical, coding, and
            behavioral interviews tailored to your role, difficulty,
            and experience — then gives you detailed feedback to help
            you improve.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20 sm:w-auto"
          >
            Start Practicing
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-blue-0 transition hover:border-white/20 hover:bg-white/[0.05] sm:w-auto"
          >
            <Play size={15} className="text-blue-400" />
            See how it works
          </button>
        </div>

        {/* Trust points */}
        <div className="mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-600">
          <span>Role-specific questions</span>
          <span className="h-1 w-1 rounded-full bg-gray-700" />
          <span>Resume-aware interviews</span>
          <span className="h-1 w-1 rounded-full bg-gray-700" />
          <span>AI-powered feedback</span>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Glow behind preview */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[100px]" />

          <div className="relative rounded-3xl border border-white/[0.10] bg-[#080B13]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-3">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-3 sm:px-4">
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />

              <div className="mx-auto hidden h-7 max-w-sm flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] sm:block" />
            </div>

            {/* Preview body */}
            <div className="grid gap-3 p-3 md:grid-cols-[1.2fr_0.8fr] md:p-5">
              {/* Interview preview */}
              <div className="rounded-2xl border border-white/[0.07] bg-[#0B0F1A] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-blue-400">
                      AI Interviewer
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-100">
                      InterviewForge AI
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-green-400/15 bg-green-500/[0.05] px-2.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-green-400">
                      Live
                    </span>
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-white/[0.06] bg-[#070A12] p-5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-700">
                    Question
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">
                    How would you design an API that remains reliable
                    when multiple requests update the same resource?
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-700">
                      Interview Type
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-300">
                      Technical
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-700">
                      Difficulty
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-300">
                      Medium
                    </p>
                  </div>
                </div>
              </div>

              {/* Score preview */}
              <div className="rounded-2xl border border-white/[0.07] bg-[#0B0F1A] p-5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-700">
                  Performance
                </p>

                <div className="mt-6 flex items-center justify-center">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-blue-500/15 bg-blue-500/[0.03]">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-blue-400">
                        8.6
                      </p>

                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-600">
                        out of 10
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <ScoreRow
                    label="Technical depth"
                    value="Strong"
                  />

                  <ScoreRow
                    label="Communication"
                    value="Good"
                  />

                  <ScoreRow
                    label="Problem solving"
                    value="Strong"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <span className="text-xs text-gray-600">
        {label}
      </span>

      <span className="text-xs font-medium text-gray-300">
        {value}
      </span>
    </div>
  );
}