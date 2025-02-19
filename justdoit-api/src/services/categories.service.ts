import { eq } from "drizzle-orm";
import { db } from "../libs/db";
import { categories } from "../schema";

export class CategoryService{
    public static readonly getAllCategories = async (userId:number) => {
        const allCategories = await db
        .select()
        .from(categories)
        .where(
            eq(categories.userId, userId)
        )
        .execute()
        if (allCategories.length === 0) {
            return [];
        }
        return allCategories
    }

    public static readonly getCategoryById = async (id: number) => {
        const category = await db.query.categories.findFirst({
            where: eq(categories.id, id)
        }).execute()
        if (!category) {
            throw new Error('Category not found')
        }
        return {
            id: category.id,
            name: category.name,
            userId: category.userId
        }
    }

    public static readonly createCategory = async (data: typeof categories.$inferInsert) => {
        const categoryExists = await db.query.categories.findFirst({
            where: eq(categories.name, data.name)
        })
        if (categoryExists) {
            throw new Error('Category already exists')
        }
        else {
            const [category] = await db.insert(categories).values({
                ...data
            }).returning().execute()
            if (!category) {
                throw new Error('Failed to create category - database connection error')
            }
            return category
        }
    }

    public static readonly updateCategory = async (id: number, data: typeof categories.$inferSelect) => {
        const category = await db.query.categories.findFirst({
            where: eq(categories.id, id)
        })
        if (!category) {
            throw new Error('Category not found')
        }
        const updatedCategory = await db.update(categories).set({
            ...data
        }).where(eq(categories.id, id)).returning().execute()
        if (!updatedCategory) {
            throw new Error('Failed to update category - database connection error')
        }
        return updatedCategory
    }

    public static readonly deleteCategory = async (id: number) => {
        const category = await db.query.categories.findFirst({
            where: eq(categories.id, id)
        })
        if (!category) {
            throw new Error('Category not found')
        }
        const deletedCategory = await db.delete(categories).where(eq(categories.id, id)).execute()

        if (!deletedCategory) {
            throw new Error('Failed to delete category - database connection error')
        }

        return deletedCategory
    }

    public static readonly getCategoriesByUserId = async (userId: number) => {
        const categoryResults = await db.query.categories.findMany({
            where: eq(categories.userId, userId)
        }).execute()
        if (!categoryResults) {
            throw new Error('Categories not found')
        }
        return categoryResults
    }

}