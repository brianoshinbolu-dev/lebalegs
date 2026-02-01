'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        inStock: 0,
        outOfStock: 0,
        categories: 0,
    });

    useEffect(() => {
        // Check authentication first
        const auth = sessionStorage.getItem('adminAuth');
        if (!auth) {
            router.push('/admin/login');
            return;
        }

        setIsAuthenticated(true);
        setLoading(false);

        async function fetchStats() {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ]);

                const products = await productsRes.json();
                const categories = await categoriesRes.json();

                setStats({
                    totalProducts: products.length,
                    inStock: products.filter((p: any) => p.inStock).length,
                    outOfStock: products.filter((p: any) => !p.inStock).length,
                    categories: categories.length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }

        fetchStats();
    }, [router]);

    if (loading || !isAuthenticated) {
        return null;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 font-playfair">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-600 font-semibold">Total Products</h3>
                        <Package className="text-gold" size={24} />
                    </div>
                    <p className="text-3xl font-bold">{stats.totalProducts}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-600 font-semibold">In Stock</h3>
                        <ShoppingBag className="text-green-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold">{stats.inStock}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-600 font-semibold">Out of Stock</h3>
                        <TrendingUp className="text-red-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold">{stats.outOfStock}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-600 font-semibold">Categories</h3>
                        <Package className="text-blue-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold">{stats.categories}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/admin/products/new"
                        className="bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Add New Product
                    </Link>
                    <Link
                        href="/admin/products"
                        className="bg-dark hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Manage Products
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        className="bg-gray-200 hover:bg-gray-300 text-dark font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        View Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
