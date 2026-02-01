'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.success && data.urls) {
                onImagesChange([...images, ...data.urls]);
            } else {
                alert('Failed to upload images');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading images');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    return (
        <div>
            <label className="block text-gray-700 font-semibold mb-2">
                Product Images *
            </label>

            {/* Upload Button */}
            <div className="mb-4">
                <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    <Upload size={20} />
                    {uploading ? 'Uploading...' : 'Upload Images'}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                    Upload one or more product images (JPG, PNG, WEBP)
                </p>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative group">
                            <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={url}
                                    alt={`Product image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                                <X size={16} />
                            </button>
                            <p className="text-xs text-gray-500 mt-1 text-center">
                                Image {index + 1}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={48} />
                    <p className="text-gray-500">No images uploaded yet</p>
                </div>
            )}
        </div>
    );
}
