
import {
    Building2, MessageSquare, Users, BookOpen,
    TrendingUp, Clock, ChevronRight
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { label: 'Total Projects', value: '48', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Ongoing', value: '12', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'New Messages', value: '08', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Active Blogs', value: '24', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* 1. Header Section */}
            <div>
                <h1 className="text-2xl font-bold text-neutral">Welcome back, Sabbir</h1>
                <p className="text-slate-500 text-sm">Here's what's happening with your projects today.</p>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">MONTHLY</span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Project Status Overview (Left/Center) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800">Recent Projects</h3>
                            <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                                View All <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Upcoming', 'Ongoing', 'Completed'].map((status) => (
                                <div key={status} className="p-4 rounded-xl border border-slate-50 bg-slate-50/30">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{status}</p>
                                    <p className="text-xl font-bold text-slate-800">
                                        {status === 'Ongoing' ? '12' : status === 'Completed' ? '32' : '04'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Recent Contact Messages Table */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50">
                            <h3 className="font-bold text-slate-800">Latest Inquiries</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Sender</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-800">John Doe</p>
                                                <p className="text-xs text-slate-400 italic">Interested in Ongoing Project...</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">New</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-xs font-bold text-slate-600 hover:text-blue-600">Open</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 5. Right Sidebar (Quick Settings & Management) */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                        <TrendingUp className="absolute -right-4 -bottom-4 text-white/10 rotate-12 group-hover:scale-110 transition-transform" size={120} />
                        <h3 className="text-lg font-bold mb-2">Quick Update</h3>
                        <p className="text-slate-400 text-xs mb-6">Need to change your logo or update SEO settings?</p>
                        <div className="space-y-3">
                            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                                General Settings
                            </button>
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                                Manage Banners
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Users size={18} className="text-blue-600" /> Management
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 italic text-xs">Admins Active</span>
                                <span className="font-bold text-slate-800">03</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 italic text-xs">Team Members</span>
                                <span className="font-bold text-slate-800">18</span>
                            </div>
                            <div className="pt-2">
                                <button className="w-full py-2 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                    Manage Roles
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}