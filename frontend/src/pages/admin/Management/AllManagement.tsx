import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users2 } from 'lucide-react';
import { API_URL } from '@/config';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import { useDeleteManagementMutation, useGetAllManagementQuery } from '@/redux/features/management/managementApi';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';

export default function AllManagement() {
    const { data, isLoading } = useGetAllManagementQuery({});
    const managementList = data?.data || [];

    const [deleteManagement] = useDeleteManagementMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to remove this management member?")) {
            try {
                const res = await deleteManagement(id) as TResponse;
                if (res?.data?.success) {
                    toast.success(res.data.message || "Management deleted successfully");
                } else {
                    toast.error(res?.error?.data?.message || "Something went wrong!");
                    console.log(res);
                }
            } catch (error: any) {
                toast.error(error?.data?.message || "Failed to add member!");
                console.log(error);
            }
        }
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className='flex items-start gap-2'>
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Users2 size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-neutral">Management Team</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage {managementList?.length} board members and messages.</p>
                    </div>
                </div>
                <Link to="/admin/about/management/add" className="admin_primary_btn">
                    <Plus size={16} /> Add Management
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th>Order</th>
                                <th>Member</th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? <TableSkeleton columns={4} /> : managementList?.map((item: any) => (
                                <tr key={item?._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td>{item?.order}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                                <img src={`${API_URL}${item?.image}`} alt={item?.name} className="w-full h-full object-cover" onError={(e: any) => e.target.src = 'https://ui-avatars.com/api/?name=' + item?.name} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral text-sm">{item?.name}</p>
                                                <p className="text-[11px] text-primary font-medium">{item?.designation}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{item?.title}</p>
                                        <p>{item?.subTitle}</p>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/admin/about/management/edit/${item?._id}`} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 transition-all"><Edit size={14} /></Link>
                                            <button onClick={() => handleDelete(item?._id)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600 transition-all"><Trash2 size={14} /></button>
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