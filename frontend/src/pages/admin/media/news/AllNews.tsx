import { useState } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteNewsMutation, useGetAllNewsQuery } from '@/redux/features/media/newsApi';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { CONFIG } from '@/config';
import Pagination from '@/components/shared/Pagination';
import type { TResponse } from '@/interface/globalInterface';
import toast from 'react-hot-toast';

export default function AllNews() {
    const [selectedType, setSelectedType] = useState('all');
    const [page, setPage] = useState(1);

    const { data, isLoading } = useGetAllNewsQuery({
        type: selectedType !== 'all' ? selectedType : undefined,
        page,
        limit: 10
    });

    const newsList = data?.data || [];
    const newsTypes = ['all', 'press', 'online', 'tv'];

    const [deleteNews] = useDeleteNewsMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Permanent delete this News?")) {
            const res = await deleteNews(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "News deleted successfully");
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
        <div className="space-y-2 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">News & Media Management</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage press releases and media coverages.</p>
                </div>
                <Link to="/admin/media/news/add" className="admin_primary_btn flex items-center gap-2">
                    <Plus size={18} /> Add News
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200/60 w-fit">
                {newsTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${selectedType === type ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">News Details</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Media & Date</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Type</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={4} /> : newsList.map((item: any) => (
                            <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                            <img src={CONFIG.BASE_URL + item.image} className="w-full h-full object-cover" alt={item?.title} loading='lazy' />
                                        </div>
                                        <p className="font-bold text-slate-800 text-sm line-clamp-1">{item?.title}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-slate-700">{item?.mediaName}</p>
                                        <p className="text-[10px] text-slate-400">{item?.date}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                                        {item?.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/media/news/edit/${item?._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
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