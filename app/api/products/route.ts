import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

export async function GET(request: Request) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        const { products } = JSON.parse(data);

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let filteredProducts = products;

        if (category) {
            filteredProducts = filteredProducts.filter((p: Product) => p.category === category);
        }

        if (featured === 'true') {
            filteredProducts = filteredProducts.filter((p: Product) => p.featured === true);
        }

        return NextResponse.json(filteredProducts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProduct = await request.json();
        const data = await fs.readFile(dataPath, 'utf-8');
        const { products } = JSON.parse(data);

        const product: Product = {
            ...newProduct,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        products.push(product);
        await fs.writeFile(dataPath, JSON.stringify({ products }, null, 2));

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
