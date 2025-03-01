'use client'
import { useState } from "react";
import "./style.css";

export default function Footer() {
    const [email, setEmail] = useState('');
    const [showSubscribeSuccess, setShowSubscribeSuccess] = useState(false);
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
    };
    
    return (
        <section className="pt-16 bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Latest Facts</h2>
                    <p className="text-indigo-100 mb-8">Subscribe to our newsletter and never miss an interesting fact!</p>
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                        <div className="flex gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg border-none text-gray-900"
                                required
                            />
                            <button type="submit" className="rounded bg-white text-indigo-600 px-6 py-3 font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </form>
                    {showSubscribeSuccess && (
                        <div className="mt-4 text-white">Thank you for subscribing!</div>
                    )}
                </div>
            </div>

            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">FactHub</h3>
                            <p className="text-gray-400">Discover fascinating facts and stories from around the world.</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contribute</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-twitter text-xl"></i></a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook text-xl"></i></a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram text-xl"></i></a>
                                <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Contact</h4>
                            <p className="text-gray-400">Email: info@facthub.com</p>
                            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p>© 2025 FactHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </section>
        
    )
}