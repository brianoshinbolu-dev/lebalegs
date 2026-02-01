'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Award, Package, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        router.push('/admin/login');
    };

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Products', icon: Package },
        { href: '/admin/categories', label: 'Categories', icon: Package },
    ];

    return (
        <nav className="bg-dark text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/admin" className="flex items-center space-x-2">
                    <Award className="text-gold" size={24} />
                    <span className="text-xl font-semibold">
                        LEBA <span className="text-gold">EMPIRE</span> Admin
                    </span>
                </Link>

                <div className="flex items-center space-x-6">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 hover:text-gold transition ${isActive ? 'text-gold' : ''
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 hover:text-gold transition"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
