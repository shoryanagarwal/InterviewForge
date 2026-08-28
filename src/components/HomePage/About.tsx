import {
  ArrowUpRight,
  BrainCircuit,
  Target,
  TrendingUp,
} from "lucide-react";

const highlights = [
  {
    icon: BrainCircuit,
    title: "Practice with purpose",
    description:
      "Every interview is built around your role, difficulty, and the kind of interview you want to practice.",
  },
  {
    icon: Target,
    title: "Know where you stand",
    description:
      "Understand how you performed instead of simply finishing another mock interview.",
  },
  {
    icon: TrendingUp,
    title: "Turn feedback into progress",
    description:
      "Use your results to identify weak areas and make every future practice session more focused.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Why InterviewForge
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Preparation should tell you
              <span className="text-blue-400">
                {" "}more than a score.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              A mock interview is only useful when you understand what
              happened during it. InterviewForge is built to turn practice
              into a feedback loop — from the questions you face to the
              areas you should improve next.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-blue-400/10 bg-blue-500/[0.04] px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <ArrowUpRight size={17} />
              </div>

              <p className="text-xs leading-5 text-gray-500">
                Practice. Review. Improve. Repeat.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex gap-4 rounded-2xl border border-white/[0.10] bg-[#0B0F1A] p-5 transition duration-300 hover:border-blue-400/20"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400 transition group-hover:border-blue-400/30 group-hover:bg-blue-500/[0.12]">
                    <Icon size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-100">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}