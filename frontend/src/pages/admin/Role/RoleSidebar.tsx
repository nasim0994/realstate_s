import { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { X, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    editingRole: any;
    permissionRoutes: string[];
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

export default function RoleSidebar({ isOpen, onClose, editingRole, permissionRoutes, onSubmit, isLoading }: Props) {
    const [isGlobalAll, setIsGlobalAll] = useState(false);

    const { register, handleSubmit, control, setValue, reset } = useForm({
        defaultValues: {
            name: '',
            permissions: [] as any[]
        }
    });

    const { fields } = useFieldArray({ control, name: "permissions" });
    const permissionsWatch = useWatch({ control, name: "permissions" });

    // Handle initial data and Reset
    useEffect(() => {
        if (isOpen) {
            const initialPermissions = permissionRoutes.map((route: string) => {
                const existing = editingRole?.permissions?.find((p: any) => p.route === route);
                return {
                    route: route,
                    all: existing?.all || false,
                    read: existing?.read || false,
                    create: existing?.create || false,
                    update: existing?.update || false,
                    delete: existing?.delete || false
                };
            });

            reset({
                name: editingRole?.name || '',
                permissions: initialPermissions
            });
        }
    }, [isOpen, editingRole, permissionRoutes, reset]);

    // Row & Global Sync Logic
    useEffect(() => {
        if (!permissionsWatch) return;
        let allRoutesFullySelected = true;

        permissionsWatch.forEach((perm: any, index: number) => {
            const isRowFullySelected = perm.read && perm.create && perm.update && perm.delete;
            if (isRowFullySelected && !perm.all) setValue(`permissions.${index}.all`, true);
            else if (!isRowFullySelected && perm.all) setValue(`permissions.${index}.all`, false);

            if (!isRowFullySelected) allRoutesFullySelected = false;
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsGlobalAll(allRoutesFullySelected && permissionsWatch.length > 0);
    }, [permissionsWatch, setValue]);

    const toggleGlobalAll = (checked: boolean) => {
        const updated = permissionsWatch.map((p: any) => ({
            ...p, all: checked, read: checked, create: checked, update: checked, delete: checked
        }));
        setValue("permissions", updated);
    };

    const toggleRowAll = (index: number, checked: boolean) => {
        const fields = ['all', 'read', 'create', 'update', 'delete'];
        fields.forEach(f => setValue(`permissions.${index}.${f}` as any, checked));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">

                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="font-bold text-lg text-neutral flex items-center gap-2">
                        <CheckCircle2 size={20} className={editingRole ? "text-blue-500" : "text-green-500"} />
                        {editingRole ? 'Update Role Settings' : 'Create New Role'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role Identity</label>
                        <input {...register("name", { required: true })} placeholder="e.g. Moderator" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="font-bold text-neutral">Route Permissions</h3>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 accent-primary" checked={isGlobalAll} onChange={(e) => toggleGlobalAll(e.target.checked)} />
                                <span className="text-xs font-bold text-primary group-hover:underline uppercase">Select All</span>
                            </label>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/40 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <ChevronRight size={14} className="text-primary" /> {(field as any).route}
                                        </span>
                                        <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase cursor-pointer hover:text-slate-600 transition-colors">
                                            <input type="checkbox" checked={permissionsWatch?.[index]?.all || false} onChange={(e) => toggleRowAll(index, e.target.checked)} className="w-3.5 h-3.5 accent-slate-800" />
                                            Full Access
                                        </label>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {['read', 'create', 'update', 'delete'].map((action) => (
                                            <label key={action} className="flex-1 min-w-25 flex items-center justify-center gap-2 cursor-pointer py-2 px-3 bg-white border border-slate-200 rounded-xl hover:border-primary/30 hover:bg-primary/2 transition-all has-checked:border-primary/50">
                                                <input type="checkbox" {...register(`permissions.${index}.${action}` as any)} className="w-4 h-4 accent-primary" />
                                                <span className="text-xs font-bold text-slate-600 capitalize">{action}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                    <button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="admin_primary_btn flex-1 py-4 justify-center shadow-lg shadow-primary/20">
                        {isLoading ? <Loader2 className="animate-spin" /> : editingRole ? 'Update Role' : 'Save New Role'}
                    </button>
                    <button onClick={onClose} className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm uppercase tracking-widest">Cancel</button>
                </div>
            </div>
        </div>
    );
}