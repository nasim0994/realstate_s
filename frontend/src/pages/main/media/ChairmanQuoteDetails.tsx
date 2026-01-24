import { ArrowLeft, Share2, Calendar, Bookmark, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function ChairmanQuoteDetails() {
    const post = {
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
        caption: 'Honored to speak at the National Urban Development Summit 2026.',
        fullDescription: 'Innovation is the key to our sustainable future. Today I had the opportunity to discuss our upcoming eco-friendly projects with industry leaders. We are not just building houses; we are creating a lifestyle that respects nature and empowers technology. I want to thank everyone who joined us in this session and shared their valuable insights.',
        date: '22 January, 2026',
        author: 'Chairman Name'
    };

    return (
        <div className="min-h-screen bg-white py-20">
            <div className="container">
                <Link to="/media/chairman-quote" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-8 font-bold transition-colors">
                    <ArrowLeft size={20} /> Back to Updates
                </Link>

                <div className="space-y-8">
                    {/* Main Image Banner */}
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 border-8 border-slate-50">
                        <img
                            src={post.image}
                            alt="Details"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                                C
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">{post.author}</h2>
                                <p className="text-xs text-slate-400 flex items-center gap-1 font-medium italic">
                                    <Calendar size={12} /> {post.date}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all"><Heart size={20} /></button>
                            <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-all"><Bookmark size={20} /></button>
                            <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"><Share2 size={20} /></button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight italic">
                            "{post.caption}"
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                            {post.fullDescription}
                        </p>
                    </div>

                    {/* Social Style Footer */}
                    <div className="bg-slate-50 p-6 rounded-3xl mt-12 flex items-center justify-center gap-4">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share this update</p>
                        <div className="flex gap-2">
                            {/* Dummy Social Links */}
                            <div className="w-8 h-8 rounded-full bg-slate-200 cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-200 cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-200 cursor-pointer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}