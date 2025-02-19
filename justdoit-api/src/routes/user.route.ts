import { Hono } from 'hono';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const app = new Hono();
app.post('/create', UserController.createUser);
app.post('/signin', UserController.signInUser);

app.use(authMiddleware)
app.get('/all', UserController.getAllUsers);
app.get('/user', UserController.getUserById);


export default app;