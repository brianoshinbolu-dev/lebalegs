import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');

        let query = supabase.from('products').select('*').order('createdAt', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        if (featured === 'true') {
            query = query.eq('featured', true);
        }

        const { data: products, error } = await query;

        console.log('Supabase products fetch:', { count: products?.length, hasError: !!error });

        if (error) throw error;

        return NextResponse.json(products);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const productData = await request.json();

        const newProduct = {
            ...productData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const { data, error } = await supabase.from('products').insert([newProduct]).select().single();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
