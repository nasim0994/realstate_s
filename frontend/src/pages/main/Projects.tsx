import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetAllProjectQuery } from "@/redux/features/project/projectApi";
import type { IProject } from "@/interface/projectInterface";
import { CONFIG } from "@/config";
import { useGetAllProjectTypeQuery } from "@/redux/features/projectType/projectTypeApi";
import type { IProjectType } from "@/interface/projectTypeInterface";

export default function Projects() {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeType = searchParams.get("type") || "All";
    const activeStatus = searchParams.get("status") || "All";
    const currentPage = Number(searchParams.get("page")) || 1;
    const limit = 9;

    // Project Types Data
    const { data: projectTypeData } = useGetAllProjectTypeQuery({});
    const types = useMemo(() => projectTypeData?.data || [], [projectTypeData]);

    // Projects Data with Pagination & Filters
    const { data, isLoading } = useGetAllProjectQuery({
        isActive: true,
        fields: "title,location,thumbnail,slug,status",
        type: activeType !== "All" ? activeType : undefined,
        status: activeStatus !== "All" ? activeStatus.toLowerCase() : undefined,
        page: currentPage,
        limit: limit
    });

    const projects = useMemo(() => data?.data || [], [data]);
    const meta = data?.meta;

    const handleFilterChange = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", "1");

        if (value === "All") {
            newParams.delete(key);
        } else {
            newParams.set(key, key === "status" ? value.charAt(0).toUpperCase() + value.slice(1) : value);
        }
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    };

    const resetFilters = () => {
        setSearchParams({});
    };

    return (
        <div className="bg-white min-h-screen py-26">
            <div className="container">
                {/* Header Section */}
                <div className="max-w-4xl mb-6">
                    <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Portfolio</motion.h4>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-10">
                        Our <span className="text-outline">Projects</span>
                    </motion.h1>
                </div>

                {/* --- Filter UI --- */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between py-6 border-y border-gray-100 mb-8">
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        {/* Dropdown: Project Type */}
                        <div className="relative">
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Select Type</p>
                            <select
                                value={activeType}
                                onChange={(e) => handleFilterChange("type", e.target.value)}
                                className="appearance-none bg-[#f9f9f9] border border-gray-200 text-neutral text-xs font-bold uppercase tracking-widest py-3 pl-6 pr-12 cursor-pointer focus:outline-none hover:bg-white min-w-45"
                            >
                                <option value="All">All Types</option>
                                {types?.map((type: IProjectType) => (
                                    <option key={type?._id} value={type?._id}>{type?.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Dropdown: Project Status */}
                        <div className="relative">
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 ml-1">Project Status</p>
                            <select
                                value={activeStatus}
                                onChange={(e) => handleFilterChange("status", e.target.value)}
                                className="appearance-none bg-[#f9f9f9] border border-gray-200 text-neutral text-xs font-bold uppercase tracking-widest py-3 pl-6 pr-12 cursor-pointer focus:outline-none hover:bg-white min-w-45"
                            >
                                {["All", "Ongoing", "Completed", "Upcoming"].map((status) => (
                                    <option key={status} value={status}>{status} Status</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Reset Button */}
                    {(activeType !== "All" || activeStatus !== "All") && (
                        <button onClick={resetFilters} className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-primary transition-colors">
                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary">
                                <X size={12} />
                            </div>
                            Reset Filters
                        </button>
                    )}
                </div>

                {/* --- Project Grid --- */}
                {isLoading ? (
                    <div className="h-64 flex items-center justify-center">Loading Projects...</div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                        <AnimatePresence mode="popLayout">
                            {projects?.length > 0 ? projects?.map((project: IProject, index: number) => (
                                <Link key={project._id} to={`/project/${project?.slug}`}>
                                    <motion.div
                                        className="group cursor-pointer relative"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                                            <img
                                                src={`${CONFIG.BASE_URL}${project?.thumbnail}`}
                                                alt={project?.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-white text-neutral text-[10px] font-bold uppercase tracking-widest px-4 py-2 shadow-sm">
                                                    {project?.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-2 px-2">
                                            <div className="flex items-center text-gray-500 gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                                <span className="text-xs font-medium uppercase tracking-wider">{project?.location}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-neutral group-hover:text-primary transition-colors duration-300">
                                                {project?.title}
                                            </h3>
                                            <div className="w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 mt-4" />
                                        </div>
                                    </motion.div>
                                </Link>
                            )) : <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50"
                            >
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <X className="w-10 h-10 text-gray-300" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral mb-2">No Projects Found</h3>
                                <p className="text-gray-500 max-w-sm mb-8 text-sm">
                                    We couldn't find any projects matching your current filters. Please try adjusting your selection or reset the filters.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="px-8 py-3 bg-neutral text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* --- Pagination --- */}
                {meta && meta.pages > 1 && (
                    <div className="mt-20 flex justify-center items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="p-3 border border-gray-200 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {[...Array(meta.pages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-12 h-12 rounded-full font-bold text-xs transition-all ${currentPage === i + 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-50 text-neutral hover:bg-gray-200"
                                    }`}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === meta.pages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="p-3 border border-gray-200 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}