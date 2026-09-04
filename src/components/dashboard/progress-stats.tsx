"use client";

import { useEffect, useState } from "react";
import {
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  MessageSquare,
  Trophy,
} from "lucide-react";

export default function ProgressStats() {
 const [stats, setStats] = useState({
  totalInterviews: 0,
  thisMonthInterviews: 0,
  questionsAttempted: 0,
  averageScore: 0,
  completedInterviews: 0,
});

const statCards = [
  {
    label: "Total Interviews",
    value: stats.totalInterviews,
    description: `${stats.thisMonthInterviews} this month`,
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    label: "Questions Attempted",
    value: stats.questionsAttempted,
    description: "Keep practicing",
    icon: MessageSquare,
  },
  {
    label: "Average Score",
    value: `${stats.averageScore}%`,
    description: "Across completed interviews",
    icon: Trophy,
  },
  {
    label: "Completed",
    value: stats.completedInterviews,
    description: `${stats.totalInterviews > 0
      ? Math.round(
          (stats.completedInterviews / stats.totalInterviews) * 100
        )
      : 0}% completion rate`,
    icon: CircleCheck,
  },
];


  useEffect(()=>{

      async function fetchStatus(){

        try{
          const response=await fetch("/api/dashboard/stats");
          if(!response.ok){
            throw new Error("Failed to fetch interview status");
          }

          const data=await response.json();

          setStats(data);

        }

        catch(error){
          console.error("Error fetching interview status:",error);
          throw error;

        }




      }

      fetchStatus();

  },[])


  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Your Progress</h2>

        <p className="mt-1 text-sm text-gray-500">
          A quick look at your interview journey.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stats) => {
          const Icon = stats.icon;

          return (
            <div
              key={stats.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {stats.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight">
                    {stats.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {stats.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}