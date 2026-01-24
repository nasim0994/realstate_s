import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import { API_URL } from '@/config';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { useDeleteMoreAboutMutation, useGetAllMoreAboutQuery } from '@/redux/features/moreAbout/moreAboutApi';

export default function AllMoreAbout() {
    const { data, isLoading } = useGetAllMoreAboutQuery({});
    const [deleteMoreAbout] = useDeleteMoreAboutMutation();
    const moreAbouts = data?.data || [];

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this more about?")) {
            const res = await deleteMoreAbout(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "More About deleted successfully");
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
        <div className="space-y-3 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">More About Management</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage your company more about, recognitions and achievements.</p>
                </div>
                <Link to="/admin/about/more/add" className="admin_primary_btn">
                    <Plus size={18} /> Add New More About
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th>SL</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={4} /> : moreAbouts?.map((moreAbout: any, index: number) => (
                            <tr key={moreAbout?._id} className="group hover:bg-slate-50/50 transition-all">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                            {moreAbout?.icon ? (
                                                <img src={API_URL + moreAbout?.icon} className="w-full h-full object-cover" alt={moreAbout?.title} loading='lazy' />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon size={16} /></div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{moreAbout?.title}</p>
                                            <p className="text-[10px] text-slate-400 font-mono">/{moreAbout?.slug}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/about/more/edit/${moreAbout?._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(moreAbout?._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
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