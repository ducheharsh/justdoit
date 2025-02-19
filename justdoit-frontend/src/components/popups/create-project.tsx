import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
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

import { ProjectCreate, projectCreateSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useCreateProject, useProjects } from "@/hooks/api/projects.action";

export function CreateProject(
    { children }: { children: React.ReactNode }
) {
    const createProject = useCreateProject()
    const project = useProjects()

    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm<ProjectCreate>({
        resolver: zodResolver(projectCreateSchema),
        mode: 'onChange', // Enable real-time validation
    });

    const onSubmit = async (data: ProjectCreate) => {
        toast.promise(
            () => createProject.mutateAsync(data).then(() => {
                project.refetch()
            }),
            {
                loading: 'Saving...',
                success: <b>Project created successfully! 🎉</b>,
                error: <b>Oops Something went wrong 😑</b>,
            }
        )


    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 py-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" >
                                Title
                            </Label>
                            <Input id="name" placeholder="Academics"
                                {...register("name")}
                                className="col-span-3" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username" >
                                Description
                            </Label>
                            <Textarea id="username" placeholder="fugiat consequat duis sit consectetur ex"
                                {...register("description")}
                                className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button
                                disabled={!isValid}
                                type="submit">Add +</Button>
                        </DialogClose>
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    )
}
