import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/lib/types';

async function getFeaturedProducts() {
    try {
        const res = await fetch(`http://localhost:3000/api/products?featured=true`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        return [];
    }
}

export default async function HomePage() {
    const featuredProducts = await getFeaturedProducts();

    return (
        <>
            <Hero />
            <About />

            {/* Featured Products Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-dark font-playfair">
                            Our <span className="text-gold">Collections</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover our premium range of handmade luxury footwear and accessories
                        </p>
                    </div>

                    {/* Featured Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                Check back soon for our latest featured items!
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/products"
                            className="bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            <Contact />
        </>
    );
}
