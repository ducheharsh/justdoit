import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/api/tasks.action"
import { CalendarDays } from "lucide-react"

export function UpcomingDeadlines() {
  const { data: tasks } = useTasks()

  const deadlinesD = tasks?.filter((task) => task.dueDate != null && new Date(task.dueDate) < new Date())
  const deadlines = deadlinesD?.map((deadline) => ({
    task: deadline.title,
    date: deadline.dueDate,
    project: deadline.projectId,
  }))


  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {deadlines?.map((deadline, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CalendarDays className="mt-0.5 h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">{deadline.task}</p>
                <p className="text-sm text-gray-500">
                  {deadline?.date?.toString()} - {deadline.project}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

