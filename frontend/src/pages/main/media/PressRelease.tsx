import { Newspaper, Calendar, ExternalLink, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';


const pressReleases = [
    {
        id: '1',
        headline: 'Innovative Sustainable Housing Project Featured in Daily Star',
        mediaName: 'The Daily Star',
        publishDate: '12 March 2025',
        clippingImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop',
        category: 'National News'
    },
    {
        id: '2',
        headline: 'Architecture Today Magazine Covers Our Recent Urban Design',
        mediaName: 'Architecture Today',
        publishDate: '05 Feb 2025',
        clippingImage: 'https://images.unsplash.com/photo-1585829365234-781fcd04c83e?q=80&w=800&auto=format&fit=crop',
        category: 'Magazine'
    },
    {
        id: '3',
        headline: 'Leading the Green Revolution in Construction Sector',
        mediaName: 'Prothom Alo',
        publishDate: '20 Jan 2025',
        clippingImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop',
        category: 'Print Media'
    }
];

export default function PressRelease() {
    return (
        <div className="min-h-screen bg-slate-50 py-26">
            <div className="container">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
                            <Newspaper size={18} /> Media Coverage
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black">Press Releases</h1>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pressReleases.map((news) => (
                        <Link to={`/media/press-release/${news.id}`} key={news.id} className="group">
                            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                                {/* Newspaper Clipping Image */}
                                <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
                                    <img
                                        src={news.clippingImage}
                                        alt={news.headline}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                    {/* Overlay Content */}
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-3 inline-block">
                                            {news.mediaName}
                                        </span>
                                        <h3 className="text-xl font-bold leading-snug line-clamp-3">
                                            {news.headline}
                                        </h3>
                                    </div>

                                    {/* Action Icon */}
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                        <Maximize2 size={18} />
                                    </div>
                                </div>

                                {/* Bottom Info */}
                                <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                        <Calendar size={14} /> {news.publishDate}
                                    </div>
                                    <div className="text-primary text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read More <ExternalLink size={12} />
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