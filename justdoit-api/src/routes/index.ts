import { Hono } from "hono"
import UserRoute from "./user.route"
import ProjectRoute from "./projects.route"
import TaskRoute from "./tasks.route"
import AuthRoute from "./auth.route"
import CategoryRoute from "./categories.route"

export const routes = () =>{
    const app = new Hono<{
        Bindings: {
            DATABASE_URL: string,
            JWT_SECRET: string
        }
    }>()

    // app.route('/', DevRoute)

    // app.route('/static', StaticRoute)

    app.route('/user', UserRoute)
    app.route('/projects', ProjectRoute)
    app.route('/tasks', TaskRoute)
    app.route('/auth', AuthRoute)
    app.route('/categories', CategoryRoute)
    return app
}