import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { CONFIG } from '@/config';
import type { IConcernProduct } from '@/interface/concernProductInterface';
import type { TResponse } from '@/interface/globalInterface';
import { useDeleteConcernProductMutation, useGetAllConcernProductQuery } from '@/redux/features/concerns/concernProductApi';
import { Edit, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AllConcernProducts() {
    const { data, isLoading } = useGetAllConcernProductQuery({});
    const products = data?.data || [];

    const [deleteConcernProduct] = useDeleteConcernProductMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this concern?")) {
            const res = await deleteConcernProduct(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "Concern deleted successfully");
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
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">Concern Products</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage all products under your company concerns.</p>
                </div>
                <Link to="/admin/about/concerns/product/add" className="admin_primary_btn flex items-center gap-2">
                    <Plus size={18} /> Add New Product
                </Link>
            </div>

            {/* Table section */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">SL</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Product Info</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Concern</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={4} /> : products?.map((product: IConcernProduct, index: number) => (
                            <tr key={product?._id} className="group hover:bg-slate-50/50 transition-all">
                                <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                            {product?.image ? (
                                                <img src={CONFIG.BASE_URL + product?.image} className="w-full h-full object-cover" alt={product?.title} loading='lazy' />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon size={16} /></div>
                                            )}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{product?.title}</p>
                                            <p className="text-[10px] text-slate-400 line-clamp-1">{product?.description?.substring(0, 40)}...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-primary">
                                        {product?.concern?.name || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end">
                                        <Link to={`/admin/about/concerns/product/edit/${product?._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(product?._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
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