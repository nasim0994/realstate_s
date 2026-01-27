import { motion } from 'framer-motion';
import { Globe, ArrowUpRight, Package } from 'lucide-react';
import parser from "html-react-parser";

export default function ConcernsDetails() {
    const concern = {
        name: "Swan Industries Ltd.",
        logo: "https://placehold.co/400x400/png?text=Swan+Industries",
        url: "https://swan-industries.com",
        description: `
            <p>Swan Industries Ltd. stands as a cornerstone of our group, driving manufacturing excellence with a commitment to quality and innovation. We specialize in producing high-grade industrial components that meet global standards.</p>
            <br/>
            <p>Our state-of-the-art facilities ensure that every product leaving our factory is a testament to durability and comfort.</p>
        `,
        products: [
            {
                _id: "1",
                title: "Premium Mattress",
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop",
                description: "Experience unparalleled comfort with our orthopedic memory foam mattresses designed for deep sleep."
            },
            {
                _id: "2",
                title: "High-Density Foam",
                image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=600&auto=format&fit=crop",
                description: "Durable and resilient foam solutions for furniture, bedding, and industrial applications."
            },
            {
                _id: "3",
                title: "Luxury Divan",
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop",
                description: "Elegant and sturdy divan bases that add a touch of sophistication to your bedroom decor."
            },
            {
                _id: "4",
                title: "Luxury Divan",
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop",
                description: "Elegant and sturdy divan bases that add a touch of sophistication to your bedroom decor."
            },
            {
                _id: "5",
                title: "Luxury Divan",
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop",
                description: "Elegant and sturdy divan bases that add a touch of sophistication to your bedroom decor."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white py-26">
            <main className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Branding */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-[2.5rem] p-8 flex items-center justify-center border border-slate-100 shadow-xl shadow-red-900/5">
                            <img src={concern.logo} alt={concern.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-black text-neutral leading-tight uppercase tracking-tighter">{concern.name}</h1>
                        </div>
                        <a href={concern.url} target="_blank" className="w-max md:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-red-600/20">
                            Visit Website <ArrowUpRight size={18} />
                        </a>
                    </motion.div>

                    {/* Right: Info & Products */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 space-y-20">
                        {/* Overview */}
                        <section className="prose prose-slate max-w-none">
                            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <Globe size={16} /> Company Overview
                            </h2>
                            <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                {parser(concern.description)}
                            </div>
                        </section>

                        {/* Products Grid */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Package size={16} /> Our Products
                                </h2>
                                <div className="h-px flex-1 bg-slate-100"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {concern.products.map((product) => (
                                    <motion.div key={product._id} whileHover={{ y: -10 }} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-red-200 transition-all">
                                        <div className="aspect-4/3 overflow-hidden bg-white">
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-2">{product.title}</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">{product.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}