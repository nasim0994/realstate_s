import { BsArrowRight } from "react-icons/bs";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { IConcerns } from "@/interface/concernsInterface";


const concerns: IConcerns[] = [
    { _id: '1', name: 'Swan Industries Ltd.', logo: '/logos/industries.png', slug: 'swan-industries' },
    { _id: '2', name: 'Swan HomeTex', logo: '/logos/hometex.png', slug: 'swan-hometex' },
    { _id: '3', name: 'Swan Chemicals Ltd.', logo: '/logos/chemicals.png', slug: 'swan-chemicals' },
    { _id: '4', name: 'Swan Properties Ltd.', logo: '/logos/properties.png', slug: 'swan-properties' },
];

export default function OurConcerns() {
    return (
        <div className="min-h-screen bg-white py-20">
            <div className="container">

                {/* Header Section */}
                <div className="max-w-4xl mb-10">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
                    >
                        Our Concerns
                    </motion.h4>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-slate-900"
                    >
                        Diverse & <br />
                        <span className="text-outline text-white">Dynamic.</span>
                    </motion.h1>
                </div>

                {/* Horizontal Compact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {concerns.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link to={`/about/our-concerns/${item.slug}`} className="group block">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-transparent transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-red-600/5 group-hover:border-red-100">

                                    {/* Small Logo Container */}
                                    <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="w-8 h-8 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                        />
                                    </div>

                                    {/* Name Side by Side */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[11px] md:text-[12px] font-bold text-slate-500 group-hover:text-red-600 uppercase tracking-widest truncate transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                    </div>

                                    {/* Indicator Icon */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-transform -translate-x-2.5 group-hover:translate-x-0 duration-300">
                                        <BsArrowRight className="text-primary" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};