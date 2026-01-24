import type { IMessage } from '@/interface/messageInterface';
import { useGetBlogCountQuery } from '@/redux/features/blog/blogApi';
import { useGetAllMessageQuery, useGetMessageCountQuery } from '@/redux/features/contactMessage/contactMessageApi';
import { useGetManagementCountQuery } from '@/redux/features/management/managementApi';
import { useGetProjectCountQuery } from '@/redux/features/project/projectApi';
import { useGetTeamCountQuery } from '@/redux/features/team/teamApi';
import { useGetUserCountQuery } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook/hooks';
import {
    Building2, MessageSquare, Users, BookOpen,
    TrendingUp, ChevronRight,
    User
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { loggedUser } = useAppSelector((state) => state.auth);
    const { data: projectCount } = useGetProjectCountQuery({});
    const { data: messageCount } = useGetMessageCountQuery({});
    const { data: userCount } = useGetUserCountQuery({});
    const { data: blogCount } = useGetBlogCountQuery({});
    const { data: managementCount } = useGetManagementCountQuery({});
    const { data: teamCount } = useGetTeamCountQuery({});

    const { data: message } = useGetAllMessageQuery({ limit: 10 });
    const messages = message?.data || [];

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* 1. Header Section */}
            <div>
                <h1 className="text-2xl font-bold text-neutral">Welcome back, {loggedUser?.name}</h1>
                <p className="text-slate-500 text-sm">Here's what's happening with your projects today.</p>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/admin/projects/all" className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 group">

                    <div className="absolute -right-1 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-primary/5 group-hover:scale-110 -rotate-12 group-hover:rotate-0 group-hover:-translate-y-1">
                        <Building2 size={80} />
                    </div>


                    <div className="flex items-center justify-between mb-4">
                        <div className={`text-primary bg-primary/5 p-3 rounded-xl`}>
                            <Building2 size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Total Projects</p>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{projectCount?.data?.totalProject || 0}</h3>
                </Link>

                <Link to="/admin/contact-message" className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 group">

                    <div className="absolute -right-1 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-blue-50 group-hover:scale-110  group-hover:-rotate-12 group-hover:-translate-y-1">
                        <MessageSquare size={80} />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className={`text-blue-600 bg-blue-50 p-3 rounded-xl`}>
                            <MessageSquare size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">New Messages</p>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{messageCount?.data?.unreadMessages || 0}</h3>
                </Link>

                <Link to="/admin/archives/blogs/all" className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 group">

                    <div className="absolute -right-1 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-green-50 group-hover:scale-110 -rotate-12 group-hover:rotate-0 group-hover:-translate-y-1">
                        <BookOpen size={80} />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className={`text-green-600 bg-green-50 p-3 rounded-xl`}>
                            <BookOpen size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Active Blogs</p>
                    <h3 className="text-2xl font-black text-neutral mt-1">{blogCount?.data?.totalBlogs || 0}</h3>
                </Link>

                <Link to="/admin/user-role/user-management" className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 group">

                    <div className="absolute -right-1 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-primary/5 group-hover:scale-110  group-hover:-rotate-12 group-hover:-translate-y-1">
                        <User size={80} />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className={`text-primary bg-primary/5 p-3 rounded-xl`}>
                            <User size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">All Users</p>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{userCount?.data?.totalUsers || 0}</h3>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 3. Project Status Overview (Left/Center) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-bold text-neutral">Our Projects</h3>
                            <Link to="/admin/projects/all" className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Upcoming Projects
                                </p>
                                <p className="text-xl font-bold text-neutral">
                                    {projectCount?.data?.upcomingProject || 0}
                                </p>
                            </div>

                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Ongoing Projects
                                </p>
                                <p className="text-xl font-bold text-neutral">
                                    {projectCount?.data?.ongoingProject || 0}
                                </p>
                            </div>

                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Completed Projects
                                </p>
                                <p className="text-xl font-bold text-neutral">
                                    {projectCount?.data?.completedProject || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Recent Contact Messages Table */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50">
                            <h3 className="font-bold text-neutral">Latest Inquiries</h3>
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
                                    {messages?.map((item: IMessage, i: number) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-800">{item?.name}</p>
                                                <p className="text-xs text-slate-400 italic">{item?.message}</p>
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
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-neutral mb-4 flex items-center gap-2">
                            <Users size={18} className="text-primary" /> Management
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 italic text-xs">Management Messages</span>
                                <span className="font-bold text-neutral">{managementCount?.data?.totalManagements || 0}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 italic text-xs">Team Members</span>
                                <span className="font-bold text-neutral">{teamCount?.data?.totalTeams || 0}</span>
                            </div>
                            <div className="pt-2">
                                <Link to="/admin/user-role/role-management" className="block text-center w-full py-2 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                    Manage Roles
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                        <TrendingUp className="absolute -right-4 -bottom-4 text-white/10 rotate-12 group-hover:scale-110 transition-transform" size={120} />
                        <h3 className="text-lg font-bold mb-2">Quick Update</h3>
                        <p className="text-slate-400 text-xs mb-6">Need to change your logo or update SEO settings?</p>
                        <div className="space-y-3">
                            <Link to="/admin/setting/general" className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                                General Settings
                            </Link>
                            <Link to="/admin/seo" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                                Manage SEO
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}