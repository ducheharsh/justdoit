import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TaskCreate, taskCreateSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import NovelEditor from "../editor/editor";
import { JSONContent } from "novel";
import { INITIAL_EDITOR_VALUE } from "@/lib/static";
import { useCreateTask, useTasksByProjectId } from "@/hooks/api/tasks.action";

// Define types and constants
type TaskPriority = "1" | "2" | "3";

const TASK_PRIORITIES: Record<TaskPriority, string> = {
    "1": "High",
    "2": "Medium",
    "3": "Low",
};


interface CreateTaskProps {
    children: React.ReactNode;
}

export function CreateTask({ children }: CreateTaskProps) {
    const createTask = useCreateTask();

    const searchParams = useSearchParams();
    const projectId = Number(searchParams.get("id"));
    const tasks = useTasksByProjectId(projectId);

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        reset,
        formState: { isValid },
    } = useForm<TaskCreate>({
        resolver: zodResolver(taskCreateSchema),
        mode: "onChange",
        defaultValues: {
            projectId,
            priority: 2, // Set default priority to Medium
        },
    });

    const onSubmit = async (data: TaskCreate) => {
        toast.promise(createTask.mutateAsync(data, {
            onSettled: () => {
                reset()
                tasks.refetch()
            },
        }), {
            loading: "Saving...",
            success: "Task created successfully! 🎉",
            error: "Something went wrong 😑",
        });
    };

    const handleEditorChange = (value: JSONContent) => {
        setValue("description", JSON.stringify(value));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setValue("dueDate", date);
    };

    const handlePriorityChange = (value: TaskPriority) => {
        setValue("priority", Number(value));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Task 📝</DialogTitle>
                    <DialogDescription>
                        Fill in the task details and click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter task title"
                                {...register("title")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                onChange={handleDateChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={String(getValues("priority"))}
                                onValueChange={handlePriorityChange}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {(Object.entries(TASK_PRIORITIES) as [TaskPriority, string][]).map(
                                        ([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Task Description</Label>
                            <NovelEditor
                                bool={true}
                                id="task-description"
                                initialValue={INITIAL_EDITOR_VALUE}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose>
                            <Button
                                type="submit"
                                disabled={!isValid}
                                className="w-full sm:w-auto"
                            >
                                Create Task
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}