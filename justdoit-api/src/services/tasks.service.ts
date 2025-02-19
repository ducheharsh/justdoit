import { eq } from "drizzle-orm";
import { db } from "../libs/db";
import { tasks } from "../schema";

export class TaskService{
    public static readonly getAllTasks = async (userId:number) => {
        const allTasks = await db
        .select()
        .from(tasks)
        .where(
            eq(tasks.userId, userId)
        )
        .execute()

        if (allTasks.length === 0) {
            return [];
        }
        return allTasks
    }

    public static readonly getTaskById = async (id: number) => {
        const task = await db.query.tasks.findFirst({
            where: eq(tasks.id, id)
        }).execute()
        if (!task) {
            throw new Error('Task not found')
        }
        return {
            id: task.id,
            name: task.title,
            description: task.description
        }
    }

    public static readonly createTask = async (data: typeof tasks.$inferInsert) => {
        const taskExists = await db.query.tasks.findFirst({
            where: eq(tasks.title, data.title)
        })
        if (taskExists) {
            throw new Error('Task already exists')
        }
        else {
            const [task] = await db.insert(tasks).values({
                ...data
            }).returning().execute()
            if (!task) {
                throw new Error('Failed to create task - database connection error')
            }
            return task
        }
    }

    public static readonly updateTask = async (id: number, data: typeof tasks.$inferSelect) => {
        const task = await db.query.tasks.findFirst({
            where: eq(tasks.id, id)
        })
        if (!task) {
            throw new Error('Task not found')
        }
        const updatedTask = await db.update(tasks).set({
            ...data
        }).where(eq(tasks.id, id)).execute()
        if (!updatedTask) {
            throw new Error('Failed to update task - database connection error')
        }
        return updatedTask
    }

    public static readonly deleteTask = async (id: number) => {
        const task = await db.query.tasks.findFirst({
            where: eq(tasks.id, id)
        })
        if (!task) {
            throw new Error('Task not found')
        }
        const deletedTask = await db.delete(tasks).where(eq(tasks.id, id)).execute()

        if (!deletedTask) {
            throw new Error('Failed to delete task - database connection error')
        }
        return deletedTask
    }

    public static readonly getTasksByProjectId = async (projectId: number) => {
        const projectTasks = await db.query.tasks.findMany({
            where: eq(tasks.projectId, projectId)
        }).execute()
        if (projectTasks.length === 0) {
            return [];
        }
        return projectTasks
    }

}
