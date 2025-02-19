
import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.middleware';
import { TaskController } from '../controllers/tasks.controller';
import { zValidator } from '@hono/zod-validator';
import { taskCreateSchema } from '../types';

const app = new Hono();

app.use(authMiddleware)
app.post('/', zValidator('json', taskCreateSchema), TaskController.createTask);
app.get('/', TaskController.getAllTasks);
app.get('/project/:projectid', TaskController.getTasksByProjectId);
app.get('/:id', TaskController.getTaskById);
app.patch('/:id', TaskController.updateTask);

export default app;