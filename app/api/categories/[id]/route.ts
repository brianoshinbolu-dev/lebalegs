import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const categoriesPath = path.join(process.cwd(), 'data', 'categories.json');
const productsPath = path.join(process.cwd(), 'data', 'products.json');

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Load products to check if any are using this category
        const productsData = await fs.readFile(productsPath, 'utf-8');
        const { products } = JSON.parse(productsData);

        const isBeingUsed = products.some((p: any) => p.category === id);
        if (isBeingUsed) {
            return NextResponse.json({
                error: 'Category is being used by products and cannot be deleted.'
            }, { status: 400 });
        }

        const data = await fs.readFile(categoriesPath, 'utf-8');
        const { categories } = JSON.parse(data);

        const filteredCategories = categories.filter((c: any) => c.id !== id);

        if (filteredCategories.length === categories.length) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        await fs.writeFile(categoriesPath, JSON.stringify({ categories: filteredCategories }, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
