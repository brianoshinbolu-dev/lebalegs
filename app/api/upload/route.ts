import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

        // Ensure the upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Directory might already exist, ignore error
        }

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                continue; // Skip non-image files
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename with timestamp
            const timestamp = Date.now();
            const originalName = file.name.replace(/\s+/g, '-');
            const filename = `${timestamp}-${originalName}`;
            const filepath = path.join(uploadDir, filename);

            // Write file to public/images/uploads
            await writeFile(filepath, buffer);

            // Return the public URL path
            uploadedUrls.push(`/images/uploads/${filename}`);
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
