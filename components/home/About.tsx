import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function About() {
    const whatsappUrl = "https://wa.me/2347036900931?text=Hello%20LEBA%20Empire%2C%20I%20want%20to%20place%20an%20order.";

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="relative w-full max-w-md mx-auto h-96">
                            <Image
                                src="/images/shoe1.jpg"
                                alt="LEBA EMPIRE Craftsmanship"
                                fill
                                className="rounded-lg shadow-xl object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-6 text-dark font-playfair">
                            About <span className="text-gold">LEBA EMPIRE</span>
                        </h2>
                        <p className="mb-4 text-gray-700">
                            Founded by Micheal Osh, LEBA EMPIRE represents the pinnacle of luxury craftsmanship in footwear and accessories.
                        </p>
                        <p className="mb-6 text-gray-700">
                            Each product is meticulously designed and handcrafted using premium materials, ensuring unparalleled quality and sophistication for our discerning clientele.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-dark hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center gap-2"
                        >
                            <MessageCircle size={20} />
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
