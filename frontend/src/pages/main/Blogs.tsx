import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const blogs = [
    {
        id: 1,
        title: "The Future of Sustainable Architecture in Dhaka",
        excerpt: "Discover how green buildings are reshaping the urban landscape and promoting a healthier lifestyle for city dwellers.",
        date: "Oct 12, 2025",
        author: "Ar. Rahat Ahmed",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
        slug: "future-of-architecture"
    },
    {
        id: 2,
        title: "Top 5 Interior Trends for Modern Apartments",
        excerpt: "From minimalist furniture to smart lighting, explore the trends that define luxury in 2025.",
        date: "Sep 28, 2025",
        author: "Sara Karim",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
        slug: "interior-trends-2025"
    },
    {
        id: 3,
        title: "Why Investing in Commercial Property is Smarter Now",
        excerpt: "A deep dive into the current real estate market and why business hubs are the safest investment bet.",
        date: "Sep 15, 2025",
        author: "Zaman Khan",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
        slug: "commercial-investment-guide"
    },
    {
        id: 4,
        title: "Maximizing Small Spaces: A Practical Guide",
        excerpt: "Learn how to make your studio apartment feel like a mansion with these clever space-saving tips.",
        date: "Aug 30, 2025",
        author: "Nina Hossain",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
        slug: "maximizing-small-spaces"
    }
];

export default function Blogs() {
    useEffect(() => { window.scrollTo(0, 0); }, [])


    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="container">

                {/* Header Section */}
                <div className="max-w-4xl mb-20">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
                    >
                        Our Journal
                    </motion.h4>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter leading-none"
                    >
                        Insights & <br />
                        <span className="text-outline text-white">Perspectives.</span>
                    </motion.h1>
                </div>

                {/* Featured Post (The first one) */}
                <section className="mb-24">
                    <Link to={`/blog/${blogs[0].slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative overflow-hidden aspect-16/10 bg-gray-100">
                            <img
                                src={blogs[0].image}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                alt="Featured"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                <span className="flex items-center gap-2"><Calendar size={12} className="text-primary" /> {blogs[0].date}</span>
                                <span className="flex items-center gap-2"><User size={12} className="text-primary" /> {blogs[0].author}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-primary transition-colors">
                                {blogs[0].title}
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                {blogs[0].excerpt}
                            </p>
                            <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest pt-4">
                                Read Article <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </section>

                <hr className="border-gray-100 mb-24" />

                {/* Blog Grid (Remaining ones) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                    {blogs.slice(1).map((blog) => (
                        <motion.div
                            key={blog.id}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Link to={`/blog/${blog.slug}`}>
                                <div className="relative overflow-hidden aspect-4/3 bg-gray-100 mb-6">
                                    <img
                                        src={blog.image}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        alt={blog.title}
                                    />
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        {blog.date} — BY {blog.author}
                                    </p>
                                    <h3 className="text-2xl font-bold tracking-tighter leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="mt-32 text-center">
                    <button className="px-12 py-5 border border-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                        Load More Stories
                    </button>
                </div>
            </div>
        </div>
    );
}