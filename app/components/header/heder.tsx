'use client';
import { useEffect, useState } from 'react';
import './style.css';

interface HeaderProps {
    fixed: boolean;
}
const Header: React.FC<HeaderProps> = ({fixed = false}) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
            backgroundColor: !fixed ? (window.scrollY > 0 ? 'rgba(255, 255, 255, 0.95)' : 'transparent') : 'rgba(255, 255, 255, 0.95)',
                boxShadow: !fixed ? (window.scrollY > 0 ? '0 2px 4px rgba(0,0,0,0.1)' : 'none') : '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold" style={{ color: !fixed ? (window.scrollY > 0 ? '#1a1a1a' : '#ffffff') :  '#1a1a1a'}}>FactHub</span>
                        <div className="ml-10 flex space-x-8">
                            <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: !fixed ? (window.scrollY > 0 ? '#1a1a1a' : '#ffffff') :  '#1a1a1a' }}>Home</a>
                            <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: !fixed ? (window.scrollY > 0 ? '#1a1a1a' : '#ffffff') :  '#1a1a1a' }}>Facts</a>
                            <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: !fixed ? (window.scrollY > 0 ? '#1a1a1a' : '#ffffff') :  '#1a1a1a' }}>Blog</a>
                            <a href="#" className="px-3 py-2 font-medium transition-colors" style={{ color: !fixed ? (window.scrollY > 0 ? '#1a1a1a' : '#ffffff') :  '#1a1a1a' }}>Contribute</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="rounded px-4 py-2 font-medium transition-colors whitespace-nowrap" style={{
                            backgroundColor: scrollY > 0 ? '#4F46E5' : '#ffffff',
                            color: scrollY > 0 ? '#ffffff' : '#4F46E5'
                        }}>Sign In</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;