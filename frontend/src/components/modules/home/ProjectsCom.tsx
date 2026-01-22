import { useState, useCallback, useMemo } from "react";
import { motion, useSpring } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AnimationButton from "../../shared/AnimationButton";
import { Link } from "react-router-dom";
import { useGetAllProjectQuery } from "@/redux/features/project/projectApi";
import type { IProject } from "@/interface/projectInterface";
import { CONFIG } from "@/config";

export default function ProjectCom() {
    const [cursorVisible, setCursorVisible] = useState(false);

    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        cursorX.set(e.clientX - 24);
        cursorY.set(e.clientY - 24);
    }, [cursorX, cursorY]);

    const { data, isLoading } = useGetAllProjectQuery({
        isActive: true,
        fields: "title,location,thumbnail,slug,status"
    });

    const projects = useMemo(() => data?.data || [], [data]);

    if (isLoading) return null;

    return (
        <section className="pb-12 md:pb-24 relative overflow-hidden">
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
                    grabCursor={true}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="overflow-visible!"
                >
                    {projects.map((project: IProject, index: number) => (
                        <SwiperSlide key={project?._id}>
                            <Link to={`/project/${project?.slug}`}>
                                <motion.div
                                    className="group cursor-none relative"
                                    onMouseEnter={() => setCursorVisible(true)}
                                    onMouseLeave={() => setCursorVisible(false)}
                                    onMouseMove={handleMouseMove}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-4/5 overflow-hidden bg-gray-100 rounded-sm">
                                        <img
                                            src={`${CONFIG.BASE_URL}${project?.thumbnail}`}
                                            alt={project?.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/90 backdrop-blur-sm text-neutral text-[10px] font-bold uppercase tracking-widest px-4 py-2 shadow-sm">
                                                {project?.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="mt-6 space-y-2 px-1">
                                        <div className="flex items-center text-gray-500 gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{project?.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">
                                            {project?.title}
                                        </h3>
                                        <div className="w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 mt-4" />
                                    </div>
                                </motion.div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Optimized Custom Cursor */}
            {cursorVisible && (
                <motion.div
                    className="fixed pointer-events-none z-50 w-14 h-14 rounded-full border border-primary bg-primary/5 backdrop-blur-[2px] flex items-center justify-center shadow-lg"
                    style={{
                        left: cursorX,
                        top: cursorY,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                >
                    <ArrowRight className="w-5 h-5 text-primary" />
                </motion.div>
            )}
        </section>
    );
}