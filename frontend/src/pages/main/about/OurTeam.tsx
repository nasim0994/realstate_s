import { CONFIG } from '@/config';
import type { ITeam } from '@/interface/teamInterface';
import { useGetAllTeamQuery } from '@/redux/features/team/teamApi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OurTeam() {
    const { data: teamData, isLoading } = useGetAllTeamQuery({});
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const teamMembers = teamData?.data || [];

    // Category list
    const categories = ['All', 'Advisor Team', 'Engineer Team', 'Architect Team', 'Marketing Team'];

    // Filtering logic
    const filteredMembers = activeCategory === 'All'
        ? teamMembers
        : teamMembers.filter((member: ITeam) => member?.category?.name === activeCategory);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h4 className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-3">Professional Minds</h4>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-slate-900">
                        Our Expertise <span className="text-outline">Team</span>
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200'
                                : 'bg-white text-slate-400 border-slate-100 hover:border-red-200 hover:text-red-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Team Grid with Animation */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredMembers?.map((member: ITeam) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={member?._id}
                                className="group cursor-pointer"
                            >
                                {/* Image Box */}
                                <div className="relative overflow-hidden aspect-4/5 mb-6 bg-slate-100 rounded-2xl shadow-sm border border-slate-50">
                                    <img
                                        src={`${CONFIG.BASE_URL}${member?.image}`}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                        alt={member?.name}
                                        loading="lazy"
                                    />
                                    {/* Subtle Red Overlay on Hover */}
                                    <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>

                                {/* Content */}
                                <div className="space-y-1">
                                    <h4 className="font-black text-xl text-slate-900 uppercase tracking-tighter group-hover:text-red-600 transition-colors">
                                        {member?.name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-[1.5px] bg-red-600" />
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            {member?.designation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* No Members Found State */}
                {filteredMembers.length === 0 && !isLoading && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-medium italic">No members found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}