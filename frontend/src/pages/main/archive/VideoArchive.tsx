import { Play, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const videoArchives = [
    {
        id: '1',
        title: 'Project Success Story 2024',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: '05:20',
        date: '10 Jan, 2024'
    },
    {
        id: '2',
        title: 'Office Tour & Culture',
        thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg',
        duration: '12:45',
        date: '15 Dec, 2023'
    },
    {
        id: '3',
        title: 'Annual General Meeting Highlights',
        thumbnail: 'https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg',
        duration: '08:10',
        date: '05 Nov, 2023'
    },
];

export default function VideoArchive() {
    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">Video Archive</h1>
                    <p className="text-slate-500 mt-2">Watch our latest events and project highlights</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoArchives.map((video) => (
                        <Link to={`/archives/video-archive/${video.id}`} key={video.id} className="group">
                            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                                {/* Thumbnail with Play Button */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                            <Play fill="currentColor" size={24} />
                                        </div>
                                    </div>
                                    {/* Duration Tag */}
                                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                    <div className="flex items-center gap-4 mt-3 text-slate-400 text-xs">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {video.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {video.duration}</span>
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