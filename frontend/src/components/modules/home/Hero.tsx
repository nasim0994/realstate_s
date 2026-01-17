import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        title: "Discover Your Dream Sanctuary",
        subtitle: "Exclusive properties in the most desirable locations.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        title: "Modern Living Redefined",
        subtitle: "Experience luxury and comfort like never before.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        title: "Architectural Masterpieces",
        subtitle: "Where design meets functionality in perfect harmony.",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 10000);
        return () => clearInterval(timer);
    }, []);

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
                        src={slides[current].image}
                        alt="Real Estate Hero"
                        className="w-full h-full object-cover opacity-80"
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
                        {slides[current].title}
                    </motion.h6>

                    <motion.p
                        key={`sub-${current}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-lg md:text-2xl text-gray-200 font-light"
                    >
                        {slides[current].subtitle}
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