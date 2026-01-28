import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { CONFIG } from '@/config';
import { useDeletePhotoGalleryMutation, useGetAllPhotoGalleryQuery } from '@/redux/features/media/photoGalleryApi';
import moment from 'moment';
import type { IPhotoGallery } from '@/interface/photoGalleryInterface';

export default function AllPhotoGallery() {
    const { data, isLoading } = useGetAllPhotoGalleryQuery({});
    const galleries = data?.data || [];

    const [deleteGallery] = useDeletePhotoGalleryMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Permanent delete this Gallery?")) {
            const res = await deleteGallery(id) as TResponse;
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
        <div className="space-y-3 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">Photo Gallery Inventory</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage {data?.meta?.total} photo galleries and their visibility.</p>
                </div>
                <Link to="/admin/media/gallery/add" className="admin_primary_btn">
                    <Plus size={18} /> Add New Gallery
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th>Date</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Galleries</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? <TableSkeleton columns={4} /> : galleries?.map((item: IPhotoGallery) => (
                                <tr key={item?._id} className="hover:bg-slate-50/50 transition-all">
                                    <td>
                                        {moment(item?.date).format("MMM DD, YYYY")}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <img src={CONFIG.BASE_URL + item?.thumbnail} className="w-16 h-12 rounded-lg object-cover border border-slate-200" alt="" />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{item?.title}</p>
                                            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 uppercase tracking-tighter">
                                                <MapPin size={10} /> {item?.location}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {item?.galleries?.length || 0} Galleries
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end">
                                            <Link to={`/admin/media/gallery/edit/${item?._id}`} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all">
                                                <Edit size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(item?._id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-all">
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
        </div>
    );
}