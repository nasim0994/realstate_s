import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { CONFIG } from '@/config';
import { useAddChairmanQuoteMutation, useGetChairmanQuoteByIdQuery, useUpdateChairmanQuoteMutation } from '@/redux/features/media/chairmanQuoteApi';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import JoditEditor from 'jodit-react';
import { JODIT_CONFIG } from '@/config/joditConfig';

export default function ChairmanQuoteForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const [hideServerPreview, setHideServerPreview] = useState(false);

    const { data: quoteData, isSuccess } = useGetChairmanQuoteByIdQuery(id!, { skip: !isEditMode });
    const [addChairmanQuote, { isLoading: isCreating }] = useAddChairmanQuoteMutation();
    const [updateChairmanQuote, { isLoading: isUpdating }] = useUpdateChairmanQuoteMutation();

    const { register, handleSubmit, reset, setValue, control } = useForm();

    const serverPreview =
        !hideServerPreview && isEditMode && isSuccess && quoteData?.data?.image
            ? CONFIG.BASE_URL + quoteData.data.image
            : null;

    const preview = localPreview ?? serverPreview;

    useEffect(() => {
        if (isEditMode && isSuccess && quoteData?.data) {
            reset(quoteData.data);
        }
    }, [isEditMode, isSuccess, quoteData, reset]);

    // Cleanup any blob URLs created for local previews.
    useEffect(() => {
        return () => {
            if (localPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(localPreview);
            }
        };
    }, [localPreview]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        if (data.image?.[0] instanceof File) {
            formData.append('image', data.image[0]);
        }

        try {
            const res = isEditMode
                ? await updateChairmanQuote({ id, data: formData }) as TResponse
                : await addChairmanQuote(formData) as TResponse;

            if (res.data?.success) {
                toast.success(isEditMode ? "Chairman Quote updated successfully!" : "Chairman Quote created successfully!");
                navigate('/admin/media/chairman-quote/all');
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

    const isPending = isCreating || isUpdating;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Form Header */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-neutral">{isEditMode ? 'Edit' : 'Add'} Chairman Quote</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Quote Title</label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                placeholder="e.g. Message from Chairman"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Quote Description</label>
                            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                                <Controller
                                    name="description"
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
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-slate-700">Image</label>
                        {preview ? (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-100">
                                <img src={preview} className="w-full h-full object-cover" alt="" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (localPreview) {
                                            if (localPreview.startsWith('blob:')) {
                                                URL.revokeObjectURL(localPreview);
                                            }
                                            setLocalPreview(null);
                                        } else {
                                            setHideServerPreview(true);
                                        }
                                        setValue('image', null);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-2xl bg-slate-50 hover:bg-white cursor-pointer transition-all border-slate-200">
                                <Upload className="text-slate-400" />
                                <span className="text-[10px] mt-2 text-slate-500 font-bold uppercase">Upload Photo</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const objectUrl = URL.createObjectURL(file);
                                            setLocalPreview(objectUrl);
                                            setHideServerPreview(false);
                                            setValue('image', e.target.files);
                                        }
                                    }}
                                />
                            </label>
                        )}
                        <p className="text-[10px] text-slate-400 text-center">Square size (1:1) is recommended.</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
                        <button disabled={isPending} type="submit" className="admin_primary_btn w-full flex items-center justify-center gap-2">
                            {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {isEditMode ? 'Update Quote' : 'Publish Quote'}
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="w-full py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}