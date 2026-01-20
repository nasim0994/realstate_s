import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const allProjects = [
    { id: 1, title: "The Sky Garden", category: "Residential", status: "ongoing", location: "Gulshan 2", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800", slug: "sky-garden" },
    { id: 2, title: "Corporate Hub", category: "Commercial", status: "completed", location: "Banani", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", slug: "corporate-hub" },
    { id: 3, title: "Grand Residency", category: "Residential", status: "upcoming", location: "Dhanmondi", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", slug: "grand-residency" },
    { id: 4, title: "Elite Business Center", category: "Commercial", status: "ongoing", location: "Uttara", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", slug: "elite-business" },
];

export default function Projects() {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => { window.scrollTo(0, 0); }, [])

    // URL থেকে মান পড়া (না থাকলে "All")
    const typeFromUrl = searchParams.get("type") || "All";
    const statusFromUrl = searchParams.get("status") || "All";

    // State initialization (URL এর মান অনুযায়ী)
    const [activeType, setActiveType] = useState(typeFromUrl);
    const [activeStatus, setActiveStatus] = useState(statusFromUrl);

    // ১. URL change হলে state আপডেট করার জন্য useEffect
    useEffect(() => {
        const t = searchParams.get("type") || "All";
        const s = searchParams.get("status") || "All";

        // Capitalize first letter to match our array values (e.g. upcoming -> Upcoming)
        const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveType(t === "All" ? "All" : capitalize(t));
        setActiveStatus(s === "All" ? "All" : capitalize(s));
    }, [searchParams, setActiveType, setActiveStatus]);


    const handleFilterChange = (key: "type" | "status", value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (value === "All") {
            newParams.delete(key);
        } else {
            newParams.set(key, value.toLowerCase());
        }

        setSearchParams(newParams);
    };

    // Filtering Logic
    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            const matchType = activeType === "All" || project.category === activeType;
            const matchStatus = activeStatus === "All" || project.status === activeStatus;
            return matchType && matchStatus;
        });
    }, [activeType, activeStatus]);

    const resetFilters = () => {
        setSearchParams({});
    };

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="container">
                {/* Header Section */}
                <div className="max-w-4xl mb-6">
                    <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Portfolio</motion.h4>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-10">
                        Our <span className="text-outline">Projects</span>
                    </motion.h1>
                </div>

                {/* --- Multi-Filter UI --- */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between py-6 border-y border-gray-100 mb-12">
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">

                        {/* Dropdown: Project Type */}
                        <div className="relative">
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Select Type</p>
                            <div className="relative">
                                <select
                                    value={activeType}
                                    onChange={(e) => handleFilterChange("type", e.target.value)}
                                    className="appearance-none bg-[#f9f9f9] border border-gray-200 text-neutral text-xs font-bold uppercase tracking-widest py-3 pl-6 pr-12 cursor-pointer focus:outline-none hover:bg-white min-w-45"
                                >
                                    {["All", "Residential", "Commercial"].map((type) => (
                                        <option key={type} value={type}>{type} Projects</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                            </div>
                        </div>

                        {/* Dropdown: Project Status */}
                        <div className="relative">
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Project Status</p>
                            <div className="relative">
                                <select
                                    value={activeStatus}
                                    onChange={(e) => handleFilterChange("status", e.target.value)}
                                    className="appearance-none bg-[#f9f9f9] border border-gray-200 text-neutral text-xs font-bold uppercase tracking-widest py-3 pl-6 pr-12 cursor-pointer focus:outline-none hover:bg-white min-w-45"
                                >
                                    {["All", "Ongoing", "Completed", "Upcoming"].map((status) => (
                                        <option key={status} value={status}>{status} Status</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Reset Button */}
                    {(activeType !== "All" || activeStatus !== "All") && (
                        <button
                            onClick={resetFilters}
                            className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-primary transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary transition-all">
                                <X size={12} />
                            </div>
                            Reset
                        </button>
                    )}
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