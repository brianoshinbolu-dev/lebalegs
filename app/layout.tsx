import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'LEBA EMPIRE | Luxury Footwear & Accessories',
    description: 'Handcrafted premium leather goods designed for sophistication and comfort',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="font-montserrat bg-white">
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
