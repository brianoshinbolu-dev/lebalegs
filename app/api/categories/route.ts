import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'categories.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const { categories } = JSON.parse(data);
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        if (!name) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        const data = await fs.readFile(dataPath, 'utf-8');
        const { categories } = JSON.parse(data);

        const id = name.toLowerCase().replace(/\s+/g, '-');

        if (categories.find((c: any) => c.id === id)) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
        }

        const newCategory = { id, name, slug: id };
        categories.push(newCategory);

        await fs.writeFile(dataPath, JSON.stringify({ categories }, null, 2));

        return NextResponse.json(newCategory);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
    }
}
