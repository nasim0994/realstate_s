import { motion } from 'framer-motion';
import { CONFIG } from '@/config';
import { useGetAllAwardsQuery } from '@/redux/features/awards/awardsApi';
import { Award, Calendar, ExternalLink, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { IAwards } from '@/interface/awardsInterface';

export default function Awards() {
    const { data: awardsData, isLoading } = useGetAllAwardsQuery({});
    const awards = awardsData?.data || [];

    // Sorting by 'order' property
    const sortedAwards = [...awards].sort((a, b) => a.order - b.order);

    if (isLoading) {
        return <div className="min-h-100 flex items-center justify-center font-bold uppercase tracking-widest text-slate-400">Loading Excellence...</div>;
    }

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container">

                {/* Header Section */}
                <div className="max-w-4xl mb-10">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2"
                    >
                        <Trophy size={14} className="animate-pulse" /> Global Recognition
                    </motion.h4>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900"
                    >
                        Honors & <br />
                        <span className="text-outline text-white">Achievements.</span>
                    </motion.h1>
                </div>

                {/* Awards List - Horizontal Layout */}
                <div className="space-y-4">
                    {sortedAwards.map((award: IAwards, index: number) => (
                        <motion.div
                            key={award._id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/awards/${award.slug}`} className="group block">
                                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-5 md:p-8 bg-slate-50 rounded-[2.5rem] border border-transparent transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-red-600/5 hover:border-red-100">

                                    {/* Award Thumbnail */}
                                    <div className="w-full md:w-56 aspect-4/3 overflow-hidden rounded-3xl bg-white shadow-sm shrink-0">
                                        <img
                                            src={`${CONFIG.BASE_URL}${award.image}`}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                            alt={award.title}
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-red-600" /> {award.year}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Award size={14} className="text-red-600" /> {award.organization}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-black text-slate-800 group-hover:text-red-600 transition-colors tracking-tighter uppercase leading-none">
                                            {award.title}
                                        </h3>
                                    </div>

                                    {/* Hover Arrow Icon */}
                                    <div className="hidden lg:flex w-14 h-14 rounded-full border border-slate-200 items-center justify-center text-slate-300 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-45 shadow-sm">
                                        <ExternalLink size={20} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {!isLoading && sortedAwards.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Our achievements journey is being updated.</p>
                    </div>
                )}
            </div>
        </section>
    );
}