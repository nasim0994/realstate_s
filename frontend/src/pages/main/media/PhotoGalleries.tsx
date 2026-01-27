
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const archives = [
    {
        id: '1',
        title: 'Annual Conference 2025',
        thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
        count: 24
    },
    {
        id: '2',
        title: 'Summer Workshop',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
        count: 12
    },
    {
        id: '3',
        title: 'Product Launch Event',
        thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
        count: 45
    },
];

export default function PhotoGalleries() {
    return (
        <div className="min-h-screen bg-slate-50 py-26">
            <div className="container">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h1 className="text-5xl sm:text-6xl font-bold uppercase">
                            Photo <span className='text-outline'>Galleries</span>
                        </h1>
                    </div>
                    <div className="hidden md:block text-sm font-medium text-slate-400">
                        Total {archives.length} Galleries
                    </div>
                </div>

                {/* Archive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {archives.map((item) => (
                        <Link to={`/media/photo-gallery/${item.id}`} key={item.id} className="group">
                            <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                                {/* Thumbnail */}
                                <div className="aspect-4/3 overflow-hidden">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                            <ImageIcon size={12} /> {item.count} Photos
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        <ArrowRight size={18} />
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