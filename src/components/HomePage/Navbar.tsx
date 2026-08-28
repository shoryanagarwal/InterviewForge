"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#05070D]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
            <Sparkles size={17} />
          </div>

          <span className="font-semibold tracking-tight text-white">
            InterviewForge
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="#features"
            className="rounded-xl px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="rounded-xl px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="rounded-xl px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/[0.04] hover:text-white sm:block"
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => router.push("/interview/create")}
            className="flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 hover:shadow-blue-500/20"
          >
            <span className="hidden sm:inline">
              Get Started
            </span>

            <span className="sm:hidden">
              Start
            </span>

            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}