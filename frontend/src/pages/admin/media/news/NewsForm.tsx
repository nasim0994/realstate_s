import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAddNewsMutation, useGetNewsByIdQuery, useUpdateNewsMutation } from '@/redux/features/media/newsApi';
import JoditEditor from 'jodit-react';
import { JODIT_CONFIG } from '@/config/joditConfig';
import type { TResponse } from '@/interface/globalInterface';

export default function NewsForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const { register, handleSubmit, reset, setValue, control } = useForm();

    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
    const [isPreviewCleared, setIsPreviewCleared] = useState(false);

    const { data: newsData, isSuccess } = useGetNewsByIdQuery(id!, { skip: !isEditMode });
    const [addNews, { isLoading: isCreating }] = useAddNewsMutation();
    const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();

    const serverPreviewUrl = isEditMode ? (newsData?.data?.image ?? null) : null;
    const preview = isPreviewCleared ? null : (localPreviewUrl ?? serverPreviewUrl);

    useEffect(() => {
        if (isEditMode && isSuccess && newsData?.data) {
            reset(newsData.data);
        }
    }, [isEditMode, isSuccess, newsData, reset]);

    useEffect(() => {
        if (!localPreviewUrl) return;

        return () => {
            URL.revokeObjectURL(localPreviewUrl);
        };
    }, [localPreviewUrl]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();


        formData.append('data', JSON.stringify(data));
        if (data.image?.[0] instanceof File) {
            formData.append('image', data.image[0]);
        }

        try {
            const res = isEditMode
                ? await updateNews({ id, data }) as TResponse
                : await addNews(formData) as TResponse;

            if (res.data?.success) {
                toast.success(isEditMode ? "News updated successfully!" : "News created successfully!");
                navigate('/admin/media/news/all');
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container space-y-3">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-neutral">{isEditMode ? 'Edit' : 'Add'} News Article</h1>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 text-sm font-bold text-slate-500">Cancel</button>
                    <button disabled={isCreating || isUpdating} type="submit" className="admin_primary_btn flex items-center gap-2">
                        {isCreating || isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save News
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Headline</label>
                                <input type="text" {...register('title', { required: true })} placeholder="News title..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">News Type</label>
                                <select {...register('type', { required: true })} className="admin_input bg-white">
                                    <option value="">Select News Type</option>
                                    <option value="press">Press Release</option>
                                    <option value="online">Online News</option>
                                    <option value="tv">TV News</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Media Name</label>
                                <input type="text" {...register('mediaName', { required: true })} placeholder="e.g. Prothom Alo" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">News Date</label>
                                <input type="date" {...register('date', { required: true })} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">News Link</label>
                                <input type="text" {...register('newsLink')} placeholder="e.g. https://newswebsite.com/article" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Youtube Video Link</label>
                                <input type="text" {...register('videoLink')} placeholder="e.g. https://youtube.com/video" />
                            </div>
                        </div>
                    </div>


                    {/* description */}
                    <div className="bg-base-100 p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                        <label className="text-sm font-bold text-slate-700 mb-2">Description</label>
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

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-slate-700">Featured Image</label>
                        {preview ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border">
                                <img src={preview} className="w-full h-full object-cover" alt="" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLocalPreviewUrl(null);
                                        setIsPreviewCleared(true);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-xl bg-slate-50 hover:bg-white cursor-pointer transition-all">
                                <Upload className="text-slate-400" />
                                <span className="text-[10px] mt-2 text-slate-500">Upload Media Clipping</span>
                                <input type="file" className="hidden" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setIsPreviewCleared(false);
                                        setLocalPreviewUrl(URL.createObjectURL(file));
                                        setValue('image', e.target.files);
                                    }
                                }} />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}