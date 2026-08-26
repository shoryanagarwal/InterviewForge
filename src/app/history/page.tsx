"use client";

import {useEffect,useState} from "react";
import { ArrowRight, Clock3, FileText, Sparkles } from "lucide-react";
import {useRouter} from "next/navigation";
type interview={
    id: string;
  role: string;
  interviewType: string;
  difficulty: string;
  status: string;
  score: number | null;
  numberOfQuestions: number;
  createdAt: string;



}


type HistoryPage={
    interviews:interview[]
}


export default function HistoryPage(){

    const router=useRouter();

    const [interviews,setInterviews]=useState<interview[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    

    useEffect(()=>{
        console.log("useEffect triggered");


        async function fetchInterviews(){

            try{
              console.log("Fetching interviews...");
                const response=await fetch("/api/interview/history");
                console.log("Response status:", response.status); // Log the response status
                if(!response.ok){
                    throw new Error("Failed to fetch interviews");
                }

                const data=await response.json();
                console.log("Fetched interviews:", data.interviews); // Log the fetched data

                setInterviews(data.interviews);

            }
            catch(error){
                throw new Error("Failed to fetch interviews");
            }
            finally{
                setLoading(false);
            }




        }


        fetchInterviews();

    },[])


    const formatDate=(date:string)=>{
        return new Date(date).toLocaleDateString("en-US",{
            year:"2-digit",
            month:"short",
            day:"numeric"
        })
    }


    const getStatusStyle=(status:string)=>{
        switch(status){
            case "COMPLETED":
        return "border-green-400/20 bg-green-500/10 text-green-400";

      case "CREATED":
        return "border-yellow-400/20 bg-yellow-500/10 text-yellow-400";

      case "ABANDONED":
        return "border-red-400/20 bg-red-500/10 text-red-400";

      default:
        return "border-white/10 bg-white/[0.04] text-gray-400";
        }
    }


    const getScoreStyle=(score:number|null)=>{
         if (score === null) return "text-gray-500";
        if (score >= 8) return "text-green-400";
        if (score >= 5) return "text-yellow-400";
        return "text-red-400";
    }


    if(loading){
        return (
      <main className="min-h-screen bg-[#05070D] text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mb-10">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-white/[0.06]" />
            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-white/[0.04]" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => ( 
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl border border-white/[0.08] bg-[#0B0F1A]"
              />
            ))}
          </div>
        </div>
      </main>
    );
    }


     return (
    <main className="min-h-screen bg-[#05070D] text-white">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <Clock3 size={20} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Interview History
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review your previous interview sessions and results.
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {interviews.length === 0 ? (
          <section className="rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <FileText size={24} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-200">
              No interviews yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Start your first interview and your completed sessions
              will appear here.
            </p>

            <button
              type="button"
              onClick={() => router.push("/interview/create")}
              className="mt-6 rounded-xl border border-blue-400/30 bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              Start Interview
            </button>
          </section>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <section
                key={interview.id}
                className="rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-5 transition hover:border-white/[0.18]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-semibold text-gray-100">
                        {interview.role}
                      </h2>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusStyle(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-500">
                        {interview.interviewType}
                      </span>

                      <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-500">
                        {interview.difficulty}
                      </span>

                      <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-500">
                        {interview.numberOfQuestions} Questions
                      </span>

                      <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-500">
                        {formatDate(interview.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600">
                        Score
                      </p>

                      <p
                        className={`mt-1 text-2xl font-bold ${getScoreStyle(
                          interview.score
                        )}`}
                      >
                        {interview.score !== null
                          ? `${interview.score}/10`
                          : "--"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/interview/${interview.id}/result`
                        )
                      }
                      disabled={interview.status !== "COMPLETED"}
                      className="flex items-center gap-2 rounded-xl border border-white/[0.12] px-4 py-3 text-xs font-medium text-gray-300 transition hover:border-blue-400/30 hover:bg-blue-500/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      View Result
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* CTA */}
        {interviews.length > 0 && (
          <button
            type="button"
            onClick={() => router.push("/interview/create")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            <Sparkles size={17} />
            Start New Interview
          </button>
        )}
      </div>
    </main>
  );


    
    


}