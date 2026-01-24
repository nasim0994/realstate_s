
import { Calendar, MapPin, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function PhotoGalleryDetails() {
    const archive = {
        title: "Annual Conference 2025",
        description: "A gathering of industry leaders and innovators to discuss the future of technology and sustainable development. This event featured over 20 keynote speakers and multiple networking sessions.",
        banner: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
        date: "Jan 15, 2025",
        location: "Grand Convention Hall",
        images: ["https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop"]
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner Section */}
            <div className="relative h-[50vh] sm:h-[65vh] min-h-100 w-full overflow-hidden">
                <img
                    src={archive.banner}
                    className="w-full h-full object-cover"
                    alt="Banner"
                    loading='lazy'
                />
                <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]" />

                {/* Banner Content */}
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 pb-12">
                        <Link to="/media/photo-galleries" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm transition-colors">
                            <ChevronLeft size={18} /> Back to Archive
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {archive.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-white/90 text-sm">
                            <span className="flex items-center gap-2"><Calendar size={16} /> {archive.date}</span>
                            <span className="flex items-center gap-2"><MapPin size={16} /> {archive.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container">
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Description */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Event</h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                {archive.description}
                            </p>
                        </div>
                    </div>

                    {/* Image Gallery Grid */}
                    <div className="lg:col-span-2">
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                            {archive.images.map((img, idx) => (
                                <div key={idx} className="relative group overflow-hidden rounded-2xl cursor-zoom-in">
                                    <img
                                        src={img}
                                        alt={`Gallery ${idx}`}
                                        className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}