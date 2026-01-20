import { Plus, Edit, Trash2, Star, Zap, Eye, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDeleteProjectMutation, useGetAllProjectQuery, useToggleFeatureProjectMutation, useToggleHighlightProjectMutation, useToggleStatusProjectMutation } from '@/redux/features/project/projectApi';
import type { TResponse } from '@/interface/globalInterface';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import type { IProject } from '@/interface/projectInterface';
import { CONFIG } from '@/config';

export default function AllProjects() {
    const { data, isLoading } = useGetAllProjectQuery({});
    const projects = data?.data || [];

    const [deleteProject] = useDeleteProjectMutation();
    const handleDelete = async (id: string) => {
        if (window.confirm("Permanent delete this project?")) {
            const res = await deleteProject(id) as TResponse;
            if (res?.data?.success) {
                toast.success(res.data.message || "Project deleted successfully");
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

    const [toggleStatusProject] = useToggleStatusProjectMutation();
    const [toggleHighlightProject] = useToggleHighlightProjectMutation();
    const [toggleFeatureProject] = useToggleFeatureProjectMutation();

    const handleToggleActiveStatus = async (id: string) => {
        if (!id) return;
        if (window.confirm("Change active status of this project?")) {
            const res = await toggleStatusProject(id) as TResponse;
            if (res?.data?.success) {
                toast.success("Project status updated successfully");
            } else {
                toast.error(res?.error?.data?.message || "Something went wrong!");
                console.log(res);

            }
        }
    }

    const handleToggleFeaturedStatus = async (id: string) => {
        if (!id) return;
        if (window.confirm("Change featured status of this project?")) {
            const res = await toggleFeatureProject(id) as TResponse;
            if (res?.data?.success) {
                toast.success("Project featured status updated successfully");
            } else {
                toast.error(res?.error?.data?.message || "Something went wrong!");
                console.log(res);

            }
        }
    }

    const handleToggleHighlight = async (id: string) => {
        if (!id) return;
        if (window.confirm("Change highlight status of this project?")) {
            const res = await toggleHighlightProject(id) as TResponse;
            if (res?.data?.success) {
                toast.success("Project highlight status updated successfully");
            } else {
                toast.error(res?.error?.data?.message || "Something went wrong!");
                console.log(res);

            }
        }
    }

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-neutral">Project Inventory</h1>
                    <p className="text-slate-500 text-xs mt-1">Manage {projects.length} property listings and their visibility.</p>
                </div>
                <Link to="/admin/projects/add" className="admin_primary_btn">
                    <Plus size={18} /> Add New Project
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th>Project Info</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Visibility Toggles</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? <TableSkeleton columns={4} /> : projects?.map((item: IProject) => (
                                <tr key={item?._id} className="hover:bg-slate-50/50 transition-all">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <img src={CONFIG.BASE_URL + item?.thumbnail} className="w-16 h-12 rounded-lg object-cover border border-slate-200" alt="" />
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm line-clamp-1">{item?.title}</p>
                                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 uppercase tracking-tighter">
                                                    <MapPin size={10} /> {item?.location}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item?.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            item?.status === 'ongoing' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                            {item?.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 whitespace-nowrap">
                                            {item?.type?.name}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-6">
                                            {/* Highlight Toggle */}
                                            <button onClick={() => handleToggleHighlight(item?._id)} className="flex flex-col items-center gap-1 group">
                                                <Zap size={16} className={`${item?.isHighlight ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                                                <span className="text-[9px] font-bold text-slate-400 group-hover:text-amber-600">Highlight</span>
                                            </button>
                                            {/* Featured Toggle */}
                                            <button onClick={() => handleToggleFeaturedStatus(item?._id)} className="flex flex-col items-center gap-1 group">
                                                <Star size={16} className={`${item?.isFeatured ? 'text-blue-500 fill-blue-500' : 'text-slate-300'}`} />
                                                <span className="text-[9px] font-bold text-slate-400 group-hover:text-blue-600">Featured</span>
                                            </button>
                                            {/* Active Toggle */}
                                            <button onClick={() => handleToggleActiveStatus(item?._id)} className="flex flex-col items-center gap-1 group">
                                                <Eye size={16} className={`${item?.isActive ? 'text-green-500' : 'text-slate-300'}`} />
                                                <span className="text-[9px] font-bold text-slate-400 group-hover:text-green-600">Active</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end">
                                            <Link to={`/admin/projects/edit/${item?._id}`} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all">
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