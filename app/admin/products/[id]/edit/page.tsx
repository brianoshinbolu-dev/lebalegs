'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Category, Product } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingProduct, setFetchingProduct] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        inStock: true,
        featured: false,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const [productRes, categoriesRes] = await Promise.all([
                    fetch(`/api/products/${params.id}`),
                    fetch('/api/categories')
                ]);

                const product: Product = await productRes.json();
                const categoriesData = await categoriesRes.json();

                setCategories(categoriesData);
                setImages(product.images);
                setFormData({
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: product.price.toString(),
                    inStock: product.inStock,
                    featured: product.featured,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error loading product');
            } finally {
                setFetchingProduct(false);
            }
        }

        if (params.id) {
            fetchData();
        }
    }, [params.id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (images.length === 0) {
            alert('Please upload at least one product image');
            return;
        }

        setLoading(true);

        try {

            const res = await fetch(`/api/products/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    category: formData.category,
                    price: parseFloat(formData.price),
                    images,
                    inStock: formData.inStock,
                    featured: formData.featured,
                    whatsappMessage: `Hello LEBA Empire, I want to order your ${formData.name}.`,
                }),
            });

            if (res.ok) {
                alert('Product updated successfully!');
                router.push('/admin/products');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingProduct) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-600">Loading product...</p>
            </div>
        );
    }

    return (
        <div>
            <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gold transition mb-6"
            >
                <ArrowLeft size={20} />
                Back to Products
            </Link>

            <h1 className="text-3xl font-bold mb-8 font-playfair">Edit Product</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
                        Category *
                    </label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                        Price (NGN) *
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        min="0"
                        step="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                    />
                </div>

                <div className="mb-6">
                    <ImageUpload images={images} onImagesChange={setImages} />
                </div>

                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.inStock}
                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                            className="mr-2 w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                        />
                        <span className="text-gray-700 font-semibold">In Stock</span>
                    </label>
                </div>

                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="mr-2 w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                        />
                        <span className="text-gray-700 font-semibold">Featured Product</span>
                    </label>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Updating Product...' : 'Update Product'}
                    </button>
                    <Link
                        href="/admin/products"
                        className="bg-gray-200 hover:bg-gray-300 text-dark font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
