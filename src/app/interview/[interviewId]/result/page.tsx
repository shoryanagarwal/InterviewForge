"use client"

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import{useEffect, useState} from "react";
import {useRouter,useParams} from "next/navigation";


type Question={
    id:string;
    questionNumber:number;
    question:string;
    score:number|null;
    userAnswer:string|null;
    feedback:string|null;


}

type ResultData={
    interview:{
        id:string;
        role:string;
        difficulty:string;
        interviewType:string;
    },
    averageScore:number;
    questions:Question[];

}

export default function ResultPage(){

    const [resultData,setResultData]=useState<ResultData|null>(null);
    const [loading,setLoading]=useState<boolean>(true);

    const {interviewId}=useParams();
    const router=useRouter();
    
    useEffect(()=>{
        const fetchResult=async()=>{

            try{
                const result=await fetch(`/api/interview/${interviewId}/result`);
                if(!result.ok){
                    throw new Error("Failed to fetch result");
                }

                const data=await result.json();
                setResultData(data as ResultData);

            }
            catch(error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }



        }

        fetchResult();



    },[interviewId]);




    if(loading){
         return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            <Sparkles className="animate-pulse text-blue-400" size={24} />
          </div>

          <h1 className="text-xl font-semibold">
            Calculating your results...
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Analyzing your interview performance.
          </p>
        </div>
      </main>
    );
    }

    if(!resultData){
          return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        <p className="text-sm text-red-400">
          Unable to load your result.
        </p>
      </main>
    );
    }


    const score=Number(resultData.averageScore.toFixed(1));
    const performance=score>=8?"Excellent":score>=5?"Good":"Needs Improvement";

    return (
  <main className="min-h-screen bg-[#05070D] text-white">
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">

      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/20 bg-green-500/10 text-green-400">
          <CheckCircle2 size={22} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
          Interview Complete
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Here&apos;s how you performed
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          {resultData.interview.role} ·{" "}
          {resultData.interview.interviewType} ·{" "}
          {resultData.interview.difficulty}
        </p>
      </div>

      {/* Overall Score */}
      <section className="mb-5 rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
          Overall Score
        </p>

        <div className="mt-4 text-6xl font-bold">
          {score}
          <span className="text-2xl text-gray-600"> / 10</span>
        </div>

        <p className="mt-3 text-sm font-medium text-blue-400">
          {performance}
        </p>

        <div className="mx-auto mt-6 h-2 max-w-xl overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{
              width: `${Math.min(score * 10, 100)}%`,
            }}
          />
        </div>
      </section>

      {/* Question Scores */}
      <section className="rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-100">
              Question Scores
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Review your performance question by question.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/interview/${interviewId}/result/questions`
              )
            }
            className="flex items-center gap-2 rounded-xl border border-white/[0.12] px-4 py-2.5 text-xs text-gray-300"
          >
            View all
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="space-y-3">
          {resultData.questions.map((question) => (
            <button
              key={question.id}
              type="button"
              onClick={() =>
                router.push(
                  `/interview/${interviewId}/result/questions`
                )
              }
              className="group flex w-full items-center gap-4 rounded-xl border border-white/[0.10] bg-[#070A12] p-4 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-sm font-semibold text-blue-400">
                {question.questionNumber}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-200">
                  {question.question}
                </p>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${Math.min(
                        (question.score ?? 0) * 10,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">
                  {question.score ?? 0}/10
                </span>

                <ArrowRight
                  size={17}
                  className="text-gray-600 transition group-hover:translate-x-1"
                />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  </main>
);








}