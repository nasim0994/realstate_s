
import { ChevronLeft, Share2, Youtube, Tv, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TvNewsDetails() {
    const news = {
        headline: "Corporate Excellence Award 2026: Highlights",
        channelName: "Channel i",
        youtubeId: "dQw4w9WgXcQ",
        date: "January 18, 2026",
        description: "In this special broadcast, Channel i covers the Corporate Excellence Award 2026 ceremony where our organization was recognized for its contribution to sustainable urban development. The report features interviews with our CEO and a walkthrough of our award-winning projects.",
        category: "Awards Ceremony"
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Back Link */}
                <Link to="/media/tv-news" className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 mb-8 font-bold transition-colors">
                    <ChevronLeft size={20} /> Back to News Archive
                </Link>

                {/* Main Video Player */}
                <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-3xl border-8 border-slate-50 relative aspect-video">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${news.youtubeId}?autoplay=0&rel=0`}
                        title={news.headline}
                        allowFullScreen
                    ></iframe>
                </div>

                {/* News Details */}
                <div className="mt-12 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-100">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-red-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase">
                                    {news.channelName}
                                </span>
                                <span className="text-slate-300">|</span>
                                <span className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                                    <Calendar size={14} /> {news.date}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                {news.headline}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-all border border-slate-100">
                                <Share2 size={20} />
                            </button>
                            <a
                                href={`https://youtube.com/watch?v=${news.youtubeId}`}
                                target="_blank"
                                className="flex items-center gap-2 bg-[#FF0000] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-red-200 hover:scale-105 transition-all"
                            >
                                <Youtube size={20} /> Watch on YouTube
                            </a>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
                        <div className="lg:col-span-2">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Info size={20} className="text-red-600" /> Report Summary
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {news.description}
                            </p>
                        </div>

                        <div className="lg:col-span-1 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Channel Info</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-600 shadow-sm">
                                        <Tv size={20} />
                                    </div>
                                    <span className="font-bold text-slate-700">{news.channelName}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    Broadcasted as part of the daily evening news segment and special media coverage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}