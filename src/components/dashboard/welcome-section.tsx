import type { Session } from "next-auth";

interface WelcomeSectionProps {
  session: Session;
}

export default function WelcomeSection({
  session,
}: WelcomeSectionProps) {
  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-400">
          Your interview journey
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome back,{" "}
          <span className="text-blue-400">{firstName}</span> 👋
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Every interview is an opportunity to get better. Practice,
          discover your weak points, and build the confidence to ace
          your next interview.
        </p>

        <p className="mt-4 text-sm italic text-gray-500">
          Practice with purpose. Perform with confidence.
        </p>
      </div>
    </section>
  );
}