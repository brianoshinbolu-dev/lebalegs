import { ShoppingBag } from 'lucide-react';

export default function Hero() {
    const whatsappUrl = "https://wa.me/2347036900931?text=Hello%20LEBA%20Empire%2C%20I%20want%20to%20place%20an%20order.";

    return (
        <section id="home" className="hero-image h-screen flex items-center justify-center text-white">
            <div className="container mx-auto px-6 text-center" data-aos="fade-up">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">
                    Luxury Footwear & Accessories <br />
                    <span className="text-gold">For Every Occasion</span>
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Handcrafted premium leather goods designed for sophistication and comfort
                </p>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center gap-2"
                >
                    <ShoppingBag size={20} />
                    Order on WhatsApp
                </a>
            </div>
        </section>
    );
}
