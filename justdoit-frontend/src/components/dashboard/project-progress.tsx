import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useTasks } from "@/hooks/api/tasks.action"
import { Task } from "@/types"

export function ProjectProgress() {

  const { data: tasks } = useTasks()

  const projectWiseTasks = tasks?.reduce((acc, task) => {
    if (task.projectId !== undefined) {
      const projectId = Number(task.projectId);
      if (projectId in acc) {
        acc[projectId].push(task)
      } else {
        acc[projectId] = [task]
      }
    }
    return acc
  }, {} as Record<number, Task[]>)

  const projects = projectWiseTasks ? Object.entries(projectWiseTasks).map(([, tasks]) => {
    const completed = tasks.filter((task) => task.isCompleted).length
    const total = tasks.length
    const progress = Math.round((completed / total) * 100)
    return { name: tasks[0].projectId, progress }
  }) : []



  // const projects = [
  //   { name: "Website Redesign", progress: 75 },
  //   { name: "Mobile App", progress: 30 },
  //   { name: "Marketing Campaign", progress: 50 },
  //   { name: "Database Migration", progress: 90 },
  // ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

