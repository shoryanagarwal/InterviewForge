import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import WelcomeSection from "@/components/dashboard/welcome-section";
import ActionCards from "@/components/dashboard/action-card";
import ProgressStats from "@/components/dashboard/progress-stats";
import RecentInterviews from "@/components/dashboard/recent-interview";
import DashboardFooter from "@/components/dashboard/footer";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen bg-[#080B14] text-white">
      <DashboardNavbar session={session} />

      <WelcomeSection session={session} />

      <ActionCards />

      <ProgressStats />

      <RecentInterviews />

      <DashboardFooter />
    </main>
  );
}