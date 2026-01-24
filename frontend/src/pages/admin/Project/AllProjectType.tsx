import { useState } from 'react';
import { Plus, Edit, Trash2, Tag, X, Save, Type } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAddProjectTypeMutation, useDeleteProjectTypeMutation, useGetAllProjectTypeQuery, useUpdateProjectTypeMutation } from '@/redux/features/projectType/projectTypeApi';
import type { TResponse } from '@/interface/globalInterface';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import type { IProjectType } from '@/interface/projectTypeInterface';

export default function AllProjectType() {
    const { data, isLoading } = useGetAllProjectTypeQuery({});
    const [addProjectType, { isLoading: isCreating }] = useAddProjectTypeMutation();
    const [updateProjectType, { isLoading: isUpdating }] = useUpdateProjectTypeMutation();
    const [deleteProjectType] = useDeleteProjectTypeMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IProjectType>();
    const types = data?.data || [];

    const openModal = (type?: IProjectType) => {
        if (type) {
            setEditingId(type?._id);
            reset({ name: type?.name });
        } else {
            setEditingId(null);
            reset({ name: '' });
        }
        setIsModalOpen(true);
    };

    const onSubmit = async (formData: IProjectType) => {
        try {
            if (editingId) {
                const res = await updateProjectType({ id: editingId, data: formData }) as TResponse;
                if (res?.data?.success) {
                    toast.success("Project Type updated!");
                } else {
                    toast.error(res?.error?.data?.message || "Update failed");
                    console.log(res);
                }
            } else {
                const res = await addProjectType(formData) as TResponse;
                if (res?.data?.success) {
                    toast.success("Project Type added!");
                } else {
                    toast.error(res?.error?.data?.message || "Add failed");
                    console.log(res);
                }
            }
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure? This will affect projects under this type.")) {
            await deleteProjectType(id) as TResponse;
            toast.success("Deleted successfully");
        }
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Tag size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-neutral">Project Types</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage categories for your portfolio projects.</p>
                    </div>
                </div>
                <button onClick={() => openModal()} className="admin_primary_btn">
                    <Plus size={18} /> Add New Type
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th>Type Name</th>
                            <th>URL Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? <TableSkeleton columns={3} /> : types?.map((type: IProjectType) => (
                            <tr key={type?._id} className="group hover:bg-slate-50/50 transition-all">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 font-bold text-slate-800 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        {type?.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                    /{type?.slug}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => openModal(type)} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(type?._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h2 className="font-bold text-slate-800">{editingId ? 'Update Project Type' : 'Add Project Type'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Type size={14} /> Type Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="e.g. Web Development"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                />
                                {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name.message as string}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                    className="admin_primary_btn w-full py-4 flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    {isCreating || isUpdating ? 'Processing...' : (editingId ? 'Update Type' : 'Save Type')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}