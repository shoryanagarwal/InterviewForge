import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex w-fit items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <Sparkles size={17} />
              </div>

              <span className="font-semibold tracking-tight text-white">
                Interview<span className="text-blue-400">Forge</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              AI-powered interview practice designed to help you prepare,
              perform, and improve with every session.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                Product
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href="#features"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  How It Works
                </a>

                <a
                  href="#about"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  About
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                Account
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/login"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                Interview
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/interview/create"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  Start Interview
                </Link>

                <Link
                  href="/history"
                  className="block text-sm text-gray-600 transition hover:text-gray-300"
                >
                  History
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-gray-700 sm:flex-row sm:items-center sm:justify-between">
  <p>
    © {new Date().getFullYear()} InterviewForge. All rights reserved.
  </p>

  <p>
    Built by{" "}
    <span className="font-medium text-gray-500">
      Shoryan Agarwal
    </span>
  </p>
</div>
      </div>
    </footer>
  );
}