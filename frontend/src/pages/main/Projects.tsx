import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";

const allProjects = [
    { id: 1, title: "The Sky Garden", category: "Residential", status: "Ongoing", location: "Gulshan 2", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800", slug: "sky-garden" },
    { id: 2, title: "Corporate Hub", category: "Commercial", status: "Ready", location: "Banani", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", slug: "corporate-hub" },
    { id: 3, title: "Grand Residency", category: "Residential", status: "Upcoming", location: "Dhanmondi", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", slug: "grand-residency" },
    { id: 4, title: "Elite Business Center", category: "Commercial", status: "Ongoing", location: "Uttara", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", slug: "elite-business" },
];

export default function Projects() {
    window.scrollTo(0, 0);
    const [activeType, setActiveType] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");

    // Filtering Logic
    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            const matchType = activeType === "All" || project.category === activeType;
            const matchStatus = activeStatus === "All" || project.status === activeStatus;
            return matchType && matchStatus;
        });
    }, [activeType, activeStatus]);

    const resetFilters = () => {
        setActiveType("All");
        setActiveStatus("All");
    };

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="container">
                {/* Header Section */}
                <div className="max-w-4xl mb-6">
                    <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Portfolio</motion.h4>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-10">
                        Our <span className="text-outline">Landmarks</span>
                    </motion.h1>
                </div>

                {/* --- Multi-Filter UI --- */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between py-6 border-y border-gray-100">
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">

                        {/* Dropdown: Project Type */}
                        <div className="relative group">
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Select Type</p>
                            <div className="relative">
                                <select
                                    value={activeType}
                                    onChange={(e) => setActiveType(e.target.value)}
                                    className="appearance-none bg-[#f9f9f9] border border-gray-200 text-neutral text-xs font-bold uppercase tracking-widest py-3 pl-6 pr-12 cursor-pointer focus:outline-none transition-all hover:bg-white"
                                >
                                    {["All", "Residential", "Commercial"].map((type) => (
                                        <option key={type} value={type}>{type} Projects</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown size={14} className="text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Dropdown: Project Status */}
                        <div className="relative group">
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Project Status</p>
                            <div className="relative">
                                <select
                                    value={activeStatus}
                                    onChange={(e) => setActiveStatus(e.target.value)}
                                    className="appearance-none bg-[#f9f9f9] border border-gray-200 text-neutral text-xs font-bold uppercase tracking-widest py-3 pl-6 pr-12 cursor-pointer focus:outline-none transition-all hover:bg-white"
                                >
                                    {["All", "Ongoing", "Ready", "Upcoming"].map((status) => (
                                        <option key={status} value={status}>{status} Status</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown size={14} className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Found & Reset */}
                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                        {(activeType !== "All" || activeStatus !== "All") && (
                            <button
                                onClick={resetFilters}
                                className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-primary transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary">
                                    <X size={12} />
                                </div>
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* --- Project Grid --- */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <Link to={`/project/${project.id}`}>
                                <motion.div
                                    className="group cursor-pointer relative"
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
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="py-40 text-center border-2 border-dashed border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-300 uppercase tracking-[0.3em]">No projects found matching the criteria</h3>
                        <button onClick={resetFilters} className="mt-6 text-primary font-bold uppercase text-xs tracking-widest underline underline-offset-4">View All Projects</button>
                    </div>
                )}
            </div>
        </div>
    );
}