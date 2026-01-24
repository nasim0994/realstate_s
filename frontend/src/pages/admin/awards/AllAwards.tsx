import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import { API_URL } from '@/config';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { useDeleteAwardsMutation, useGetAllAwardsQuery } from '@/redux/features/awards/awardsApi';

export default function AllAwards() {
    const { data, isLoading } = useGetAllAwardsQuery({});
    const [deleteAward] = useDeleteAwardsMutation();
    const awards = data?.data || [];

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this award?")) {
            const res = await deleteAward(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "Awards deleted successfully");
            } else {
                toast.error(
                    Array.isArray(res?.error?.data?.error) && res?.error?.data?.error.length > 0
                        ? `${res?.error?.data?.error[0]?.path || ""} ${res?.error?.data?.error[0]?.message || ""}`.trim()
                        : res?.error?.data?.message || "Something went wrong!"
                );
            }
        }
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">Awards Management</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage your company awards, recognitions and achievements.</p>
                </div>
                <Link to="/admin/awards/add" className="admin_primary_btn">
                    <Plus size={18} /> Add New Award
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th>SL</th>
                            <th>Post Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={4} /> : awards?.map((award: any, index: number) => (
                            <tr key={award?._id} className="group hover:bg-slate-50/50 transition-all">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                            {award?.image ? (
                                                <img src={API_URL + award?.image} className="w-full h-full object-cover" alt={award.title} loading='lazy' />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon size={16} /></div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{award.title}</p>
                                            <p className="text-[10px] text-slate-400 font-mono">/{award.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/awards/edit/${award?._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(award?._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}