import { Context } from "hono";

export class AuthController{
    public static readonly checkAuth = async (ctx:Context) => {
        const userId = ctx.get("userId");
        if (!userId) {
            return ctx.json({message: "unauthorized"}, 401)
        }
        return ctx.json({message: "authorized"}, 200)
    }
}