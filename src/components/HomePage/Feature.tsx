import {
  BrainCircuit,
  FileText,
  Mic,
  BarChart3,
  ShieldCheck,
  Layers3,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Interviews",
    description:
      "Practice with realistic technical, coding, and behavioral questions generated around your target role and difficulty.",
  },
  {
    icon: FileText,
    title: "Resume-Aware Questions",
    description:
      "Upload your resume and get questions that connect your interview to the projects, skills, and experience you actually have.",
  },
  {
    icon: BarChart3,
    title: "Answer Evaluation",
    description:
      "Every completed answer receives a score and focused feedback to help you understand what went well and what needs improvement.",
  },
  {
    icon: Mic,
    title: "Camera & Microphone",
    description:
      "Practice in a more realistic environment with camera support and optional microphone access during your interview.",
  },
  {
    icon: Layers3,
    title: "Interview History",
    description:
      "Keep track of your previous interviews, scores, and detailed results so you can measure your progress over time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Experience",
    description:
      "Your interview data and uploaded resume are handled through authenticated, protected application flows.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Built for better preparation
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to
            <span className="text-blue-400">
              {" "}prepare better.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            InterviewForge combines realistic interview practice with
            personalized feedback, so every session gives you something
            useful to improve.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/[0.10] bg-[#0B0F1A] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0D121F]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400 transition group-hover:border-blue-400/30 group-hover:bg-blue-500/[0.12]">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-gray-100">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}