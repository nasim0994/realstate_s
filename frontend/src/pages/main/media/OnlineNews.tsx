
import { Globe, Facebook, Youtube, Calendar, ExternalLink, Share2 } from 'lucide-react';

const onlineNews = [
    {
        id: '1',
        title: 'Interview with our Lead Architect on Modern Urbanism',
        platform: 'Facebook',
        mediaName: 'Daily Star Live',
        link: 'https://facebook.com/watch/video-id',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        date: '20 Jan, 2026'
    },
    {
        id: '2',
        title: 'Project Reveal: The Green Skyline 2026',
        platform: 'Youtube',
        mediaName: 'Somoy TV',
        link: 'https://youtube.com/watch?v=video-id',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
        date: '15 Jan, 2026'
    },
    {
        id: '3',
        title: 'Top 10 Emerging Real Estate Companies in 2026',
        platform: 'Web',
        mediaName: 'Business Insider',
        link: 'https://businessinsider.com/article-url',
        thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop',
        date: '10 Jan, 2026'
    }
];

export default function OnlineNews() {

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'Facebook': return <Facebook size={16} className="text-[#1877F2]" />;
            case 'Youtube': return <Youtube size={16} className="text-[#FF0000]" />;
            default: return <Globe size={16} className="text-slate-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] py-26">
            <div className="container">
                <div className="mb-8 border-l-4 border-primary pl-6">
                    <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tight">
                        Online <span className='text-outline'>Coverage</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {onlineNews.map((item) => (
                        <div key={item.id} className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={item.thumbnail}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt=""
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                                    {getPlatformIcon(item.platform)}
                                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{item.mediaName}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-3">
                                    <Calendar size={12} /> {item.date}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>

                                <div className="mt-6 flex items-center justify-between">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary transition-all shadow-lg shadow-slate-200"
                                    >
                                        Visit Source <ExternalLink size={14} />
                                    </a>
                                    <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}