import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.middleware';
import { AuthController } from '../controllers/auth.controller';

const app = new Hono();

app.use(authMiddleware)
app.get('/me', AuthController.checkAuth);


export default app;