import { Edit, Plus, Trash2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { CONFIG } from '@/config';
import { useDeleteChairmanQuoteMutation, useGetAllChairmanQuoteQuery } from '@/redux/features/media/chairmanQuoteApi';
import type { IChairmanQuote } from '@/interface/chairmanQuoteInterface';
import { useState } from 'react';
import Pagination from '@/components/shared/Pagination';

export default function AllChairmanQuotes() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllChairmanQuoteQuery({ page, limit: 10 });
    const quotes = data?.data || [];

    const [deleteChairmanQuote] = useDeleteChairmanQuoteMutation();

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                        <Quote size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-neutral">Chairman's Quotes</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage inspirational quotes and titles.</p>
                    </div>
                </div>
                <Link to="/admin/media/chairman-quote/add" className="admin_primary_btn flex items-center gap-2">
                    <Plus size={18} /> Add New Quote
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th>SL</th>
                            <th>Image</th>
                            <th>Quote Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={4} /> : quotes?.map((item: IChairmanQuote, index: number) => (
                            <tr key={item?._id} className="group hover:bg-slate-50/50 transition-all">
                                <td>{(page - 1) * 10 + index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm shrink-0">
                                            <img src={CONFIG.BASE_URL + item?.image} className="w-full h-full object-cover" alt={item?.title} loading='lazy' />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-slate-800 text-sm line-clamp-1">{item?.title}</p>
                                        <p className="text-[10px] text-slate-400 font-mono">/{item?.slug}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/media/chairman-quote/edit/${item?._id}`} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => deleteChairmanQuote(item?._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
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