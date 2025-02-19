import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/api/tasks.action"
import { Task } from "@/types"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function TaskDistribution() {
  const { data: tasks } = useTasks()

  //taskDistrubution based on project

  const taskDistrubution = tasks?.reduce((acc, task) => {
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

  const projects = taskDistrubution ? Object.entries(taskDistrubution).map(([, tasks]) => {
    return { name: tasks[0].projectId, value: tasks.length }
  }) : []



  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={projects}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {projects?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

