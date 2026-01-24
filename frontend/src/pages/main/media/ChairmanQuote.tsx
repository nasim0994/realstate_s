import { Share2, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const feedContent = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
        caption: 'Honored to speak at the National Urban Development Summit. Innovation is the key to our sustainable future.',
        date: '22 Jan, 2026',
        likes: '1.2k'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop',
        caption: 'Meeting with our young engineers today. Their energy and ideas are truly inspiring.',
        date: '18 Jan, 2026',
        likes: '850'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
        caption: 'On-site visit to our latest eco-friendly housing project. Progressing faster than expected!',
        date: '12 Jan, 2026',
        likes: '2.1k'
    }
];

export default function ChairmanQuote() {
    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container">
                <div className="mb-12 border-b border-slate-200 pb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Chairman's Updates</h1>
                        <p className="text-slate-500 font-medium">Daily insights and activities from our visionary leader.</p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {feedContent.map((post) => (
                        <Link to={`/media/chairman-quote/${post.id}`} key={post.id} className="group">
                            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-2xl">
                                {/* Post Image */}
                                <div className="aspect-square overflow-hidden relative">
                                    <img
                                        src={post.image}
                                        alt="Feed"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                                        <Share2 size={16} />
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-3">
                                        <Calendar size={12} /> {post.date}
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed line-clamp-3 mb-6">
                                        {post.caption}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                        <div className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <ChevronRight size={16} />
                                        </div>
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