import { ChevronLeft, Share2, Download, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function PressReleaseDetails() {
    const news = {
        headline: "Innovative Sustainable Housing Project Featured in Daily Star",
        mediaName: "The Daily Star",
        date: "12 March 2025",
        fullImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
        description: "This comprehensive feature explores our commitment to sustainable architecture and how our recent project is setting new benchmarks in the industry. The Daily Star highlights the energy-efficient materials and community-centric design that define our approach.",
        category: "Corporate News"
    };

    return (
        <div className="min-h-screen bg-white py-26">
            <div className="container">

                {/* Breadcrumb / Back */}
                <Link to="/media/press-release" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-semibold transition-colors">
                    <ChevronLeft size={20} /> All Press Releases
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Image Viewer (7 columns) */}
                    <div className="lg:col-span-7">
                        <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
                            <img
                                src={news.fullImage}
                                alt="Clipping"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="mt-4 flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm">
                                <Download size={18} /> Download Clipping
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">
                                <Share2 size={18} /> Share News
                            </button>
                        </div>
                    </div>

                    {/* Content Section (5 columns) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md mb-4 inline-block">
                                {news.mediaName}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                                {news.headline}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-slate-400 text-sm border-y border-slate-100 py-4">
                                <span className="flex items-center gap-2"><Calendar size={16} /> {news.date}</span>
                                <span className="flex items-center gap-2"><Tag size={16} /> {news.category}</span>
                            </div>
                        </div>

                        <div className="prose prose-slate">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Summary</h3>
                            <p className="text-slate-600 leading-relaxed text-lg italic">
                                "{news.description}"
                            </p>
                        </div>

                        {/* Professional Disclaimer */}
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                Note: This image is a property of {news.mediaName}. Any redistribution or reproduction without prior permission is prohibited.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}