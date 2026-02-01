'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminNav from '@/components/layout/AdminNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        setIsAuthenticated(!!auth);
    }, [pathname]);

    // Don't show AdminNav on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Show AdminNav for authenticated admin pages
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100">
                <AdminNav />
                <main className="container mx-auto px-6 py-8">{children}</main>
            </div>
        );
    }

    // For non-authenticated users on admin pages (not login), just render children
    // The individual pages will handle redirecting to login
    return <>{children}</>;
}

