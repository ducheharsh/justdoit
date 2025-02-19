"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CategoryCreate, categoryCreateSchema } from "@/types"

import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateCategory } from "@/hooks/api/categories.action"

export default function CreateCategory() {
    const createCategory = useCreateCategory()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CategoryCreate>({
        resolver: zodResolver(categoryCreateSchema),
        mode: "onChange",
    });

    const onCategorySubmit = async (data: CategoryCreate) => {
        toast.promise(
            () => createCategory.mutateAsync(data),
            {
                loading: 'Saving...',
                success: <b>Category created successfully! 🎉</b>,
                error: <b>Oops Something went wrong 😑</b>
            })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCategorySubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register('name')}
                                className="col-span-4"
                            />
                            {
                                errors.name && (
                                    <span className="col-span-4 text-red-500 text-sm">{errors.name.message}</span>
                                )
                            }
                        </div>
                    </div>
                    <Button type="submit" className="self-end w-full" >Add Category</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}