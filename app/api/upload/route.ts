import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('images') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 }
            );
        }

        const uploadedUrls: string[] = [];

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                continue; // Skip non-image files
            }

            // Upload to Vercel Blob
            // Ensure you have BLOB_READ_WRITE_TOKEN in your env
            const blob = await put(`products/${Date.now()}-${file.name}`, file, {
                access: 'public',
            });

            uploadedUrls.push(blob.url);
        }

        return NextResponse.json({
            success: true,
            urls: uploadedUrls
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload images' },
            { status: 500 }
        );
    }
}
