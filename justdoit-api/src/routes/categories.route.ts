import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.middleware';
import { CategoriesController } from '../controllers/categories.controller';

const app = new Hono();

app.use(authMiddleware)
app.get('/all', CategoriesController.getAllCategories);
app.get('/:id', CategoriesController.getCategoryById);
app.post('/create', CategoriesController.createCategory);
app.put('/:id', CategoriesController.updateCategory);
app.delete('/delete', CategoriesController.deleteCategory);


export default app;