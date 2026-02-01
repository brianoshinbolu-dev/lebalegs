import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const whatsappUrl = `https://wa.me/2347036900931?text=${encodeURIComponent(product.whatsappMessage)}`;
    const priceFormatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(product.price);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden product-card group">
            <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-64 bg-gray-100">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>
            <div className="p-6">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold mb-2 text-dark hover:text-gold transition">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gold font-bold text-lg mb-4">{priceFormatted}</p>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold hover:bg-yellow-600 text-dark font-bold py-2 px-4 rounded-full transition duration-300 inline-flex items-center gap-2 text-sm"
                >
                    <ShoppingBag size={16} />
                    Order Now
                </a>
            </div>
        </div>
    );
}
