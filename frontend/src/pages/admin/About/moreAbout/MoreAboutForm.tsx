import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Save, ArrowLeft, Type, AlignLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileUploadField from '@/utils/fileUploadField';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import { JODIT_CONFIG } from '@/config/joditConfig';
import JoditEditor from 'jodit-react';
import { useAddMoreAboutMutation, useGetMoreAboutByIdQuery, useUpdateMoreAboutMutation } from '@/redux/features/moreAbout/moreAboutApi';

export default function MoreAboutForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const { data: moreAboutData, isLoading: isFetching } = useGetMoreAboutByIdQuery(id, { skip: !id });
    const [addMoreAbout, { isLoading: isCreating }] = useAddMoreAboutMutation();
    const [updateMoreAbout, { isLoading: isUpdating }] = useUpdateMoreAboutMutation();

    const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm();

    useEffect(() => {
        if (isEditMode && moreAboutData?.data) {
            reset(moreAboutData?.data);
        }
    }, [moreAboutData, reset, isEditMode]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        const info = {
            title: data.title,
            content: data.content,
        };

        formData.append('data', JSON.stringify(info));
        if (data.icon?.[0] instanceof File) {
            formData.append('icon', data.icon[0]);
        }

        try {
            const res = isEditMode
                ? await updateMoreAbout({ id, data: formData }) as TResponse
                : await addMoreAbout(formData) as TResponse;

            if (res.data?.success) {
                toast.success(isEditMode ? "More About updated successfully!" : "More About created successfully!");
                navigate('/admin/about/more/all');
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
        } catch (error: any) {
            toast.error(error?.data?.message || "something went wrong!");
            console.log(error);
        }
    };

    if (isFetching) return <div className="p-10 text-center font-bold animate-pulse">Loading About...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link to="/admin/about/more/all" className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold text-neutral">{isEditMode ? 'Edit More About' : 'Add More About'}</h1>
                </div>
                <button type="submit" disabled={isCreating || isUpdating} className="admin_primary_btn min-w-35">
                    <Save size={18} /> {isEditMode ? 'Update More About' : 'Publish More About'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Type size={14} />Title</label>
                            <input type="text" {...register("title", { required: true })} placeholder="Enter catchy title..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><AlignLeft size={14} /> Content</label>
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field }) => (
                                        <JoditEditor value={field.value} config={JODIT_CONFIG} onBlur={newContent => field.onChange(newContent)} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-4">
                        <h3 className="font-bold text-sm text-neutral border-b pb-3">Icon</h3>
                        <FileUploadField name="icon" watch={watch} register={register} errors={errors} setValue={setValue} maxSize={1} />
                    </div>
                </div>
            </div>
        </form>
    );
}