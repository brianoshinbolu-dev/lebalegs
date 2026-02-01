'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types';

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Product not found</p>
                    <Link href="/products" className="text-gold hover:underline">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const whatsappUrl = `https://wa.me/2347036900931?text=${encodeURIComponent(product.whatsappMessage)}`;
    const priceFormatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(product.price);

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gold transition mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* Image Gallery */}
                        <div>
                            <div className="relative w-full h-96 mb-4">
                                <Image
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            {product.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-gold' : ''
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <h1 className="text-3xl font-bold mb-4 text-dark font-playfair">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold text-gold mb-6">{priceFormatted}</p>
                            <p className="text-gray-700 mb-6">{product.description}</p>

                            <div className="mb-6">
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${product.inStock
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={20} />
                                    Order on WhatsApp
                                </a>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="font-bold mb-2">Category</h3>
                                <p className="text-gray-600 capitalize">{product.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
