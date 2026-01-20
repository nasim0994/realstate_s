import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { API_URL } from '@/config';
import toast from 'react-hot-toast';
import { useDeleteTeamMutation, useGetAllTeamQuery } from '@/redux/features/team/teamApi';
import type { TResponse } from '@/interface/globalInterface';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';

export default function AllTeam() {
    const { data, isLoading } = useGetAllTeamQuery({});
    const [deleteTeam] = useDeleteTeamMutation();
    const teamMembers = data?.data || [];

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to remove this team member?")) {
            try {
                const res = await deleteTeam(id) as TResponse;
                if (res?.data?.success) {
                    toast.success(res.data.message || "Banner deleted successfully");
                } else {
                    toast.error(
                        Array.isArray(res?.error?.data?.error) && res?.error?.data?.error.length > 0
                            ? `${res?.error?.data?.error[0]?.path || ""} ${res?.error?.data?.error[0]?.message || ""}`.trim()
                            : res?.error?.data?.message || "Something went wrong!"
                    );
                }
            } catch (error: any) {
                toast.error(error?.data?.message || "Failed to delete team member");
                console.log(error);
            }
        }
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className='flex items-start gap-2'>
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Users size={20} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-neutral">
                            Our Team
                        </h1>
                        <p className="text-slate-500 text-xs mt-1">
                            Manage {teamMembers.length} active team members.
                        </p>
                    </div>

                </div>
                <Link to="/admin/about/team-member/add" className="admin_primary_btn">
                    <Plus size={16} /> Add Member
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th>Order</th>
                                <th>Member</th>
                                <th>Designation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? <TableSkeleton columns={4} /> : teamMembers?.map((member: any) => (
                                <tr key={member?._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td>
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">{member?.order}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                                                <img src={`${API_URL}${member?.image}`} alt={member?.name} className="w-full h-full object-cover" onError={(e: any) => e.target.src = 'https://ui-avatars.com/api/?name=' + member?.name} />
                                            </div>
                                            <span className="font-bold text-slate-800 text-sm">{member?.name}</span>
                                        </div>
                                    </td>
                                    <td>{member?.designation}</td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/admin/about/team-member/edit/${member?._id}`} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all"><Edit size={14} /></Link>
                                            <button onClick={() => handleDelete(member?._id)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600 hover:border-red-600 transition-all"><Trash2 size={14} /></button>
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