import { Edit, Plus, Trash2, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { CONFIG } from '@/config';
import { useDeleteVideoGalleryMutation, useGetAllVideoGalleryQuery } from '@/redux/features/media/videoGalleryApi';
import type { TResponse } from '@/interface/globalInterface';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Pagination from '@/components/shared/Pagination';

export default function AllVideoGallery() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllVideoGalleryQuery({ page, limit: 10 });
    const galleries = data?.data || [];

    const [deleteVideoGallery] = useDeleteVideoGalleryMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Permanent delete this Gallery?")) {
            const res = await deleteVideoGallery(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "Gallery deleted successfully");
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">Video Gallery</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage video collections and playlists.</p>
                </div>
                <Link to="/admin/media/video-gallery/add" className="admin_primary_btn flex items-center gap-2">
                    <Plus size={18} /> Add New Gallery
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Gallery Info</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Videos</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={3} /> : galleries.map((item: any) => (
                            <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                            <img src={CONFIG.BASE_URL + item.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.title}</p>
                                            <p className="text-[10px] text-slate-400">{item.date || 'No Date'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Video size={14} />
                                        <span className="text-xs font-bold">{item.videoLinks?.length || 0} Videos</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/media/video-gallery/edit/${item._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
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