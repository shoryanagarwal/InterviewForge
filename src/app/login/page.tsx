"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/Dashboard",
    });
  };





  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();

    try{
        const response=await fetch("/api/auth/Login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        })


        const data=await response.json();

        if(!response.ok){
            throw new Error(data.message || "Login failed");
        }

        const result=await signIn("credentials",{
            redirect:false,
            email,
            password,
            callbackUrl:"/Dashboard"
        })

        if(result?.error){
            throw new Error(result.error);
        }

        router.replace("/Dashboard");
        router.refresh();

    }
    catch(error){
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
    }


    // Credentials authentication baad mein connect karenge.
  };





  return (
    <main className="min-h-screen bg-[#05070D] text-white">
      <div className="grid min-h-screen lg:grid-cols-[3fr_2fr]">
        {/* =========================================================
            LEFT SIDE - PROMOTIONAL SECTION
        ========================================================= */}
        <section className="relative hidden overflow-hidden border-r border-white/[0.08] lg:flex">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-[20%] top-[15%] h-[280px] w-[280px] rounded-full bg-blue-600/[0.07] blur-[120px]" />

          <div className="pointer-events-none absolute bottom-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-violet-600/[0.06] blur-[120px]" />

          {/* Stars / dots */}
          <div className="pointer-events-none absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-blue-400/70" />
          <div className="pointer-events-none absolute left-[68%] top-[23%] h-1 w-1 rounded-full bg-blue-400/40" />
          <div className="pointer-events-none absolute left-[78%] top-[48%] h-1 w-1 rounded-full bg-violet-400/50" />
          <div className="pointer-events-none absolute left-[32%] top-[56%] h-1 w-1 rounded-full bg-blue-400/40" />

          <div className="relative flex w-full flex-col px-10 py-10 xl:px-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <Sparkles size={19} />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                Interview<span className="text-blue-400">Forge</span>
              </span>
            </Link>

            {/* Main content */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  AI-Powered Interview Practice
                </p>

                <h1 className="text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">
                  Practice{" "}
                  <span className="text-blue-400">Smarter.</span>
                  <br />
                  Interview{" "}
                  <span className="text-blue-400">Better.</span>
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500 xl:text-base">
                  Prepare for your next opportunity with realistic AI
                  interviews, personalized questions, and detailed feedback
                  designed to help you improve.
                </p>
              </div>

              {/* Feature cards */}
              <div className="mt-10 space-y-5">
                <FeatureItem
                  icon={<BrainCircuit size={19} />}
                  title="AI-Powered Feedback"
                  description="Get instant, actionable insights after every answer."
                />

                <FeatureItem
                  icon={<Sparkles size={19} />}
                  title="Realistic Interviews"
                  description="Practice technical, coding, and behavioral interviews."
                />

                <FeatureItem
                  icon={<BarChart3 size={19} />}
                  title="Track & Improve"
                  description="Understand your strengths and focus on weak areas."
                />
              </div>

              {/* Abstract dashboard visual */}
              <div className="relative mt-12 hidden xl:block">
                <div className="absolute bottom-0 left-8 h-56 w-56 rounded-full bg-blue-500/[0.04] blur-[80px]" />

                <div className="relative mx-auto w-[82%] max-w-xl">
                  <div className="rounded-2xl border border-white/[0.10] bg-[#080B13]/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    {/* fake browser header */}
                    <div className="mb-4 flex items-center gap-2 border-b border-white/[0.07] pb-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/10" />

                      <div className="ml-auto h-2 w-24 rounded bg-white/[0.05]" />
                    </div>

                    {/* fake dashboard */}
                    <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
                      <div className="space-y-3">
                        <div className="h-20 rounded-xl border border-white/[0.06] bg-white/[0.025]" />

                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-20 rounded-xl border border-white/[0.06] bg-white/[0.025]" />
                          <div className="h-20 rounded-xl border border-white/[0.06] bg-white/[0.025]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/[0.04]">
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-blue-500/20">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-blue-400">
                              86
                            </p>

                            <p className="text-[10px] uppercase tracking-wider text-gray-600">
                              Score
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating logo tile */}
                  <div className="absolute -bottom-6 left-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/20 bg-[#0B0F1A] shadow-2xl shadow-blue-500/10">
                    <Sparkles size={30} className="text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8">
              <p className="text-xs text-gray-700">
                Practice with confidence. Improve with every interview.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT SIDE - LOGIN
        ========================================================= */}
        <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/[0.05] blur-[120px] lg:hidden" />

          <div className="relative w-full max-w-md">
            {/* Mobile logo */}
            <Link
              href="/"
              className="mx-auto mb-8 flex w-fit items-center gap-2.5 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <Sparkles size={18} />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                Interview<span className="text-blue-400">Forge</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign in to continue your interview preparation.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-2xl shadow-black/30 sm:p-7">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.025] px-5 py-3.5 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                {/* Google icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.21Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.75c2.63 0 4.84-.87 6.45-2.37l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.71-5.46-4.01H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.85A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.85V7.63H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.37l3.24-2.52Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.18 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.63l3.24 2.52C7.31 7.85 9.46 6.14 12 6.14Z"
                  />
                </svg>

                Continue with Google

                <ArrowRight
                  size={16}
                  className="ml-auto text-gray-600 transition-transform group-hover:translate-x-0.5"
                />
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.08]" />

                <span className="text-[11px] uppercase tracking-[0.15em] text-gray-700">
                  Or continue with email
                </span>

                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-gray-400"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-white/[0.14] bg-[#070A12] py-3.5 pl-11 pr-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 hover:border-white/20 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-medium text-gray-400"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs text-blue-400 transition hover:text-blue-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      id="password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-white/[0.14] bg-[#070A12] py-3.5 pl-11 pr-11 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 hover:border-white/20 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20"
                >
                  Sign In
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>

              {/* Signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-700">
              <ShieldCheck size={14} />
              Your account and interview data are securely managed.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-100">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}