import Link from 'next/link';
import { Award, Instagram, Twitter, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <div className="flex items-center space-x-2 mb-4">
                            <Award className="text-gold" size={24} />
                            <span className="text-xl font-semibold">
                                LEBA <span className="text-gold">EMPIRE</span>
                            </span>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            Luxury footwear and accessories crafted with perfection for the discerning individual.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-gold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="hover:text-gold transition">Home</Link></li>
                                <li><Link href="/#about" className="hover:text-gold transition">About</Link></li>
                                <li><Link href="/products" className="hover:text-gold transition">Products</Link></li>
                                <li><Link href="/#contact" className="hover:text-gold transition">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gold mb-4">Products</h3>
                            <ul className="space-y-2">
                                <li><Link href="/products?category=shoes" className="hover:text-gold transition">Shoes</Link></li>
                                <li><Link href="/products?category=bags" className="hover:text-gold transition">Bags</Link></li>
                                <li><Link href="/products?category=belts" className="hover:text-gold transition">Belts</Link></li>
                                <li><Link href="/products?category=sandals" className="hover:text-gold transition">Sandals</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gold mb-4">Connect</h3>
                            <ul className="space-y-2">
                                <li><a href="https://instagram.com/lebaempireofficial" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Instagram</a></li>
                                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Twitter</a></li>
                                <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Telegram</a></li>
                                <li><a href="mailto:oshstefan@gmail.com" className="hover:text-gold transition">Email</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 mb-4 md:mb-0">© 2025 LEBA EMPIRE. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-gray-400 hover:text-gold transition">Privacy Policy</Link>
                        <Link href="#" className="text-gray-400 hover:text-gold transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
