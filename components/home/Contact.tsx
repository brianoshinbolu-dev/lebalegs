import { Mail, MessageSquare, Instagram } from 'lucide-react';

export default function Contact() {
    const whatsappUrl = "https://wa.me/2347036900931?text=Hello%20LEBA%20Empire%2C%20I%20want%20to%20place%20an%20order.";

    return (
        <section id="contact" className="py-20 bg-dark text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 font-playfair">
                        Contact <span className="text-gold">LEBA EMPIRE</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Reach out to us for inquiries, custom orders, or collaborations
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="md:w-1/2">
                        <div className="bg-gray-800 p-8 rounded-lg space-y-6">
                            <div className="flex items-center gap-4">
                                <Mail className="text-gold" size={24} />
                                <div>
                                    <h3 className="font-bold">Email</h3>
                                    <p className="text-gray-300">oshstefan@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MessageSquare className="text-gold" size={24} />
                                <div>
                                    <h3 className="font-bold">WhatsApp</h3>
                                    <p className="text-gray-300">+234 703 690 0931</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Instagram className="text-gold" size={24} />
                                <div>
                                    <h3 className="font-bold">Instagram</h3>
                                    <p className="text-gray-300">@lebaempireofficial</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4 mb-8">
                            <a
                                href="https://instagram.com/lebaempireofficial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition"
                            >
                                <Instagram className="text-gold" size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition"
                            >
                                <MessageSquare className="text-gold" size={24} />
                            </a>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gold hover:bg-yellow-600 text-dark font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center gap-2"
                        >
                            <MessageSquare size={20} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
