import { Edit, Plus, Trash2, Star, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { CONFIG } from '@/config';
import { useDeleteHappyClientMutation, useGetAllHappyClientQuery } from '@/redux/features/media/happyClientApi';
import { useState } from 'react';
import type { TResponse } from '@/interface/globalInterface';
import toast from 'react-hot-toast';
import type { IHappyClient } from '@/interface/happyClientInterface';
import Pagination from '@/components/shared/Pagination';

export default function AllHappyClients() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllHappyClientQuery({ page, limit: 10 });
    const clients = data?.data || [];

    const [deleteHappyClient] = useDeleteHappyClientMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Permanent delete this Review?")) {
            const res = await deleteHappyClient(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "Review deleted successfully");
            } else {
                toast.error(
                    Array.isArray(res?.error?.data?.error) && res?.error?.data?.error.length > 0
                        ? `${res?.error?.data?.error[0]?.path || ""} ${res?.error?.data?.error[0]?.message || ""}`.trim()
                        : res?.error?.data?.message || "Something went wrong!"
                );
                console.log(res);
            }
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">Happy Clients</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage client testimonials and video reviews.</p>
                </div>
                <Link to="/admin/media/review/add" className="admin_primary_btn flex items-center gap-2">
                    <Plus size={18} /> Add New Client
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Client Info</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Review & Rating</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Video</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={4} /> : clients?.map((item: IHappyClient) => (
                            <tr key={item?._id} className="group hover:bg-slate-50/50 transition-all">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm shrink-0">
                                            <img src={CONFIG.BASE_URL + item?.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{item?.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase">{item?.profession}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-75">
                                    <div className="flex items-center gap-0.5 text-amber-400 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < item?.rating ? "currentColor" : "none"} className={i < item?.rating ? "" : "text-slate-200"} />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 italic">"{item.review}"</p>
                                </td>
                                <td className="px-6 py-4">
                                    {item?.videoLink ? (
                                        <a href={item?.videoLink} target="_blank" className="text-primary hover:underline flex items-center gap-1.5 text-xs font-bold">
                                            <PlayCircle size={14} /> View Video
                                        </a>
                                    ) : <span className="text-slate-300 text-xs italic">N/A</span>}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/media/review/edit/${item?._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(item?._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={page}
                totalPages={data?.meta?.pages || 1}
                onPageChange={(p) => setPage(p)}
            />
        </div>
    );
}