// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// start
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
const App: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeTab, setActiveTab] = useState < 'blog' | 'fact' > ('blog');

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [email, setEmail] = useState('');
    const [showSubscribeSuccess, setShowSubscribeSuccess] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedFactId, setSelectedFactId] = useState < number | null > (null);
    const handleLike = (factId: number) => {
        const updatedFacts = randomFacts.map(fact =>
            fact.id === factId ? { ...fact, isLiked: !fact.isLiked, likes: (fact.likes || 0) + (fact.isLiked ? -1 : 1) } : fact
        );
        // In real application, you would update this through an API
        console.log('Liked fact:', factId);
    };
    const handleShare = (factId: number) => {
        setSelectedFactId(factId);
        setShowShareModal(true);
    };
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSubscribeSuccess(true);
        setEmail('');
        setTimeout(() => setShowSubscribeSuccess(false), 3000);
    };
    const trendingSlides = [
        {
            id: 1,
            title: 'The Hidden Life of Deep Sea Creatures',
            description: 'Discover the fascinating world of bioluminescent organisms living in the darkest depths of our oceans.',
            image: 'https://public.readdy.ai/ai/img_res/f6f78c0d2555cd3bc739c8b9f9159a31.jpg'
        },
        {
            id: 2,
            title: 'Ancient Civilizations: New Discoveries',
            description: 'Recent archaeological findings reveal surprising connections between ancient Mediterranean cultures.',
            image: 'https://public.readdy.ai/ai/img_res/cfa6591af41a38309eedd905796cda09.jpg'
        },
        {
            id: 3,
            title: 'The Future of Sustainable Energy',
            description: 'Innovative technologies reshaping how we harness and utilize renewable energy sources.',
            image: 'https://public.readdy.ai/ai/img_res/5a678f5145a9b4a93711acbaf2166ab1.jpg'
        }
    ];
    const randomFacts = [
        {
            id: 1,
            title: 'Honey Never Spoils',
            description: 'Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.',
            image: 'https://public.readdy.ai/ai/img_res/263845a51316e3d8506f80dee1115f97.jpg'
        },
        {
            id: 2,
            title: 'Octopus Intelligence',
            description: 'Octopuses have been observed using tools, solving puzzles, and even escaping from their tanks in aquariums.',
            image: 'https://public.readdy.ai/ai/img_res/3f62c86fa087542a93502d7a54d9e233.jpg'
        },
        {
            id: 3,
            title: 'Space Smell',
            description: 'Astronauts describe the smell of space as similar to seared steak, hot metal, and welding fumes.',
            image: 'https://public.readdy.ai/ai/img_res/ca782716d527393fa8762e1c7d609ddd.jpg'
        }
    ];
    const featuredBlogs = [
        {
            id: 1,
            title: 'The Psychology of Time Perception',
            author: 'Dr. Elizabeth Mitchell',
            date: 'February 12, 2025',
            preview: 'Why does time seem to speed up as we age? A deep dive into the fascinating world of temporal psychology.',
            image: 'https://public.readdy.ai/ai/img_res/4841c40ab17e2634026bfc626f4923dc.jpg'
        },
        {
            id: 2,
            title: 'Quantum Computing Breakthrough',
            author: 'Prof. James Richardson',
            date: 'February 14, 2025',
            preview: 'Scientists achieve quantum supremacy in a groundbreaking experiment that could revolutionize computing.',
            image: 'https://public.readdy.ai/ai/img_res/f3836c937ad42c571ec3d084c164bfd2.jpg'
        }
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
                backgroundColor: window.scrollY > 0 ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                boxShadow: window.scrollY > 0 ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold" style={{ color: window.scrollY > 0 ? '#1a1a1a' : '#ffffff' }}>FactHub</span>
                            <div className="ml-10 flex space-x-8">
                                <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: window.scrollY > 0 ? '#1a1a1a' : '#ffffff' }}>Home</a>
                                <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: window.scrollY > 0 ? '#1a1a1a' : '#ffffff' }}>Blog</a>
                                <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: window.scrollY > 0 ? '#1a1a1a' : '#ffffff' }}>Contribute</a>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="!rounded-button px-4 py-2 font-medium transition-colors whitespace-nowrap" style={{
                                backgroundColor: scrollY > 0 ? '#4F46E5' : '#ffffff',
                                color: scrollY > 0 ? '#ffffff' : '#4F46E5'
                            }}>Sign In</button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Hero Slider */}
            <div className="relative">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    className="h-[600px] relative group"
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75 transition-all duration-200 group-hover:opacity-100 opacity-0 swiper-button-prev">
                        <i className="fas fa-chevron-left text-gray-800"></i>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75 transition-all duration-200 group-hover:opacity-100 opacity-0 swiper-button-next">
                        <i className="fas fa-chevron-right text-gray-800"></i>
                    </div>
                    {trendingSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full">
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                                        <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                        <p className="text-xl mb-8">{slide.description}</p>
                                        <button className="!rounded-button bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">Read More</button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="!rounded-button bg-indigo-600 text-white px-6 py-3 font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                        >
                            {showAllCategories ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${showAllCategories ? '' : 'max-h-[600px] overflow-hidden'}`}>
                        {[
                            { title: 'Science & Technology', icon: 'fas fa-microscope', count: '1,234 facts', image: 'https://public.readdy.ai/ai/img_res/03a6374241c0487adce8bfff1b735cbe.jpg' },
                            { title: 'History & Culture', icon: 'fas fa-landmark', count: '987 facts', image: 'https://public.readdy.ai/ai/img_res/86386068b223544d1456eff6a8db4669.jpg' },
                            { title: 'Nature & Wildlife', icon: 'fas fa-leaf', count: '856 facts', image: 'https://public.readdy.ai/ai/img_res/7f7dc20c8adf2086415fcb1d0b237a93.jpg' },
                            { title: 'Space & Universe', icon: 'fas fa-galaxy', count: '645 facts', image: 'https://public.readdy.ai/ai/img_res/899f0e0b743a2247532140848bf83012.jpg' },
                            { title: 'Psychology', icon: 'fas fa-brain', count: '734 facts', image: 'https://public.readdy.ai/ai/img_res/4bbbe8d736ec51213eb616eec83142b9.jpg' },
                            { title: 'Art & Design', icon: 'fas fa-palette', count: '567 facts', image: 'https://public.readdy.ai/ai/img_res/4ebba7dafd0d374c27e087fa05a0d8b6.jpg' },
                            { title: 'Food & Cuisine', icon: 'fas fa-utensils', count: '890 facts', image: 'https://public.readdy.ai/ai/img_res/afcbb691db3afb5114a903ce5a831ac6.jpg' },
                            { title: 'Music & Sound', icon: 'fas fa-music', count: '456 facts', image: 'https://public.readdy.ai/ai/img_res/fc35f25c3e9579733755fb5f006bb70b.jpg' }
                        ].map((category, index) => (
                            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
                                <img src={category.image} alt={category.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                                    <p className="text-gray-200 text-sm">{category.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Random Facts Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Random Facts</h2>
                        <button className="!rounded-button bg-indigo-600 text-white px-6 py-3 font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">See All Facts</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {randomFacts.map((fact) => (
                            <div key={fact.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={fact.image} alt={fact.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{fact.title}</h3>
                                    <p className="text-gray-600 mb-4">{fact.description}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleLike(fact.id)}
                                                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                                            >
                                                <i className={`${fact.isLiked ? 'fas' : 'far'} fa-heart`}></i>
                                                <span>{fact.likes || 0}</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare(fact.id)}
                                                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Featured Blogs Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Blogs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredBlogs.map((blog) => (
                            <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <span>{blog.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{blog.date}</span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{blog.preview}</p>
                                    <button className="!rounded-button text-indigo-600 font-medium hover:text-indigo-700 transition-colors whitespace-nowrap">Read More →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Newsletter Section */}
            <section className="py-16 bg-indigo-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                <button type="submit" className="!rounded-button bg-white text-indigo-600 px-6 py-3 font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        {showSubscribeSuccess && (
                            <div className="mt-4 text-white">Thank you for subscribing!</div>
                        )}
                    </div>
                </div>
            </section>
            {/* Footer */}
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
            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Share this fact</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="flex justify-center space-x-6">
                            <button className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button className="p-3 rounded-full bg-blue-400 text-white hover:bg-blue-500">
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600">
                                <i className="fab fa-whatsapp"></i>
                            </button>
                            <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                                <i className="fab fa-linkedin-in"></i>
                            </button>
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                value={window.location.href}
                                className="w-full p-2 border rounded-lg text-sm text-gray-600"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default App;
// end



// time ago 
// function timeAgo(date: string): string {
//     const currentTime = new Date();
//     const givenTime = new Date(date);
    
//     const timeDiff = currentTime.getTime() - givenTime.getTime();  // Time difference in milliseconds
    
//     const seconds = Math.floor(timeDiff / 1000);  // Convert to seconds
//     const minutes = Math.floor(seconds / 60);  // Convert to minutes
//     const hours = Math.floor(minutes / 60);  // Convert to hours
//     const days = Math.floor(hours / 24);  // Convert to days
    
//     if (days > 0) {
//       return `${days} day${days > 1 ? 's' : ''} ago`;
//     }
//     if (hours > 0) {
//       return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     }
//     if (minutes > 0) {
//       return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     }
//     return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//   }