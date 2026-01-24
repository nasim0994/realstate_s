import { Play, Calendar, ExternalLink, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const tvNews = [
    {
        id: '1',
        headline: 'Corporate Excellence Award 2026: Highlights',
        channelName: 'Channel i',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop',
        date: '18 Jan, 2026',
        category: 'Awards'
    },
    {
        id: '2',
        headline: 'Innovative Sustainable Housing Project Interview',
        channelName: 'Somoy TV',
        youtubeId: 'ysz5S6PUM-U',
        thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
        date: '12 Jan, 2026',
        category: 'Interview'
    },
    {
        id: '3',
        headline: 'Future of Smart Cities: A Special Report',
        channelName: 'Independent TV',
        youtubeId: 'LXb3EKWsInQ',
        thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop',
        date: '05 Jan, 2026',
        category: 'News Report'
    }
];

export default function TvNews() {
    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-slate-200 pb-10">
                    <div>
                        <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest mb-3">
                            <Radio size={18} className="animate-pulse" /> Live Media Coverage
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">TV NEWS ARCHIVE</h1>
                    </div>
                    <p className="text-slate-500 max-w-sm text-sm font-medium">
                        Explore our presence across top national television channels and broadcast news reports.
                    </p>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tvNews.map((news) => (
                        <Link to={`/media/tv-news/${news.id}`} key={news.id} className="group">
                            <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">

                                {/* Video Thumbnail Area */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={news.thumbnail}
                                        alt={news.headline}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                                            <Play fill="currentColor" size={24} className="ml-1" />
                                        </div>
                                    </div>
                                    {/* Channel Badge */}
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-lg">
                                        <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter">
                                            {news.channelName}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Info */}
                                <div className="p-8">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                                        <Calendar size={12} /> {news.date} • {news.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                                        {news.headline}
                                    </h3>
                                    <div className="mt-6 flex items-center gap-2 text-slate-400 text-xs font-bold group-hover:text-red-600 transition-all">
                                        WATCH REPORT <ExternalLink size={14} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}