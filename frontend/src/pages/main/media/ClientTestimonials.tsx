import { useState } from 'react';
import { Play, Quote, Star, User, X, Youtube } from 'lucide-react';

const testimonials = [
    {
        id: '1',
        clientName: 'Sarah Jenkins',
        designation: 'CEO at TechFlow',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
        quote: "This team transformed our vision into reality. The results exceeded our expectations!",
        rating: 5
    },
    {
        id: '2',
        clientName: 'David Miller',
        designation: 'Real Estate Investor',
        youtubeId: 'ysz5S6PUM-U',
        thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
        quote: "Professionalism and quality are their top priorities. Highly recommended for any large scale project.",
        rating: 5
    },
    {
        id: '3',
        clientName: 'Michael Chen',
        designation: 'Director, Green Energy Co.',
        youtubeId: 'LXb3EKWsInQ',
        thumbnail: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
        quote: "The attention to detail and communication throughout the process was outstanding.",
        rating: 4
    }
];

export default function ClientTestimonials() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className="min-h-screen py-26">
            <div className="container">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        <Star size={14} fill="currentColor" /> Success Stories
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        What Our <span className='text-outline'>Clients</span> Say
                    </h1>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white rounded-4xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">

                            {/* Video Thumbnail Area */}
                            <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(item.youtubeId)}>
                                <img
                                    src={item.thumbnail}
                                    alt={item.clientName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                        <Play fill="currentColor" size={28} className="ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-white text-[10px] font-medium flex items-center gap-2">
                                    <Youtube size={14} /> Watch Video
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 relative">
                                <div className="absolute -top-6 right-8 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Quote size={24} fill="currentColor" />
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
                                    ))}
                                </div>

                                <p className="text-slate-600 italic mb-8 leading-relaxed">
                                    "{item.quote}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-white shadow-sm">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{item.clientName}</h4>
                                        <p className="text-xs text-slate-400 font-medium">{item.designation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Lightbox Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300">
                    <button
                        onClick={() => setSelectedVideo(null)}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                    <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}