import { Context } from "hono";
import { ProjectService } from "../services/projects.service";
import { format_response } from "../utils/api-response";
import { projects } from "../schema";

export class ProjectController{
    public static readonly getAllProjects = async (ctx:Context) => {
        try{
            const userId = ctx.get("userId");
            const projects = await ProjectService.getAllProjects(Number(userId))
            return ctx.json(
                format_response(200, projects, {meta:{
                    total: projects?.length ?? 0, is_error: false
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

    public static readonly getProjectById = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const project = await ProjectService.getProjectById(Number(id))
            if (!project) {
                return ctx.json(
                    format_response(404, "Project not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, project, {meta:{is_error: false}}),
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

    public static readonly createProject = async (ctx:Context) => {
        try{
            const userId = ctx.get("userId");
            const data: Omit<typeof projects.$inferInsert, 'userId'>  = await ctx.req.json()
            const project = await ProjectService.createProject({
                ...data,
                userId: Number(userId) 
            }
            )
            return ctx.json(
                format_response(201, project, {meta:{is_error: false}}),
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

    public static readonly updateProject = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const data:typeof projects.$inferSelect  = await ctx.req.json()
            const project = await ProjectService.updateProject(Number(id), data)
            if (!project) {
                return ctx.json(
                    format_response(404, "Project not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
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

    public static readonly deleteProject = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const project = await ProjectService.deleteProject(Number(id))
            if (!project) {
                return ctx.json(
                    format_response(404, "Project not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, project, {meta:{is_error: false}}),
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

    public static readonly getProjectTasks = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const tasks = await ProjectService.getProjectTasks(Number(id))
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

    public static readonly getProjectTaskByProjectName = async (ctx:Context) => {
        try{
            const name = ctx.req.param("name")
            const userId = ctx.get("userId");
            const tasks = await ProjectService.getProjectTaskByProjectName(name, Number(userId))
            return ctx.json(
                format_response(200, tasks, {meta:{
                    total: Array.isArray(tasks) ? tasks.length : tasks?.tasks?.length ?? 0, is_error: false
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