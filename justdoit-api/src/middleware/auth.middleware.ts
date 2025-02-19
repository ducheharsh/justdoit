import { Context, Next } from 'hono';
import { verify, sign } from 'hono/jwt';
import { config } from '../utils/env';

const jwtSecret = config.JWT_SECRET;

export const authMiddleware = async (ctx:Context, next:Next) => {
  const pretoken = ctx.req.header("Authorization");

  if (!pretoken) {
    ctx.status(401);
    return ctx.json({ error: "Access Denied" });
  }
  const token = pretoken.split(" ")[1];

  try {
    const verifiedToken = await verify(token, jwtSecret);

    if (verifiedToken.id) {
      ctx.set("userId", verifiedToken.id);
      await next();
    } else {
      
      ctx.json({ error: "Invalid token (Unauthorized)" }, 401);
    }
  } catch (err) {
    return ctx.json("Invalid token", 401);
  }
}

export const getToken = async (ctx:Context) => {
  const pretoken = ctx.req.header("Authorization");
  return pretoken ? pretoken.split(" ")[1] : null;
}

export const signToken = async (id:string) => {
  return await sign({ id }, jwtSecret);
}

export const verifyToken = async (ctx:Context) => {
  const token = await getToken(ctx);
  if (!token) return null;
  return await verify(token, jwtSecret);
}