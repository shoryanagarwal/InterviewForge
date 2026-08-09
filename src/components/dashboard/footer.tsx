import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080B14]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">
            Interview<span className="text-blue-400">Forge</span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Practice smarter. Interview better.
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-gray-500">
          <Link
            href="/help"
            className="transition hover:text-gray-300"
          >
            Help
          </Link>

          <Link
            href="/privacy"
            className="transition hover:text-gray-300"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="transition hover:text-gray-300"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}