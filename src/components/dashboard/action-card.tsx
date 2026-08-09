import Link from "next/link";
import { ArrowRight, History, Sparkles } from "lucide-react";

export default function ActionCards() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="grid gap-5 md:grid-cols-2">

        {/* Create Interview */}
        <Link
          href="/interview/create"
          className="group relative overflow-hidden rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/[0.1]"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

          <div className="relative">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Sparkles size={21} />
            </div>

            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Create Interview
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                  Start a personalized AI interview tailored to your
                  role, experience, and difficulty level.
                </p>
              </div>

              <ArrowRight
                size={20}
                className="shrink-0 text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </Link>

        {/* Interview History */}
        <Link
          href="/interview/history"
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />

          <div className="relative">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <History size={21} />
            </div>

            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Interview History
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                  Review your previous interviews, scores, feedback,
                  and areas where you can improve.
                </p>
              </div>

              <ArrowRight
                size={20}
                className="shrink-0 text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}