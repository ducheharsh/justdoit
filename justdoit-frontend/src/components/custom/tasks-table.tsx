"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CircularCheckbox } from "@/components/ui/circular-checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Task, taskPriorityEnum, TaskUpdate } from "@/types"

import toast from "react-hot-toast"
import { Skeleton } from "../ui/skeleton"
import NovelEditor from "../editor/editor"
import { INITIAL_EDITOR_VALUE } from "@/lib/static"
import { useSearchParams } from "next/navigation"
import { useTasksByProjectId, useUpdateTask } from "@/hooks/api/tasks.action"
import { useCategories } from "@/hooks/api/categories.action"
import CreateCategory from "../popups/create-category"


export default function TasksTable(
    {
        tasks,
        isLoading,
        isFetched
    }: {
        tasks: Task[]
        isLoading: boolean
        isFetched: boolean
    }
) {

    const projectId = useSearchParams().get('id')
    const updateTask = useUpdateTask()

    const { data } = useCategories()
    const tasksD = useTasksByProjectId(projectId ? parseInt(projectId) : 0)

    const categories = data?.map((category) => ({
        id: category.id,
        name: category.name
    })) ?? []

    const [filter, setFilter] = React.useState("")

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(filter.toLowerCase()) ||
            (task.categoryId &&
                categories
                    .find((c) => c.id === task.categoryId)
                    ?.name.toLowerCase()
                    .includes(filter.toLowerCase())),
    )


    const toggleTaskCompletion = (id: number, task: TaskUpdate) => {
        toast.promise(
            () => updateTask.mutateAsync({ id: id, data: task },
                {
                    onSuccess: () => tasksD.refetch()
                }
            ),
            {
                loading: 'Updating...',
                success: <b>Task updated successfully! 🎉</b>,
                error: <b>Oops Something went wrong 😑</b>
            },

        )
    }

    const updateTaskField = (taskId: number, updatedData: TaskUpdate) => {
        toast.promise(
            () => updateTask.mutateAsync({ id: taskId, data: updatedData },
                {
                    onSuccess: () => tasksD.refetch()
                }
            ),
            {
                loading: 'Updating...',
                success: <b>Task updated successfully! 🎉</b>,
                error: <b>Oops Something went wrong 😑</b>
            })
    }


    return (
        <div className="container mx-auto w-full py-10">
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Filter tasks..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                />
                <CreateCategory />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    isLoading && (
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                {
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <TableCell key={index}>
                                            <Skeleton className={`w-[${index === 0 ? '20px' : '200px'}] h-[20px]`} />
                                        </TableCell>
                                    ))
                                }

                            </TableRow>
                        ))

                    )
                }
                {tasks.length > 0 && isFetched && (
                    <TableBody>
                        {filteredTasks.map((task) => (
                            <TableRow key={task.id} className={task.isCompleted ? "bg-muted " : ""}>
                                <TableCell>
                                    <CircularCheckbox checked={task.isCompleted} onChange={
                                        () => toggleTaskCompletion(task.id, {
                                            title: task.title,
                                            description: task.description ?? undefined,
                                            dueDate: task.dueDate ?? undefined,
                                            priority: task.priority,
                                            categoryId: task.categoryId,
                                            projectId: task.projectId,
                                            isCompleted: !task.isCompleted
                                        })
                                    } />
                                </TableCell>
                                <TableCell className={task.isCompleted ? 'line-through' : ''}>{task.title}</TableCell>
                                <TableCell>
                                    <Select
                                        value={task.priority.toString()}
                                        onValueChange={(value: string) => updateTaskField(task.id, {
                                            title: task.title,
                                            description: task.description ?? undefined,
                                            dueDate: task.dueDate ?? undefined,
                                            priority: Number.parseInt(value),
                                            categoryId: task.categoryId,
                                            projectId: task.projectId,
                                            isCompleted: task.isCompleted
                                        })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {taskPriorityEnum.options.map((priority) => (
                                                <SelectItem key={priority} value={priority.toString()}>
                                                    {taskPriorityEnum.getPriorityLabel(priority)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {task.dueDate ? format(task.dueDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <CalendarComponent
                                                mode="single"
                                                selected={task.dueDate ? new Date(task.dueDate) : undefined}
                                                onSelect={(date) => updateTaskField(task.id, {
                                                    title: task.title,
                                                    description: task.description ?? undefined,
                                                    dueDate: date,
                                                    priority: task.priority,
                                                    categoryId: task.categoryId,
                                                    projectId: task.projectId,
                                                    isCompleted: task.isCompleted
                                                })}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    {task.categoryId ? categories.find((c) => c.id === task.categoryId)?.name : "Uncategorized"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline">View Details</Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>{task.title}</SheetTitle>
                                            </SheetHeader>
                                            <div className="py-4">
                                                <NovelEditor
                                                    bool={false}
                                                    id={task.id.toString()}
                                                    initialValue={(() => {
                                                        try {
                                                            return JSON.parse(task.description ?? '""') ?? INITIAL_EDITOR_VALUE;
                                                        } catch {
                                                            return INITIAL_EDITOR_VALUE;
                                                        }
                                                    })()}
                                                />
                                                <div className="mt-4">
                                                    <Label htmlFor="category">Category</Label>
                                                    <Select
                                                        value={task.categoryId?.toString() || ""}
                                                        onValueChange={(value) => updateTaskField(task.id, {
                                                            title: task.title,
                                                            description: task.description ?? undefined,
                                                            dueDate: task.dueDate ?? undefined,
                                                            priority: task.priority,
                                                            categoryId: value ? Number.parseInt(value) : null,
                                                            projectId: task.projectId,
                                                            isCompleted: task.isCompleted
                                                        })}
                                                    >
                                                        <SelectTrigger id="category">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}

                {tasks.length === 0 && isFetched && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                            No tasks found
                        </TableCell>
                    </TableRow>
                )}
            </Table>
        </div>
    )
}

