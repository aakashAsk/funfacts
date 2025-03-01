'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
export default function Slider() {
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
    return (
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
                {/* <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75 transition-all duration-200 group-hover:opacity-100 opacity-0 swiper-button-prev">
                    <i className="fas fa-chevron-left text-gray-800"></i>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-75 transition-all duration-200 group-hover:opacity-100 opacity-0 swiper-button-next">
                    <i className="fas fa-chevron-right text-gray-800"></i>
                </div> */}
                {trendingSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                    <p className="text-xl mb-8">{slide.description}</p>
                                    <button className="rounded bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">Read More</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}