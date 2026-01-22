import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { useGetAllBannerQuery } from "@/redux/features/banner/bannerApi";
import { CONFIG } from "@/config";

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const { data, isLoading } = useGetAllBannerQuery({});
    const banners = data?.data || [];

    useEffect(() => {
        if (banners?.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners?.length - 1 ? 0 : prev + 1));
        }, 10000);
        return () => clearInterval(timer);
    }, [banners?.length]);

    if (isLoading) return <div className="h-screen w-screen bg-white flex items-center justify-center">
        <div className="w-20 h-0.5 bg-[#e52329] animate-pulse shadow-[0_0_15px_#e52329]" />
    </div>;

    if (banners?.length === 0) return null;

    const currentBanner = banners[current];

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-black">
            {/* Background Slider with Red Tint Overlay */}
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={CONFIG.BASE_URL + currentBanner?.image}
                        alt="Hero Banner"
                        className="w-full h-full object-cover opacity-60 grayscale-20"
                    />

                    {/* Multi-layer Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/50 via-transparent to-[#e52329]/20" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50" />
                </motion.div>
            </AnimatePresence>

            {/* Red Ambient Glow (Decorative) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#e52329]/10 blur-[100px] z-5" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <div className="max-w-5xl space-y-8">
                    <motion.div
                        key={`content-${current}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
                            className="text-6xl md:text-8xl font-black leading-[0.9] uppercase tracking-tighter"
                        >
                            <span className="text-white">
                                {currentBanner?.title.split(' ').slice(0, -1).join(' ')}
                            </span>
                            <br />
                            <span className="text-[#e52329] drop-shadow-[0_0_30px_rgba(229,35,41,0.4)]">
                                {currentBanner?.title.split(' ').slice(-1)}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mt-8 text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto tracking-wide leading-relaxed"
                        >
                            {currentBanner?.description}
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Circular Animation - Styled with Brand Red */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20">
                <div className="relative flex items-center justify-center w-40 h-40">
                    {/* Rotating Text Circle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                />
                            </defs>
                            <text fill="#e52329" fontSize="8" fontWeight="900" letterSpacing="0.3em" className="uppercase">
                                <textPath xlinkHref="#circlePath">
                                    • SCROLL DOWN • SCROLL DOWN •
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>

                    {/* Center Arrow with Pulse Glow */}
                    <motion.div
                        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="bg-[#e52329] p-3 rounded-full shadow-[0_0_20px_rgba(229,35,41,0.6)]"
                    >
                        <BsArrowDown className="text-white text-lg" />
                    </motion.div>
                </div>
            </div>

            {/* Left Side Progress Indicator (Optional Red Accent) */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
                {banners?.map((_: any, i: number) => (
                    <div
                        key={i}
                        className={`w-1 transition-all duration-500 ${i === current ? 'h-8 bg-[#e52329] shadow-[0_0_10px_#e52329]' : 'h-4 bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
};