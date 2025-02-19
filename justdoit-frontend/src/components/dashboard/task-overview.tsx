import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/api/tasks.action"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function TaskOverview() {

  const tasks = useTasks()
  const completed = tasks.data?.filter((task) => task.isCompleted).length
  const overdue = tasks.data?.filter((task) => !task.isCompleted &&
    task.dueDate != null && new Date(task.dueDate) < new Date()
  ).length

  const stats = [
    { title: "Completed", value: completed, icon: CheckCircle, color: "text-green-500" },
    { title: "In Progress", value: 0, icon: Clock, color: "text-blue-500" },
    { title: "Overdue", value: overdue, icon: AlertCircle, color: "text-red-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.title} className="flex flex-col items-center">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <h3 className="mt-2 text-3xl font-semibold">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

