'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Award, Instagram, Twitter, Send, Menu, X } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-dark text-white py-4 px-6 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Award className="text-gold" size={24} />
                    <span className="text-xl font-semibold">
                        LEBA <span className="text-gold">EMPIRE</span>
                    </span>
                </Link>

                <div className="hidden md:flex space-x-8">
                    <Link href="/" className="hover:text-gold transition">Home</Link>
                    <Link href="/#about" className="hover:text-gold transition">About</Link>
                    <Link href="/products" className="hover:text-gold transition">Products</Link>
                    <Link href="/#contact" className="hover:text-gold transition">Contact</Link>
                </div>

                <div className="flex space-x-4 items-center">
                    <a href="https://instagram.com/lebaempireofficial" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
                        <Instagram size={20} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
                        <Twitter size={20} />
                    </a>
                    <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
                        <Send size={20} />
                    </a>
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-dark py-4 px-6 mt-4">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="hover:text-gold transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href="/#about" className="hover:text-gold transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/products" className="hover:text-gold transition" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                        <Link href="/#contact" className="hover:text-gold transition" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
