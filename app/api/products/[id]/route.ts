import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const { products } = JSON.parse(data);
        const product = products.find((p: Product) => p.id === params.id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const updates = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        const { products } = JSON.parse(data);

        const index = products.findIndex((p: Product) => p.id === params.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        products[index] = {
            ...products[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(dataPath, JSON.stringify({ products }, null, 2));

        return NextResponse.json(products[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const { products } = JSON.parse(data);

        const filtered = products.filter((p: Product) => p.id !== params.id);

        if (filtered.length === products.length) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        await fs.writeFile(dataPath, JSON.stringify({ products: filtered }, null, 2));

        return NextResponse.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
