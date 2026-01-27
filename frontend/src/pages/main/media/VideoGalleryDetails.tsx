import { useState } from 'react';
import { ChevronLeft, Calendar, Youtube, Play, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Playlist Data
const videoList = [
    { id: '1', youtubeId: 'dQw4w9WgXcQ', title: 'Project Success Story 2024', duration: '05:20', date: 'Jan 10, 2024', desc: 'Detailed look at our recent project success.' },
    { id: '2', youtubeId: 'ysz5S6PUM-U', title: 'Office Tour & Culture', duration: '12:45', date: 'Dec 15, 2023', desc: 'A walk through our creative workspace.' },
    { id: '3', youtubeId: 'LXb3EKWsInQ', title: 'Annual General Meeting Highlights', duration: '08:10', date: 'Nov 05, 2023', desc: 'Key moments from our AGM.' },
    { id: '4', youtubeId: '761ae_KDg_Q', title: 'Client Feedback Session', duration: '03:15', date: 'Oct 20, 2023', desc: 'What our clients say about us.' },
];

export default function VideoGalleryDetails() {
    const [activeVideo, setActiveVideo] = useState(videoList[0]);

    return (
        <div className="min-h-screen bg-slate-50 py-26">
            <div className="container">

                {/* Top Navigation */}
                <div className="flex flex-wrap gap-5 items-center justify-between mb-8">
                    <Link to="/video-galleries" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold">
                        <ChevronLeft size={20} /> Back to All Galleries
                    </Link>
                    <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                        Gallery Series: {activeVideo.date.split(',')[1]}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Main Video Player & Content (2 Columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0`}
                                title={activeVideo.title}
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Active Video Info */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">{activeVideo.title}</h1>
                            <div className="flex items-center gap-6 text-slate-400 text-sm mb-6 border-b border-slate-100 pb-6">
                                <span className="flex items-center gap-2 font-medium"><Calendar size={16} className="text-primary" /> {activeVideo.date}</span>
                                <span className="flex items-center gap-2 font-medium"><Play size={16} className="text-primary" /> {activeVideo.duration}</span>
                                <a href={`https://youtube.com/watch?v=${activeVideo.youtubeId}`} target="_blank" className="flex items-center gap-2 text-red-500 font-bold hover:underline">
                                    <Youtube size={18} /> Open in YouTube
                                </a>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-slate-400" /> Description
                                </h3>
                                <p className="text-slate-600 leading-relaxed italic">
                                    {activeVideo.desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Playlist Sidebar (1 Column) */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">More Videos in Archive</h2>

                        <div className="space-y-3 max-h-200 overflow-y-auto pr-2 custom-scrollbar">
                            {videoList.map((video) => (
                                <button
                                    key={video.id}
                                    onClick={() => setActiveVideo(video)}
                                    className={`w-full flex gap-4 p-3 rounded-2xl transition-all text-left border ${activeVideo.id === video.id
                                        ? 'bg-white border-primary shadow-md ring-2 ring-primary/5'
                                        : 'bg-white border-transparent hover:border-slate-300 hover:shadow-sm'
                                        }`}
                                >
                                    {/* Small Thumbnail */}
                                    <div className="relative w-32 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-200">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                            className="w-full h-full object-cover"
                                            alt={video.title}
                                        />
                                        {activeVideo.id === video.id && (
                                            <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary">
                                                    <Play fill="currentColor" size={14} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Video Title & Meta */}
                                    <div className="flex flex-col justify-center">
                                        <h4 className={`text-sm font-bold line-clamp-2 ${activeVideo.id === video.id ? 'text-primary' : 'text-slate-700'}`}>
                                            {video.title}
                                        </h4>
                                        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                                            {video.duration} • {video.date.split(',')[1]}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}