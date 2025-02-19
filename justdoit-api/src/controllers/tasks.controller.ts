import { Context } from "hono";
import { TaskService } from "../services/tasks.service";
import { format_response } from "../utils/api-response";
import { tasks } from "../schema";

export class TaskController{
    public static readonly getAllTasks = async (ctx:Context) => {
        try{
            const userId = ctx.get("userId");
            const tasks = await TaskService.getAllTasks(Number(userId))
            return ctx.json(
                format_response(200, tasks, {meta:{
                    total: tasks?.length ?? 0, is_error: false
                }}),    
                200
            )
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json(
                    format_response(500, error.message, {
                        is_error: true,
                    }),
                    500,
                );
            }
        }
    }

    public static readonly getTaskById = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const task = await TaskService.getTaskById(Number(id))
            if (!task) {
                return ctx.json(
                    format_response(404, "Task not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, task, {meta:{is_error: false}}),
                200
            )
            } 
        catch (error) {
                if (error instanceof Error) {
                    return ctx.json(
                        format_response(500, error.message, {
                            is_error: true,
                        }),
                        500,
                    );
                }
            }
    }  

    public static readonly createTask = async (ctx:Context) => {
        try{
            const userId = ctx.get("userId");
            const data:typeof tasks.$inferInsert  = await ctx.req.json()
            const task = await TaskService.createTask({
                ...data,
                userId: Number(userId)
            })
            return ctx.json(
                format_response(201, task, {meta:{is_error: false}}),
                201
            )
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json(
                    format_response(500, error.message, {
                        is_error: true,
                    }),
                    500,
                );
            }
        }
    }

    public static readonly updateTask = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const data:typeof tasks.$inferSelect  = await ctx.req.json()
            const task = await TaskService.updateTask(Number(id), data)
            if (!task) {
                return ctx.json(
                    format_response(404, "Task not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, task, {meta:{is_error: false}}),
                200
            )
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json(
                    format_response(500, error.message, {
                        is_error: true,
                    }),
                    500,
                );
            }
        }
    }

    public static readonly getTasksByProjectId = async (ctx:Context) => {
        try{
            const projectId = ctx.req.param("projectid")
            const tasks = await TaskService.getTasksByProjectId(Number(projectId))
            return ctx.json(
                format_response(200, tasks, {meta:{
                    total: tasks?.length ?? 0, is_error: false
                }}),    
                200
            )
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json(
                    format_response(500, error.message, {
                        is_error: true,
                    }),
                    500,
                );
            }
        }
    }
}