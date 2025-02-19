import { Context } from "hono";
import { CategoryService } from "../services/categories.service";
import { format_response } from "../utils/api-response";
import { categories } from "../schema";

export class CategoriesController{
    public static readonly getAllCategories = async (ctx:Context) => {
        try{
            const userId = ctx.get("userId");
            const categories = await CategoryService.getAllCategories(Number(userId))
            return ctx.json(
                format_response(200, categories, {meta:{
                    total: categories?.length ?? 0, is_error: false
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

    public static readonly getCategoryById = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const category = await CategoryService.getCategoryById(Number(id))
            if (!category) {
                return ctx.json(
                    format_response(404, "Category not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, category, {meta:{is_error: false}}),
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

    public static readonly createCategory = async (ctx:Context) => {
        try{
            const userId = ctx.get("userId");
            const data:Omit<typeof categories.$inferInsert, 'userId'> = await ctx.req.json()
            const category = await CategoryService.createCategory({
                ...data,
                userId: Number(userId)
            })
            return ctx.json(
                format_response(201, category, {meta:{is_error: false}}),
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

    public static readonly updateCategory = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const userId = ctx.get("userId");
            const data = await ctx.req.json()
            const currentDate = new Date();
            const category = await CategoryService.updateCategory(Number(id), {
                ...data,
                id: Number(id),
                userId: Number(userId),
                createdAt: currentDate,
                updatedAt: currentDate
            })
            if (category === undefined) {
                return ctx.json(
                    format_response(404, "Category not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, category, {meta:{is_error: false}}),
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

    public static readonly deleteCategory = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const category = await CategoryService.deleteCategory(Number(id))
            if (!category) {
                return ctx.json(
                    format_response(404, "Category not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, category, {meta:{is_error: false}}),
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

    public static readonly getCategoriesByUserId = async (ctx:Context) => {
        try{
            const userId = ctx.req.param("userId")
            const categories = await CategoryService.getCategoriesByUserId(Number(userId))
            return ctx.json(
                format_response(200, categories, {meta:{
                    total: categories?.length ?? 0, is_error: false
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