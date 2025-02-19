import { eq, and, SQL } from "drizzle-orm";
import { db } from "../libs/db";
import { projects } from "../schema";

export class ProjectService{
    public static readonly getAllProjects = async (userId:number) => {
        const allProjects = await db
        .select()
        .from(projects)
        .where(
            eq(projects.userId, userId)
        )
        .execute()
        if (allProjects.length === 0) {
            return [];
        }
        return allProjects
    }

    public static readonly getProjectById = async (id: number) => {
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, id)
        }).execute()
        if (!project) {
            throw new Error('Project not found')
        }
        return {
            id: project.id,
            name: project.name,
            description: project.description
        }
    }

    public static readonly createProject = async (data: typeof projects.$inferInsert) => {
        const projectExists = await db.query.projects.findFirst({
            where: and(
                eq(projects.userId, data.userId),
                eq(projects.name, data.name)
            )
        })
        if (projectExists) {
            throw new Error('Project already exists')
        }
        else {
            const [project] = await db.insert(projects).values({
                ...data
            }).returning().execute()
            if (!project) {
                throw new Error('Failed to create project - database connection error')
            }
            return project
        }
    }

    public static readonly updateProject = async (id: number, data: typeof projects.$inferSelect) => {
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, id)
        })
        if (!project) {
            throw new Error('Project not found')
        }
        const updatedProject = await db.update(projects).set({
            ...data
        }).where(eq(projects.id, id)).returning().execute()
        if (!updatedProject) {
            throw new Error('Failed to update project - database connection error')
        }
        return updatedProject
    }

    public static readonly deleteProject = async (id: number) => {
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, id)
        })
        if (!project) {
            throw new Error('Project not found')
        }
        const deletedProject = await db.delete(projects).where(eq(projects.id, id)).returning().execute()
        if (!deletedProject) {
            throw new Error('Failed to delete project - database connection error')
        }
        return deletedProject
    }

    public static readonly getProjectTasks = async (id: number) => {
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, id)
        })
        if (!project) {
            throw new Error('Project not found')
        }
        const tasks = await db.query.tasks.findMany({
            where: eq(projects.id, id)
        })
        if (tasks.length === 0) {
            return []
        }
        return tasks
    }

    public static readonly getProjectTaskByProjectName = async (name: string, userId:number) => {
        const project = await db.query.projects.findFirst({
            where: and(
                eq(projects.userId, userId),
                eq(projects.name, name)
            )
        })
        if (!project) {
            throw new Error('Project not found')
        }
        const tasks = await db.query.tasks.findMany({
            where: eq(projects.id, project.id)
        })
        if (tasks.length === 0) {
            return []
        }
        return {
            projectId: project.id,
            projectName: project.name,
            tasks: tasks
        }
    }


}

