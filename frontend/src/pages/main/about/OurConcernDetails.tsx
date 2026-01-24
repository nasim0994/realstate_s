import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, ArrowUpRight, CheckCircle2 } from 'lucide-react';
export default function ConcernsDetails() {
    // const { slug } = useParams<{ slug: string }>();

    const concern = {
        name: "Swan Industries Ltd.",
        logo: "/logos/industries.png",
        content: "Swan Industries Ltd. stands as a cornerstone of our group, driving manufacturing excellence with a commitment to quality and innovation. We specialize in producing high-grade industrial components that meet global standards.",
        highlights: ["Global Standards", "Eco-friendly Production", "Advanced R&D", "24/7 Logistics Support"]
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation */}
            <nav className="py-6 px-6 md:px-12 flex justify-between items-center border-b border-slate-50">
                <Link
                    to="/concerns"
                    className="group flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors font-bold text-xs uppercase tracking-widest"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Concerns
                </Link>
                <div className="hidden md:block text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
                    Ecosystem / {concern.name}
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Side: Logo & Quick Info (4 Columns) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-50 rounded-[2.5rem] p-8 flex items-center justify-center border border-slate-100 shadow-xl shadow-red-900/5">
                            <img
                                src={concern.logo}
                                alt={concern.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                                {concern.name}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase">Established 2015</span>
                                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full uppercase">ISO Certified</span>
                            </div>
                        </div>

                        <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                            Visit Website <ArrowUpRight size={18} />
                        </button>
                    </motion.div>

                    {/* Right Side: Detailed Content (8 Columns) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 space-y-12"
                    >
                        {/* Main Content */}
                        <section className="prose prose-slate max-w-none">
                            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <Globe size={16} /> Company Overview
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                                {concern.content}
                            </p>
                        </section>

                        {/* Key Highlights Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                            {[
                                "Sustainable Development Goals",
                                "Advanced Engineering Tech",
                                "Global Quality Standards",
                                "Client-Centric Approach"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                                    <CheckCircle2 className="text-red-600" size={20} />
                                    <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">{feature}</span>
                                </div>
                            ))}
                        </section>

                        {/* Footer Quote or Vision */}
                        <div className="p-8 bg-red-600 rounded-4xl text-white relative overflow-hidden">
                            <p className="text-lg font-bold italic relative z-10">
                                "Excellence is not an act, but a habit. At {concern.name.split(' ')[0]}, we live by this every day."
                            </p>
                            <div className="absolute -bottom-10 -right-10 text-white/10">
                                <Globe size={200} />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
};
