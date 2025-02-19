import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { routes } from './routes'

const app = new Hono()

app.use(prettyJSON())
app.use(poweredBy())
app.use(logger())

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowHeaders: ['*'],
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', routes())
showRoutes(app)
export default app
