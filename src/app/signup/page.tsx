"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
  ShieldCheck,
  BrainCircuit,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSignup = async () => {
    await signIn("google", {
      callbackUrl: "/Dashboard",
    });
  };

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault();

    try{
        const response=await fetch("/api/auth/signup",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })

        if(!response.ok){
            const errorData=await response.json();
            throw new Error(errorData.message || "Signup failed");
        }
        const data=await response.json();

        console.log("Signup successful:", data);

        const result=await signIn("credentials",{
            redirect:false,
            email:email,
            password:password
        })

        if(result?.error){
            throw new Error(result.error);
        }

        router.replace("/Dashboard");
        router.refresh();



    }
    catch(error){
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
    }

   
    // Credentials signup backend baad mein connect karenge.
  };

  return (
    <main className="min-h-screen bg-[#05070D] text-white">
      <div className="grid min-h-screen lg:grid-cols-[3fr_2fr]">
        {/* =========================================================
            LEFT SIDE
        ========================================================= */}
        <section className="relative hidden overflow-hidden border-r border-white/[0.08] lg:flex">
          {/* Glows */}
          <div className="pointer-events-none absolute left-[15%] top-[10%] h-[300px] w-[300px] rounded-full bg-blue-600/[0.08] blur-[130px]" />

          <div className="pointer-events-none absolute bottom-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-violet-600/[0.06] blur-[120px]" />

          {/* Tiny stars */}
          <div className="pointer-events-none absolute left-[18%] top-[20%] h-1 w-1 rounded-full bg-blue-400/50" />
          <div className="pointer-events-none absolute left-[74%] top-[25%] h-1 w-1 rounded-full bg-violet-400/50" />
          <div className="pointer-events-none absolute left-[38%] top-[57%] h-1 w-1 rounded-full bg-blue-400/40" />

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

            <div className="flex flex-1 flex-col justify-center">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Build Better Interview Habits
                </p>

                <h1 className="text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">
                  Your next
                  <span className="text-blue-400"> interview</span>
                  <br />
                  starts here.
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500 xl:text-base">
                  Create your InterviewForge account and practice realistic
                  interviews tailored to your role, experience, and goals.
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-10 space-y-5">
                <FeatureItem
                  icon={<BrainCircuit size={19} />}
                  title="Personalized Practice"
                  description="Questions tailored to your role and experience."
                />

                <FeatureItem
                  icon={<Target size={19} />}
                  title="Actionable Feedback"
                  description="Know exactly what to improve after every interview."
                />

                <FeatureItem
                  icon={<Sparkles size={19} />}
                  title="Practice with Confidence"
                  description="Build consistency before the real interview."
                />
              </div>

              {/* Visual */}
              <div className="relative mt-12 hidden xl:block">
                <div className="pointer-events-none absolute bottom-0 left-8 h-56 w-56 rounded-full bg-blue-500/[0.05] blur-[80px]" />

                <div className="relative mx-auto w-[82%] max-w-xl">
                  <div className="rounded-2xl border border-white/[0.10] bg-[#080B13]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                      <div>
                        <p className="text-xs text-gray-600">
                          InterviewForge
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                          Your preparation journey
                        </p>
                      </div>

                      <div className="rounded-lg border border-green-400/15 bg-green-500/[0.06] px-2.5 py-1.5 text-[10px] font-semibold text-green-400">
                        Ready
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <StatBox label="Interviews" value="12" />
                      <StatBox label="Avg. Score" value="8.6" />
                      <StatBox label="Improved" value="+24%" />
                    </div>

                    <div className="mt-4 h-28 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <div className="flex h-full items-end gap-2">
                        <div className="h-[35%] w-full rounded-t-md bg-blue-500/20" />
                        <div className="h-[45%] w-full rounded-t-md bg-blue-500/25" />
                        <div className="h-[50%] w-full rounded-t-md bg-blue-500/30" />
                        <div className="h-[68%] w-full rounded-t-md bg-blue-500/35" />
                        <div className="h-[76%] w-full rounded-t-md bg-blue-500/40" />
                        <div className="h-[88%] w-full rounded-t-md bg-blue-500/50" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 right-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/20 bg-[#0B0F1A] shadow-2xl shadow-blue-500/10">
                    <Sparkles size={30} className="text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            <p className="pt-8 text-xs text-gray-700">
              Practice today. Perform better tomorrow.
            </p>
          </div>
        </section>

        {/* =========================================================
            RIGHT SIDE
        ========================================================= */}
        <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
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
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Start preparing for your next interview today.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-white/[0.12] bg-[#0B0F1A] p-6 shadow-2xl shadow-black/30 sm:p-7">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.025] px-5 py-3.5 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
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
              <form
                onSubmit={handleSignup}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium text-gray-400"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full rounded-xl border border-white/[0.14] bg-[#070A12] py-3.5 pl-11 pr-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 hover:border-white/20 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/10"
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-medium text-gray-400"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Create a password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-white/[0.14] bg-[#070A12] py-3.5 pl-11 pr-11 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 hover:border-white/20 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-medium text-gray-400"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Repeat your password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-white/[0.14] bg-[#070A12] py-3.5 pl-11 pr-11 text-sm text-gray-200 outline-none transition placeholder:text-gray-700 hover:border-white/20 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
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
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20"
                >
                  Create Account
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>

              {/* Login */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-400 transition hover:text-blue-300"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security */}
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

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <p className="text-[10px] uppercase tracking-wider text-gray-700">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-gray-200">
        {value}
      </p>
    </div>
  );
}