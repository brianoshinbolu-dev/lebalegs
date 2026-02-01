import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Check if any products are using this category
        const { data: products, error: prodError } = await supabase
            .from('products')
            .select('id')
            .eq('category', id)
            .limit(1);

        if (prodError) throw prodError;

        if (products && products.length > 0) {
            return NextResponse.json({
                error: 'Category is being used by products and cannot be deleted.'
            }, { status: 400 });
        }

        const { error: catError } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (catError) throw catError;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
