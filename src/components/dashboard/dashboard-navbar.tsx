import Link from "next/link";
import type { Session } from "next-auth";

interface DashboardNavbarProps {  
  session: Session;
}

export default function DashboardNavbar({
  session,
}: DashboardNavbarProps) {
  return (
    <nav className="border-b border-white/10 bg-[#080B14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          href="/Dashboard"
          className="text-xl font-bold tracking-tight"
        >
          Interview<span className="text-blue-400">Forge</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link
            href="/help"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Help
          </Link>

          {/* Profile */}
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "Profile"}
                className="h-8 w-8 rounded-full border border-white/10"
              />
            )}

            <span className="hidden text-sm text-gray-300 sm:block">
              {session.user?.name}
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
}