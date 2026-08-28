"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="border-t border-white/[0.08]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-[#0B0F1A] px-6 py-16 text-center shadow-2xl shadow-black/20 sm:px-12">
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[120px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <Sparkles size={21} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Ready when you are
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your next interview deserves
              <span className="text-blue-400">
                {" "}better preparation.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Start a practice interview, test yourself under realistic
              conditions, and use your feedback to get better with every
              session.
            </p>

            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20"
            >
              Start Practicing
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}