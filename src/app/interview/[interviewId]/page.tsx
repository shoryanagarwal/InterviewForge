"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Clock3,
  Mic,
  MicOff,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function InterviewPage() {


  const router = useRouter();
  const { interviewId } = useParams();
  const [finishingInterview, setFinishingInterview] = useState(false);
  const videoRef =useRef<HTMLVideoElement | null> (null);
  const [mediaStream,setmediaaStream]=useState<MediaStream | null>(null);
  const [timeleft,setTimeLeft]=useState(0);

  const [cameraEnabled,setcameraEnabled]=useState(false);
  const [cameraError,setcameraError]=useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [requestingCamera, setRequestingCamera] = useState(false);  
  
  const [micEnabled,setMicEnabled]=useState(false);

  const [isListening, setIsListening] = useState(false);
  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion =
    interview?.questions?.[currentQuestionIndex];


  useEffect(()=>{
    return()=>{
      mediaStream?.getTracks().forEach((track)=>track.stop()); 
    }
  },[mediaStream])     


  // Fetch interview

  const finishInterview=async()=>{

    if(finishingInterview){
      return
    }

      try{
          setFinishingInterview(true);

          const response= await fetch(`/api/interview/${interviewId}/finish`,{
            method:"POST",
          })

          const data=await response.json();

          if(!response.ok){
              throw new Error(data.message || "Failed to finish interview");
          }


          router.replace(`/interview/${interviewId}/result`);


      }
      catch(error){
        console.error(error);
        alert("Failed to finish interview. Please try again.");
        setFinishingInterview(false);

      }


  }


  useEffect(() => {
  if (
    timeleft === 0 &&
    cameraReady &&
    interview &&
    !finishingInterview
  ) {
    finishInterview();
  }
}, [timeleft, cameraReady, interview, finishingInterview]);


  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(
          `/api/interview/${interviewId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch interview"
          );
        }

        setInterview(data.response);
      } catch (error) {
        console.error("Fetch interview error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);





  useEffect(() => {
  if (videoRef.current && mediaStream) {
    videoRef.current.srcObject = mediaStream;
  }
}, [mediaStream, cameraReady]);

  // Load saved answer whenever question changes



  useEffect(() => {
    if (currentQuestion) {
      setAnswers(currentQuestion.userAnswer || "");
    }
  }, [currentQuestionIndex, currentQuestion]);


 const getInterviewTime = (
  interviewType: string,
  difficulty: string,
  questionCount: number
) => {
  let timePerQuestion = 3 * 60;

  if (interviewType.toUpperCase() === "CODING") {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        timePerQuestion = 10 * 60;
        break;
      case "MEDIUM":
        timePerQuestion = 20 * 60;
        break;
      case "HARD":
        timePerQuestion = 30 * 60;
        break;
    }
  } else {
    switch (difficulty.toUpperCase()) {
      case "EASY":
        timePerQuestion = 2 * 60;
        break;
      case "MEDIUM":
        timePerQuestion = 3 * 60;
        break;
      case "HARD":
        timePerQuestion = 5 * 60;
        break;
    }
  }

  return timePerQuestion * questionCount;
};


  useEffect(() => {
  if (!interview) return;

  const totalTime = getInterviewTime(
    interview.interviewType,
    interview.difficulty,
    interview.questions.length
  );

  setTimeLeft(totalTime);
}, [interview]);


useEffect(() => {
  if (!cameraReady || timeleft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        return 0;
      }

      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [cameraReady]);




  const toggleMic=()=>{
    if(!mediaStream){
      return;
    }

    const audioTracks=mediaStream.getAudioTracks()[0];
    if(!audioTracks){
      return;
    }
    audioTracks.enabled=!audioTracks.enabled;
    setMicEnabled(audioTracks.enabled);
  }

 
  const requestCamera=async()=>{

      try{
        setRequestingCamera(true);
        setcameraError(null);

        const camerastream=await navigator.mediaDevices.getUserMedia({
          video:true
        })

        let micTrack: MediaStreamTrack | null = null;

        try{
          const micStream=await navigator.mediaDevices.getUserMedia({
            audio:true
          })

          micTrack=micStream.getAudioTracks()[0]?? null;
        }
        catch(error){
          console.error("Microphone error:",error);
          setMicEnabled(false);
        }

        const tracks=[
          ...camerastream.getVideoTracks(),
          ...(micTrack ? [micTrack] : [])
        ]


        const stream=new MediaStream(tracks);

        setmediaaStream(stream);
        setcameraEnabled(true);
        setMicEnabled(Boolean(micTrack));
        setCameraReady(true);

      }
      catch(error){
        console.error("Camera error:",error);
        setCameraReady(false);
        setcameraError("Failed to access camera. Please check your permissions and try again.");

      }
      finally{
        setRequestingCamera(false);
      }


  }







  const handleMarkAsComplete = async () => {
    if (!currentQuestion || !answers.trim()) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `/api/interview/${interviewId}/questions/${currentQuestion.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAnswer: answers,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to mark question as complete"
        );
      }

      setInterview((prev: any) => {
        const updatedQuestions = [...prev.questions];

        updatedQuestions[currentQuestionIndex] = {
          ...updatedQuestions[currentQuestionIndex],
          userAnswer: answers,
          status: "ANSWERED",
          score: data.data.score,
          feedback: data.data.feedback,
        };

        return {
          ...prev,
          questions: updatedQuestions,
        };
      });
    } catch (error) {
      console.error(error);
      alert(
        "Failed to mark question as complete. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async() => {
      if(!currentQuestion ){
        return;
      }
    
        if(isLastQuestion){
          try{

            const response= await fetch(`/api/interview/${interviewId}/finish`,{
              method:"POST",

            })
            
            const data=await response.json();

            if(!response.ok){
                throw new Error(data.message || "Failed to finish interview");
            }

            router.push(`/interview/${interviewId}/result`);

        }
         catch(error){

        console.error(error);
        alert("Failed to finish interview. Please try again.");


    }

    return;

    }
   

  setCurrentQuestionIndex((prev) => prev + 1);
};

  

  const handlePrevious = () => {
    if (currentQuestionIndex <= 0) return;

    setCurrentQuestionIndex(
      (prevIndex) => prevIndex - 1
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        <p className="text-sm text-gray-400">
          Loading interview...
        </p>
      </main>
    );
  }


  if (finishingInterview) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-8 text-center shadow-xl shadow-black/20">
        
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10">
          <Clock3
            size={22}
            className="animate-pulse text-blue-400"
          />
        </div>

        <h1 className="mt-5 text-xl font-semibold">
          Submitting Interview
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Your interview is being submitted and evaluated.
          Please wait while we prepare your results.
        </p>

      </div>
    </main>
  );
}


  if (!interview || !currentQuestion) {
    return (



      <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        <p className="text-sm text-red-400">
          Interview not found.
        </p>
      </main>
    );
  }

  const isFirstQuestion = currentQuestionIndex === 0;

  const isLastQuestion =
    currentQuestionIndex ===
    interview.questions.length - 1;

  const progress =
    ((currentQuestionIndex + 1) /
      interview.questions.length) *
    100;

  
  return !cameraReady ? (
    <main className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-8 text-center">
        <h1 className="text-xl font-semibold">
          Ready to begin?
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Camera access is required before your interview can start.
        </p>

        <button
        type="button"
        onClick={requestCamera}
        disabled={requestingCamera}
        className="mt-6 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white"
        >
        {requestingCamera
          ? "Starting camera..."
          : "Enable Camera"}
        </button>

      {cameraError && (
        <p className="mt-4 text-xs text-red-400">
          {cameraError}
        </p>
      )}
    </div>
  </main>
) : (
    


    <main className="min-h-screen bg-[#05070D] text-white">
      <header className="border-b border-white/[0.10] bg-[#080B13]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <Sparkles size={17} />
            </div>

            <span className="font-semibold tracking-tight">
              InterviewForge
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden text-sm text-gray-500 sm:block">
              Question{" "}
              <span className="font-medium text-gray-200">
                {currentQuestionIndex + 1}
              </span>{" "}
              / {interview.questions.length}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-sm text-gray-300">
              <Clock3
                size={15}
                className="text-blue-400"
              />
              <span>
              {String(Math.floor(timeleft / 60)).padStart(2, "0")}:
              {String(timeleft % 60).padStart(2, "0")}
            </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
            <span>Interview progress</span>

            <span>
              {currentQuestion.questionNumber}/
              {interview.questions.length}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Interview grid */}
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* AI Interviewer */}
          <section className="flex min-h-[560px] flex-col rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-xl shadow-black/20">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-blue-400">
                  AI Interviewer
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-100">
                  InterviewForge AI
                </h2>

                <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                  {interview.role} |{" "}
                  {interview.interviewType} |{" "}
                  {interview.difficulty}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-400/20 bg-green-500/10">
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="relative mb-6 w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.12] bg-black aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />

              {!cameraEnabled && (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                  Camera is off
                </div>
              )}

              


            </div>


              <div className="max-w-md text-center">
                <p className="text-sm leading-6 text-gray-400">
                  Take your time and answer naturally. I&apos;ll
                  evaluate your response based on clarity,
                  technical depth and communication.
                </p>
              </div>

              

             
              <button
                type="button"
                className="mt-8 flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <Volume2
                  size={16}
                  className="text-blue-400"
                />
                Replay question
              </button>
            </div>
          </section>

          {/* Question + Answer */}
          <section className="flex min-h-[560px] flex-col rounded-2xl border border-white/[0.12] bg-[#0B0F1A] shadow-xl shadow-black/20">
            {/* Question */}
            <div className="h-[300px] overflow-y-auto border-b border-white/[0.10] p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md border border-blue-400/20 bg-blue-500/10 px-2 py-1 text-[11px] font-medium text-blue-400">
                  Question {currentQuestion.questionNumber}
                </span>

                <span className="text-xs text-gray-600">
                  {interview.interviewType} |{" "}
                  {interview.difficulty}
                </span>

                {currentQuestion.status === "ANSWERED" && (
                  <div className="flex items-center gap-1 rounded-md border border-green-400/20 bg-green-500/10 px-2 py-1 text-[11px] font-medium text-green-400">
                    <CircleCheck size={12} />
                    Answered
                  </div>
                )}
              </div>

              <h1 className="whitespace-pre-line text-lg font-medium leading-7 text-gray-100 sm:text-xl">
                {currentQuestion.question}
              </h1>
            </div>

            {/* Answer */}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                  Your Answer
                </p>

                <span className="text-xs text-gray-700">
                  Voice input available
                </span>
              </div>

              <textarea
                placeholder="Type your answer here..."
                value={answers}
                onChange={(e) =>
                  setAnswers(e.target.value)
                }
                disabled={
                  currentQuestion.status === "ANSWERED"
                }
                className="min-h-[250px] flex-1 resize-none rounded-xl border border-white/[0.12] bg-[#070A12] p-4 text-sm leading-6 text-gray-200 outline-none transition placeholder:text-gray-700 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="mt-5 flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <p className="max-w-sm text-xs leading-5 text-gray-600">
                    You can type your answer or use the
                    microphone to answer verbally.
                  </p>

                  <button
                    type="button"
                    onClick={handleMarkAsComplete}
                    disabled={
                      submitting ||
                      !answers.trim() ||
                      currentQuestion.status ===
                        "ANSWERED"
                    }
                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${
                      submitting ||
                      !answers.trim() ||
                      currentQuestion.status ===
                        "ANSWERED"
                        ? "cursor-not-allowed bg-gray-500"
                        : "bg-blue-500 hover:bg-blue-400"
                    }`}
                  >
                    {currentQuestion.status ===
                    "ANSWERED"
                      ? "Completed"
                      : submitting
                      ? "Evaluating..."
                      : "Mark as complete"}
                  </button>
                </div>

                <button
                    type="button"
                    onClick={toggleMic}
                    disabled={!mediaStream}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition ${
                      micEnabled
                        ? "border-blue-400/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/15"
                        : "border-red-400/40 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {micEnabled ? (
                      <Mic size={19} />
                    ) : (
                      <MicOff size={19} />
                    )}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/[0.10] bg-[#0B0F1A] p-4">
          <button
            type="button"
            disabled={isFirstQuestion}
            onClick={handlePrevious}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${
              isFirstQuestion
                ? "cursor-not-allowed bg-gray-500"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <p className="hidden text-xs text-gray-600 sm:block">
            Make sure your answer is complete before
            continuing.
          </p>

          <button
            type="button"
            onClick={handleNext}
            disabled={!currentQuestion}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${
              !currentQuestion
                ? "cursor-not-allowed bg-gray-500"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            {isLastQuestion ? "Finish" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}