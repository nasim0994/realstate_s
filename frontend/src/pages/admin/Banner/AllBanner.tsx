import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Image as ImageIcon, Layout } from 'lucide-react';
import { API_URL } from '@/config';
import toast from 'react-hot-toast';
import { useDeleteBannerMutation, useGetAllBannerQuery } from '@/redux/features/banner/bannerApi';
import type { TResponse } from '@/interface/globalInterface';

export default function AllBanner() {
    const { data, isLoading } = useGetAllBannerQuery({});
    const [deleteBanner] = useDeleteBannerMutation();
    const banners = data?.data || [];

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            const res = await deleteBanner(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "Banner deleted successfully");
            } else {
                toast.error(
                    Array.isArray(res?.error?.data?.error) &&
                        res?.error?.data?.error.length > 0
                        ? `${res?.error?.data?.error[0]?.path || ""} ${res?.error?.data?.error[0]?.message || ""
                            }`.trim()
                        : res?.error?.data?.message || "Something went wrong!"
                );
                console.log(res);
            }
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <Layout className="text-primary" size={24} />
                        Banner Settings
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Total <span className="font-bold text-primary">{banners.length}</span> active banners found.
                    </p>
                </div>
                <Link
                    to="/admin/setting/banner/add"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:opacity-90 active:scale-95 transition-all"
                >
                    <Plus size={18} />
                    Add New Banner
                </Link>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 uppercase text-[11px] font-bold tracking-widest">
                                <th className="px-6 py-4 w-20">Order</th>
                                <th className="px-6 py-4">Preview</th>
                                <th className="px-6 py-4">Content</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-6 py-8 bg-slate-50/20"></td>
                                    </tr>
                                ))
                            ) : banners?.length > 0 ? (
                                banners?.map((banner: any) => (
                                    <tr key={banner._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs">
                                                {banner?.order}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                                                <img
                                                    src={`${API_URL}${banner?.image}`}
                                                    alt={banner?.title}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    onError={(e: any) => e.target.src = 'https://placehold.co/600x400?text=No+Image'}
                                                    loading='lazy'
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs md:max-w-md">
                                            <h4 className="font-bold text-slate-800 truncate">{banner?.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{banner?.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/setting/banner/edit/${banner?._id}`}
                                                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                    title="Edit Banner"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(banner?._id)}
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                    title="Delete Banner"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-slate-400">
                                            <ImageIcon size={48} strokeWidth={1} />
                                            <p className="font-medium">No banners found. Start by adding one!</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}