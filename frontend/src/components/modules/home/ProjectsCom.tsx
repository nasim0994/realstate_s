import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimationButton from "../../shared/AnimationButton";
import { Link } from "react-router-dom";

const projects = [
    {
        id: 1,
        title: "Skyline Residency",
        location: "Gulshan, Dhaka",
        category: "Luxury Apartment",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "The Heritage Park",
        location: "Banani, Dhaka",
        category: "Commercial Plaza",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Ocean Whisper",
        location: "Cox's Bazar",
        category: "Resort & Spa",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Skyline Residency",
        location: "Gulshan, Dhaka",
        category: "Luxury Apartment",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "The Heritage Park",
        location: "Banani, Dhaka",
        category: "Commercial Plaza",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Ocean Whisper",
        location: "Cox's Bazar",
        category: "Resort & Spa",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    },
];

export default function ProjectCom() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const [cursorDirection, setCursorDirection] = useState<"left" | "right">("right");

    const handleMouseMove = (e: React.MouseEvent, direction: "left" | "right") => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        setCursorDirection(direction);
    };

    return (
        <section className="py-12 md:py-24 relative">
            <div className="container">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4"
                        >
                            Our Projects
                        </motion.h4>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-neutral tracking-tight"
                        >
                            Explore Our Architectural <br /> Masterpieces
                        </motion.h2>
                    </div>

                    <AnimationButton text="View all Projects" link="/projects" />
                </div>

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={project.id}>
                            <Link to={`/project/${project.id}`}>
                                <motion.div
                                    className="group cursor-pointer relative"
                                    onMouseEnter={() => setCursorVisible(true)}
                                    onMouseLeave={() => setCursorVisible(false)}
                                    onMouseMove={(e) => handleMouseMove(e, "right")}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-4/5 overflow-hidden bg-gray-200">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Red Overlay on Hover */}
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Category Badge */}
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white text-neutral text-[10px] font-bold uppercase tracking-widest px-4 py-2">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="mt-6 space-y-2 px-2">
                                        <div className="flex items-center text-gray-500 gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            <span className="text-xs font-medium uppercase tracking-wider">{project.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>

                                        <div className="w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 mt-4" />
                                    </div>
                                </motion.div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Cursor */}
            {cursorVisible && (
                <div
                    className="fixed pointer-events-none z-50 w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center"
                    style={{
                        left: cursorPos.x - 24,
                        top: cursorPos.y - 24,
                    }}
                >
                    {cursorDirection === "left" ? <ArrowLeft className="w-5 h-5 text-primary" /> : <ArrowRight className="w-5 h-5 text-primary" />}
                </div>
            )}
        </section>
    );
}
