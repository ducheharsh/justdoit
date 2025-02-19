'use client'
import { CreateTask } from "@/components/popups/create-task";
import TasksTable from "@/components/custom/tasks-table";
import { Button } from "@/components/ui/button";
import { useTasksByProjectId } from "@/hooks/api/tasks.action";

import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
    const projectName = useParams().project?.toString() ?? '';
    const searchParams = useSearchParams()
    const projectId = Number(searchParams.get('id'))
    const { data: tasks, isLoading, isFetched } = useTasksByProjectId(projectId)

    return (
        <div className="w-full">
            <div className="flex justify-between items-center w-full m-4">
                <h1 className="text-2xl font-semibold">{projectName?.replace('-', ' ').toUpperCase()}</h1>
                <CreateTask>
                    <Button className="mr-7">Add Tasks 🔥</Button>
                </CreateTask>
            </div>
            <div className="ml-4">
                <TasksTable tasks={tasks ?? []} isLoading={isLoading} isFetched={isFetched} />
            </div>
        </div>
    )
}