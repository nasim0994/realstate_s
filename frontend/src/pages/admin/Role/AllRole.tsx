import { useState } from 'react';
import { Plus, Edit, Trash2, ShieldCheck } from 'lucide-react';
import { useGetAllPermissionRoutesQuery } from '@/redux/features/role/permissionRouteApi';
import { useAddRoleMutation, useDeleteRoleMutation, useGetAllRoleQuery, useUpdateRoleMutation } from '@/redux/features/role/roleApi';
import RoleSidebar from './RoleSidebar';
import toast from 'react-hot-toast';
import type { IRole } from '@/interface/roleInterface';

export default function AllRole() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<any>(null);

    const { data: routeData } = useGetAllPermissionRoutesQuery({});
    const permissionRoutes = routeData?.data || [];

    const { data: roleData } = useGetAllRoleQuery({});
    const roles = roleData?.data || [];

    const [addRole, { isLoading: isAdding }] = useAddRoleMutation();
    const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
    const [deleteRole] = useDeleteRoleMutation();

    const handleOpenSidebar = (role: any = null) => {
        setEditingRole(role);
        setIsSidebarOpen(true);
    };

    const handleFormSubmit = async (data: any) => {
        try {
            const res = editingRole
                ? await updateRole({ id: editingRole._id, data }).unwrap()
                : await addRole(data).unwrap();

            if (res?.success) {
                toast.success(editingRole ? "Role updated!" : "Role created!");
                setIsSidebarOpen(false);
            } else {
                toast.error(res?.message || "Operation failed");
                console.log(res);

            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Operation failed");
            console.log(error);

        }
    };

    const handleDeleteRole = async (roleId: string) => {
        if (!confirm("Are you sure you want to delete this role?")) return;
        try {
            const res = await deleteRole(roleId).unwrap();

            if (res?.success) {
                toast.success("Role deleted!");
            } else {
                toast.error(res?.message || "Deletion failed");
                console.log(res);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Deletion failed");
            console.log(error);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/5 text-primary rounded-xl"><ShieldCheck size={24} /></div>
                    <div>
                        <h1 className="text-xl font-bold text-neutral font-header">Roles & Permissions</h1>
                        <p className="text-slate-500 text-xs">Define what your team can see and do.</p>
                    </div>
                </div>
                <button onClick={() => handleOpenSidebar()} className="admin_primary_btn"><Plus size={18} /> New Role</button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th>SL</th>
                            <th>Role Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {roles.map((role: IRole, index: number) => (
                            <tr key={role?._id} className="group hover:bg-slate-50/80 transition-all">
                                <td>{String(index + 1).padStart(2, '0')}</td>
                                <td>
                                    <span className="px-3 py-1 bg-primary/3 text-primary whitespace-nowrap rounded-full text-xs font-bold">{role?.name}</span>
                                </td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleOpenSidebar(role)} className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl shadow-sm transition-all"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteRole(role?._id)} className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-100 rounded-xl shadow-sm transition-all"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <RoleSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                editingRole={editingRole}
                permissionRoutes={permissionRoutes}
                onSubmit={handleFormSubmit}
                isLoading={isAdding || isUpdating}
            />
        </div>
    );
}