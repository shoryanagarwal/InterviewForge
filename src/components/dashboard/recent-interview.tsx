"use client";

import { ArrowRight, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";



export default function RecentInterviews() {
  const [interviews, setInterviews] = useState([
     {
    id: "",
    role: "",
    difficulty: "",
    numberOfQuestions: 0,
    score: null,
    status: "",
    createdAt: "",
  },
  ]);

  function getRelativeDate(date: string) {
  const createdAt = new Date(date);
  const now = new Date();

  const diffInDays = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";

  return `${diffInDays} days ago`;
}



  useEffect(()=>{
      
    async function fetchInterviews(){

      try{
          const response=await fetch("/api/dashboard/recent-interviews");
          if(!response.ok){
            throw new Error("Failed to fetch recent interviews");
          }

          const data=await response.json();
          setInterviews(data);

      }
      catch(error){
        console.error("Error fetching recent interviews:",error);

      }




    }


    fetchInterviews();


  },[])


  
  
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Interviews</h2>

          <p className="mt-1 text-sm text-gray-500">
            Review your latest interview attempts.
          </p>
        </div>

        <Link
          href="/history"
          className="group flex items-center gap-1 text-sm text-blue-400 transition hover:text-blue-300"
        >
          View all
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {/* Header */}
        <div className="hidden grid-cols-5 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-wider text-gray-500 md:grid">
          <span>Role</span>
          <span>Difficulty</span>
          <span>Questions</span>
          <span>Score</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        {interviews.map((interview, index) => (
          <div
            key={`${interview.role}-${index}`} 
            className={`grid gap-4 px-6 py-5 transition hover:bg-white/[0.02] md:grid-cols-5 md:items-center ${
              index !== interviews.length - 1
                ? "border-b border-white/10"
                : ""
            }`}
          >
            {/* Role */}
            <div>
              <p className="font-medium text-gray-200">
                {interview.role}
              </p>

              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <Clock3 size={12} />
                {getRelativeDate(interview.createdAt)}
              </div>
            </div>

            {/* Difficulty */}
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs ${
                interview.difficulty === "Hard"
                  ? "bg-red-400/10 text-red-400"
                  : interview.difficulty === "Medium"
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "bg-green-400/10 text-green-400"
              }`}
            >
              {interview.difficulty}
            </span>

            {/* Questions */}
            <span className="text-sm text-gray-400">
              {interview.numberOfQuestions} Questions
            </span>

            {/* Score */}
            <span className="font-medium text-blue-400">
              {interview.score !== null
                ? `${interview.score}%`
                : "—"}
            </span>

            {/* Status */}
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs ${
                interview.status === "Completed"
                  ? "bg-blue-400/10 text-blue-400"
                  : "bg-orange-400/10 text-orange-400"
              }`}
            >
              {interview.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}