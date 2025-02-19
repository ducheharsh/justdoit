'use client'
import { TaskOverview } from "@/components/dashboard/task-overview"
import { ProductivityInsights } from "@/components/dashboard/productivity-insights"
import { TaskDistribution } from "@/components/dashboard/task-distribution"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { ProjectProgress } from "@/components/dashboard/project-progress"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black  p-8">
      <h1 className="text-5xl font-extrabold mb-8 text-white font-sans">Your Productivity Hub 📈</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TaskOverview />
        <ProductivityInsights />
        <TaskDistribution />
        <UpcomingDeadlines />
        <ProjectProgress />
      </div>
    </div>
  )
}

