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

    if (isLoading) return <div className="h-screen w-screen bg-black animate-pulse" />;
    if (banners?.length === 0) return null;

    const currentBanner = banners[current];


    return (

        <div className="relative h-screen w-screen overflow-hidden bg-black">

            {/* Background Slider */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={CONFIG.BASE_URL + currentBanner?.image}
                        alt="Real Estate Hero"
                        className="w-full h-full object-cover opacity-80"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <div className="max-w-4xl space-y-6">
                    <motion.h6
                        key={`title-${current}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white leading-tight"
                    >
                        {currentBanner?.title}
                    </motion.h6>

                    <motion.p
                        key={`sub-${current}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-lg md:text-2xl text-gray-200 font-light"
                    >
                        {currentBanner?.description}
                    </motion.p>
                </div>
            </div>

            {/* Scroll Down Circular Animation */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-20">
                <div className="relative flex items-center justify-center w-30 h-30">

                    {/* Rotating Text Circle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                />
                            </defs>
                            <text fill="#e52329" fontSize="12" fontWeight="500" letterSpacing="0.2em" className="opacity-80 uppercase">
                                <textPath xlinkHref="#circlePath" className="tracking-widest">
                                    • Scroll Down • Scroll Down
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>

                    {/* Center Arrow (Static or Bouncing) */}
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="text-white"
                    >
                        <BsArrowDown className="text-lg" />
                    </motion.div>

                </div>
            </div>
        </div>
    );
};