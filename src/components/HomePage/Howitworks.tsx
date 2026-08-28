import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  MessageSquare,
  Settings2,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Settings2,
    title: "Configure your interview",
    description:
      "Choose your target role, interview type, difficulty, and the number of questions you want to practice.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Take the interview",
    description:
      "Answer realistic questions generated specifically for your selected role and interview style.",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "Get AI evaluation",
    description:
      "Your answers are evaluated for correctness, reasoning, clarity, and overall quality.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Learn and improve",
    description:
      "Review your score, strengths, weaknesses, and recommendations after every interview.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From preparation to
            <span className="text-blue-400"> progress.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            InterviewForge turns interview practice into a simple loop:
            prepare, practice, understand your performance, and improve.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-[9%] right-[9%] top-8 hidden h-px bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 lg:block" />

          <div className="grid gap-5 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-white/[0.10] bg-[#0B0F1A] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20"
                >
                  {/* Step number */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 transition group-hover:border-blue-400/30 group-hover:bg-blue-500/[0.14]">
                      <Icon size={20} />
                    </div>

                    <span className="text-xs font-semibold tracking-[0.15em] text-gray-700">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-gray-100">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <MessageSquare size={17} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-200">
                Every interview is a learning opportunity.
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                Practice consistently and use your feedback to prepare with
                more confidence.
              </p>
            </div>
          </div>

          <ArrowRight
            size={18}
            className="hidden text-blue-400 sm:block"
          />
        </div>
      </div>
    </section>
  );
}