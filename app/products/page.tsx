'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/lib/types';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();

                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-dark font-playfair">
                        Our <span className="text-gold">Products</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse our complete collection of luxury footwear and accessories
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2 rounded-full font-semibold transition ${selectedCategory === 'all'
                                ? 'bg-gold text-dark'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        All Products
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-2 rounded-full font-semibold transition capitalize ${selectedCategory === category.id
                                    ? 'bg-gold text-dark'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600">No products found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
