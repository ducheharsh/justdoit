import { eq } from "drizzle-orm"
import { users } from "../schema/user.schema"
import { signToken } from "../middleware/auth.middleware"
import { hashPassword, verifyPassword } from "../utils/hashing"
import { db } from "../libs/db"

export class UserService{
    public static readonly getAllUsers = async () => {
        const allUsers = await db
        .select({
            id: users.id,
            email: users.email,
            username: users.username
        })
        .from(users)
        .execute()
        if (allUsers.length === 0) {
			return [];
		}
        return allUsers
    }

    public static readonly getUserById = async (id: number) => {

          const user = await db.query.users.findFirst({
            where: eq(users.id, id)
          }).execute()
            if (!user) {
                throw new Error('User not found')
            }
            return {
                id: user.id,
                email: user.email,
                username: user.username
            }
    }

    public static readonly createUser = async (data: typeof users.$inferInsert) => {

        const userExists = await db.query.users.findFirst({
                where: eq(users.email, data.email)
        })
        if (userExists) {
            throw new Error('User already exists')
        }  
        else{

            const pass = data.password
            const hashedPassword = await hashPassword(pass)

        const [user] = await db.insert(users).values({
            ...data,
            password: hashedPassword
        }).returning().execute()

        if (!user) {
            throw new Error('Failed to create user - database connection error')
        }
        const token = await signToken(user.id.toString())
        return {
            user,
            token: token
        }
    }

    }

    public static readonly updateUser = async (id: number, data: typeof users.$inferInsert) => {
        const user = await db.update(users).set(data).where(eq(users.id, id)).execute()
        if (!user) {
            throw new Error('Failed to update user - database connection error')
        }
        return user

    }

    public static readonly deleteUser = async (id: number) => {

        const user = await db.delete(users).where(eq(users.id, id)).execute()
        if (!user) {
            throw new Error('Failed to delete user - database connection error')
        }
        return user
  
    }

    public static readonly signInUser = async ({email, password }:{
        email: string;
        password: string;
    }) => {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
            columns: {
                id: true,
                email: true,
                username: true,
                password: true
            }
        })
        .execute()

        if (!user) {
            throw new Error('User not found')
        }

        const verifyPass = await verifyPassword(password, user.password)

        if (!verifyPass) {
            throw new Error('Invalid credentials')
        }

        const token = await signToken(user.id.toString())

        return {
            user:{
                id: user.id,
                email: user.email,
                username: user.username
            },
            token: `${token}`
        }

}

}