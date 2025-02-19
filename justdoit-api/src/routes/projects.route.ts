import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.middleware';
import { ProjectController } from '../controllers/projects.controller';
import { zValidator } from '@hono/zod-validator';
import { projectCreateSchema } from '../types';

const app = new Hono();

app.use(authMiddleware)
app.post('/', zValidator('json', projectCreateSchema), ProjectController.createProject);
app.get('/', ProjectController.getAllProjects);
app.get('/:id', ProjectController.getProjectById);
app.get('/:name/tasks', ProjectController.getProjectTaskByProjectName);
app.delete('/:id', ProjectController.deleteProject);
export default app;
