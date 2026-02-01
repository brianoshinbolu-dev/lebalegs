'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Award } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple authentication check
        if (username === 'leba' && password === 'osh') {
            sessionStorage.setItem('adminAuth', 'true');
            router.push('/admin');
        } else {
            setError('Invalid username or password');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="flex items-center justify-center mb-8">
                    <Award className="text-gold mr-2" size={32} />
                    <h1 className="text-2xl font-bold font-playfair">
                        LEBA <span className="text-gold">EMPIRE</span>
                    </h1>
                </div>

                <h2 className="text-xl font-bold text-center mb-6">Admin Login</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
