import {
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  MessageSquare,
  Trophy,
} from "lucide-react";

const stats = [
  {
    label: "Total Interviews",
    value: "12",
    description: "3 this month",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: "Questions Attempted",
    value: "87",
    description: "Keep practicing",
    icon: MessageSquare,
  },
  {
    label: "Average Score",
    value: "74%",
    description: "Good progress",
    icon: Trophy,
  },
  {
    label: "Completed",
    value: "8",
    description: "67% completion rate",
    icon: CircleCheck,
  },
];

export default function ProgressStats() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Your Progress</h2>

        <p className="mt-1 text-sm text-gray-500">
          A quick look at your interview journey.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}