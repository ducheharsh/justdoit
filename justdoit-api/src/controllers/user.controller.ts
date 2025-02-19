import { Context } from "hono";
import { UserService } from "../services/user.service";
import { format_response } from "../utils/api-response";
import { users } from "../schema";

export class UserController{
    public static readonly getAllUsers = async (ctx:Context) => {
        try{
            const users = await UserService.getAllUsers()
            return ctx.json(
                format_response(200, users, {meta:{
                    total: users.length, is_error: false
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

    public static readonly getUserById = async (ctx:Context) => {
        try{
            const id = ctx.req.param("id")
            const user = await UserService.getUserById(Number(id))
            if (!user) {
                return ctx.json(
                    format_response(404, "User not found", {
                        is_error: true,
                    }),
                    404,
                );
            }
            return ctx.json(
                format_response(200, user, {meta:{is_error: false}}),
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

    public static readonly createUser = async (ctx:Context) => {
        try{
            const data:typeof users.$inferInsert  = await ctx.req.json()
            const user = await UserService.createUser(data)
    
            if (!user) {
                return ctx.json(
                    format_response(400, "Failed to create user", {
                        is_error: true,
                    }),
                    400
                );
            }

            return ctx.json(
                format_response(201, user, {meta:{is_error: false}}),
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

    public static readonly signInUser = async (ctx:Context) => {
        try{
            const {email, password} = await ctx.req.json()
            const user = await UserService.signInUser({
                email,
                password
            })
            if (!user) {
                return ctx.json(
                    format_response(404, "User not found", {
                        is_error: true,
                    }),
                    404
                );
            }
            return ctx.json(
                format_response(200, user, {meta:{is_error: false}}),
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