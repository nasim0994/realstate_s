import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Save, ArrowLeft, User, Briefcase, Hash, Type, AlignLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileUploadField from '@/utils/fileUploadField';
import JoditEditor from 'jodit-react';
import { useAddManagementMutation, useGetManagementByIdQuery, useUpdateManagementMutation } from '@/redux/features/management/managementApi';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import { JODIT_CONFIG } from '@/config/joditConfig';

export default function ManagementForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const { data: managementData } = useGetManagementByIdQuery(id, { skip: !isEdit });
    const [addManagement, { isLoading: isAdding }] = useAddManagementMutation();
    const [updateManagement, { isLoading: isUpdating }] = useUpdateManagementMutation();

    const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm<any>();

    useEffect(() => {
        if (isEdit && managementData?.data) {
            reset(managementData.data);
        }
    }, [managementData, reset, isEdit]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        const info = {
            name: data.name,
            designation: data.designation,
            order: Number(data.order),
            subTitle: data.subTitle,
            title: data.title,
            message: data.message
        };

        formData.append('data', JSON.stringify(info));
        if (data.image?.[0] instanceof File) {
            formData.append('image', data.image[0]);
        }

        try {
            const res = isEdit
                ? await updateManagement({ id, data: formData }) as TResponse
                : await addManagement(formData) as TResponse;

            if (res?.data?.success) {
                toast.success(isEdit ? "Updated successfully!" : "Added successfully!");
                navigate('/admin/about/management/all');
            } else {
                toast.error(res?.error?.data?.message || "Process failed!");
                console.log(res);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "something went wrong!");
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to="/admin/about/management/all" className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-primary transition-all"><ArrowLeft size={20} /></Link>
                    <h1 className="text-xl font-bold text-slate-900">{isEdit ? 'Edit Management' : 'Add Management'}</h1>
                </div>
                <button type="submit" disabled={isAdding || isUpdating} className="admin_primary_btn">
                    <Save size={18} /> {isEdit ? 'Update Management' : 'Save Management'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="lg:col-span-4 space-y-3">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                        <FileUploadField label="Photo" name="image" watch={watch} register={register} errors={errors} setValue={setValue} required={!isEdit} maxSize={1} />
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><User size={14} /> Name</label>
                            <input type="text" {...register("name", { required: true })} placeholder="Full Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Briefcase size={14} /> Designation</label>
                            <input type="text" {...register("designation", { required: true })} placeholder="Position" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Hash size={14} /> Sort Order</label>
                            <input type="number" {...register("order")} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-3">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2"><Type size={14} /> Subtitle</label>
                                <input type="text" {...register("subTitle", { required: "Subtitle is required" })} placeholder="e.g. Message From CEO" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2"><Type size={14} /> Title</label>
                                <input type="text" {...register("title", { required: "Title is required" })} placeholder="Main Highlight Title" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><AlignLeft size={14} /> Management Message</label>
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                                <Controller
                                    name="message"
                                    control={control}
                                    render={({ field }) => (
                                        <JoditEditor value={field.value} config={JODIT_CONFIG} onBlur={newContent => field.onChange(newContent)} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}