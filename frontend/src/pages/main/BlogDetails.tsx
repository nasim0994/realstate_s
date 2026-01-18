"use client";

import { motion } from "framer-motion";
import { Calendar, User, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const blogContent = {
    title: "The Future of Sustainable Architecture in Dhaka",
    date: "October 12, 2025",
    author: "Ar. Rahat Ahmed",
    role: "Chief Architect",
    image: "https://images.unsplash.com/photo-1449156059431-78995541dca5?q=80&w=1200",
    content: `
    <p>Sustainable architecture is no longer just a trend; it is a necessity for the rapidly growing urban landscape of Dhaka. As the city faces challenges like heat islands and air pollution, architects are turning to green building solutions to create a more livable environment.</p>
    
    <h3>1. Integration of Vertical Gardens</h3>
    <p>One of the most effective ways we are tackling the concrete jungle is through vertical greenery. By integrating plants directly into the building's facade, we can reduce indoor temperatures by up to 5 degrees Celsius naturally.</p>
    
    <blockquote>"The goal is not just to build structures, but to create ecosystems that breathe with the city."</blockquote>
    
    <h3>2. Natural Ventilation & Solar Power</h3>
    <p>Modern residential projects in Gulshan and Banani are now prioritizing cross-ventilation. This reduces the dependency on air conditioning, while solar panels on rooftops are becoming a standard for common area lighting.</p>
  `,
    authorBio: "Ar. Rahat Ahmed is a pioneer in sustainable design with over 15 years of experience in urban planning and eco-friendly construction."
};

export default function BlogDetails() {
    window.scrollTo(0, 0);

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="container">

                {/* Back Button */}
                <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
                </Link>

                {/* --- Header Section --- */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                            {blogContent.title}
                        </h1>

                        <div className="flex items-center justify-center gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 border-y border-gray-100 py-6">
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {blogContent.date}</span>
                            <span className="flex items-center gap-2"><User size={14} className="text-primary" /> BY {blogContent.author}</span>
                        </div>
                    </motion.div>
                </div>

                {/* --- Main Image --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full aspect-21/9 overflow-hidden bg-gray-100 mb-20"
                >
                    <img
                        src={blogContent.image}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        alt="Blog Cover"
                    />
                </motion.div>

                {/* --- Article Content --- */}
                <div className="max-w-3xl mx-auto relative">

                    {/* Share Sidebar (Desktop Only) */}
                    <div className="hidden lg:block absolute -left-24 top-0 space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 vertical-text rotate-180">Share Story</p>
                        <div className="flex flex-col gap-3">
                            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Facebook size={16} /></button>
                            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Twitter size={16} /></button>
                            <button className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={16} /></button>
                        </div>
                    </div>

                    {/* Body Text */}
                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:italic text-gray-600 leading-relaxed drop-cap">
                        <div dangerouslySetInnerHTML={{ __html: blogContent.content }} />
                    </div>

                    {/* --- Author Card --- */}
                    <div className="mt-20 p-10 bg-gray-50 flex flex-col md:flex-row gap-8 items-center border-l-4 border-primary">
                        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden shrink-0">
                            <img src="https://i.pravatar.cc/200?img=11" alt="Author" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">{blogContent.author}</h4>
                            <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-3">{blogContent.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{blogContent.authorBio}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}