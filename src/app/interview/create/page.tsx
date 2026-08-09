
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  X,
  BriefcaseBusiness,
  Code2,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const interviewTypes = [
  {
    name: "Technical",
    description: "Technical concepts & fundamentals",
    icon: Code2,
  },
  {
    name: "Behavioral",
    description: "Communication & experience",
    icon: MessageCircle,
  },
  {
    name: "Coding",
    description: "DSA & coding problems",
    icon: Code2,
  },
];

const difficulties = ["Easy", "Medium", "Hard"];
const questionCounts = [5, 10, 15];

export default function InterviewSetup() {
    const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [interviewType, setInterviewType] = useState("Technical");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(10);

  const handleResumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5 MB.");
      return;
    }

    setResume(file);
  };


  const handleStartInterview=async()=>{
        if(!role.trim()){
            alert("Please enter a target role.");
            return;
        }
    try{
        const response=await fetch("/api/interview",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                role:role,
                interviewType:interviewType.toUpperCase(),
                difficulty:difficulty.toUpperCase(),
                questionCount:questionCount
            })
        })

        const data=await response.json();


        if(!response.ok){
            alert(data.message || "Failed to create interview.");
            return;
        }


       router.push(`/interview/${data.interview.id}`);





        console.log("Interview created successfully:", data.interview);


          

        

    }
    catch(error){

        console.error("Error creating interview:", error);
        alert("An error occurred while creating the interview.");


    }



  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070D] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
            <Sparkles size={21} />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Interview Setup
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Prepare for your interview
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Configure your session and let AI tailor the interview
            to your role and experience.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Resume */}
          <section className="rounded-2xl border border-white/[0.14] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400">
                <FileText size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-100">
                  Your Resume
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Used to personalize your questions.
                </p>
              </div>
            </div>

            {!resume ? (
              <label className="group flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.18] bg-[#070A12] px-6 transition hover:border-blue-400/50 hover:bg-blue-500/[0.04]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                  <Upload size={20} />
                </div>

                <p className="text-sm font-medium text-gray-200">
                  Upload your resume
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  PDF • Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleResumeChange}
                />
              </label>
            ) : (
              <div className="flex min-h-[150px] items-center justify-between rounded-xl border border-blue-400/20 bg-blue-500/[0.05] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-200">
                      {resume.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setResume(null)}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </section>

          {/* Target Role */}
          <section className="rounded-2xl border border-white/[0.14] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-400">
                <BriefcaseBusiness size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-100">
                  Target Role
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  What position are you preparing for?
                </p>
              </div>
            </div>

            <div className="flex min-h-[150px] items-center">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Backend Developer"
                className="w-full rounded-xl border border-white/[0.15] bg-[#070A12] px-4 py-3.5 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 hover:border-white/20 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20"
              />
            </div>
          </section>

          {/* Interview Type */}
          <section className="rounded-2xl border border-white/[0.14] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-200">
                Interview Type
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Choose the format of your interview.
              </p>
            </div>

            <div className="grid gap-2.5">
              {interviewTypes.map((type) => {
                const Icon = type.icon;
                const selected = interviewType === type.name;

                return (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() => setInterviewType(type.name)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      selected
                        ? "border-blue-400/60 bg-blue-500/[0.09]"
                        : "border-white/[0.12] bg-[#070A12] hover:border-white/25"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        selected
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-white/[0.04] text-gray-500"
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div>
                      <p
                        className={`text-sm font-medium ${
                          selected
                            ? "text-blue-300"
                            : "text-gray-300"
                        }`}
                      >
                        {type.name}
                      </p>

                      <p className="text-xs text-gray-600">
                        {type.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Difficulty */}
          <section className="rounded-2xl border border-white/[0.14] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-200">
                Difficulty
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Choose the challenge level.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 ">
              {difficulties.map((level) => {
                const selected = difficulty === level;

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`rounded-xl border px-3 py-3.5 text-sm font-medium transition mt-10 ${
                      selected
                        ? "border-blue-400/60 bg-blue-500/[0.09] text-blue-300"
                        : "border-white/[0.12] bg-[#070A12] text-gray-500 hover:border-white/25 hover:text-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Question Count */}
          <section className="rounded-2xl border border-white/[0.14] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-200">
                Number of Questions
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Choose your interview length.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {questionCounts.map((count) => {
                const selected = questionCount === count;

                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-xl border px-3 py-3.5 text-sm font-medium transition ${
                      selected
                        ? "border-blue-400/60 bg-blue-500/[0.09] text-blue-300"
                        : "border-white/[0.12] bg-[#070A12] text-gray-500 hover:border-white/25 hover:text-gray-300"
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Start Interview */}
          <section className="flex flex-col justify-between rounded-2xl border border-blue-400/20 bg-blue-500/[0.04] p-6 shadow-xl shadow-black/20">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <Sparkles size={19} />
              </div>

              <h2 className="font-semibold text-gray-100">
                Ready to begin?
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Your interview will be generated based on the
                preferences you selected above.
              </p>
            </div>

            <button
              type="button"
              disabled={!role.trim()}
              onClick={()=> handleStartInterview()}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.05] disabled:text-gray-600 disabled:shadow-none"
            >
              <Sparkles size={17} />
              Start Interview
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

