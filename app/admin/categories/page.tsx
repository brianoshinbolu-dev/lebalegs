'use client';
import { useState, useEffect, FormEvent } from 'react';
import { Trash2, Plus, AlertCircle } from 'lucide-react';
import { Category } from '@/lib/types';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e: FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName }),
            });

            const data = await res.json();

            if (res.ok) {
                setCategories([...categories, data]);
                setNewCategoryName('');
            } else {
                setError(data.error || 'Failed to add category');
            }
        } catch (error) {
            setError('Error adding category');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteCategory = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                setCategories(categories.filter(c => c.id !== id));
            } else {
                alert(data.error || 'Failed to delete category');
            }
        } catch (error) {
            alert('Error deleting category');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 font-playfair">Manage Categories</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Category Form */}
                <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                    <h2 className="text-xl font-bold mb-6">Add New Category</h2>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 flex items-center gap-3">
                            <AlertCircle className="text-red-400" size={20} />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleAddCategory} className="space-y-4">
                        <div>
                            <label htmlFor="categoryName" className="block text-gray-700 font-semibold mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                placeholder="e.g. Belts, Watches"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Plus size={20} />
                            {submitting ? 'Adding...' : 'Add Category'}
                        </button>
                    </form>
                </div>

                {/* Categories List */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-6">Existing Categories</h2>

                    {loading ? (
                        <p className="text-gray-500">Loading categories...</p>
                    ) : categories.length === 0 ? (
                        <p className="text-gray-500">No categories found.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {categories.map((category) => (
                                <div key={category.id} className="py-4 flex items-center justify-between group">
                                    <div>
                                        <p className="font-semibold text-dark">{category.name}</p>
                                        <p className="text-sm text-gray-500">Slug: {category.slug}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCategory(category.id, category.name)}
                                        className="text-gray-400 hover:text-red-600 transition p-2"
                                        title="Delete Category"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
