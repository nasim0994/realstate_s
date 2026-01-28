import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft, Loader2, Link as LinkIcon, PlusCircle } from 'lucide-react';
import { useAddVideoGalleryMutation, useGetVideoGalleryByIdQuery, useUpdateVideoGalleryMutation } from '@/redux/features/media/videoGalleryApi';
import { CONFIG } from '@/config';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import JoditEditor from 'jodit-react';
import { JODIT_CONFIG } from '@/config/joditConfig';

export default function VideoGalleryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const editor = useRef(null);

    const galleryKey = id ?? '__new__';

    const [localPreviewByKey, setLocalPreviewByKey] = useState<Record<string, string | null>>({});
    const [clearedRemotePreviewById, setClearedRemotePreviewById] = useState<Record<string, boolean>>({});
    const [videoUrlsByKey, setVideoUrlsByKey] = useState<Record<string, string[]>>({});
    const [currentUrl, setCurrentUrl] = useState('');

    const { data: galleryData, isSuccess } = useGetVideoGalleryByIdQuery(id!, { skip: !isEditMode });
    const [addVideoGallery, { isLoading: isCreating }] = useAddVideoGalleryMutation();
    const [updateVideoGallery, { isLoading: isUpdating }] = useUpdateVideoGalleryMutation();

    const { register, handleSubmit, reset, setValue, control } = useForm();

    const localPreview = localPreviewByKey[galleryKey] ?? null;
    const hideRemotePreview = isEditMode && !!(id && clearedRemotePreviewById[id]);
    const remotePreview =
        isEditMode && !hideRemotePreview && galleryData?.data?.image
            ? CONFIG.BASE_URL + galleryData.data.image
            : null;

    const preview = localPreview ?? remotePreview;

    const effectiveVideoUrls = videoUrlsByKey[galleryKey] ?? (galleryData?.data?.videoLinks || []);

    useEffect(() => {
        if (isEditMode && isSuccess && galleryData?.data) {
            reset(galleryData.data);
        }
    }, [isEditMode, isSuccess, galleryData, reset]);

    useEffect(() => {
        const url = localPreview;
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [localPreview]);

    const addUrlToList = () => {
        if (!currentUrl.trim()) return;
        if (!currentUrl.includes('http')) {
            toast.error("Please enter a valid URL");
            return;
        }

        const next = [...effectiveVideoUrls, currentUrl.trim()];
        setVideoUrlsByKey(prev => ({ ...prev, [galleryKey]: next }));
        setCurrentUrl('');
    };

    const removeUrl = (index: number) => {
        const next = effectiveVideoUrls.filter((_, i) => i !== index);
        setVideoUrlsByKey(prev => ({ ...prev, [galleryKey]: next }));
    };

    const onSubmit = async (data: any) => {
        if (effectiveVideoUrls?.length === 0) {
            return toast.error("Add at least one video link");
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify({ ...data, videoLinks: effectiveVideoUrls }));
        if (data.image?.[0] instanceof File) {
            formData.append('image', data.image[0]);
        }

        try {
            const res = isEditMode
                ? await updateVideoGallery({ id, data: formData }) as TResponse
                : await addVideoGallery(formData) as TResponse;

            if (res.data?.success) {
                toast.success(isEditMode ? "Video Gallery updated successfully!" : "Video Gallery created successfully!");
                navigate('/admin/media/video-gallery/all');
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-neutral">{isEditMode ? 'Edit' : 'Add'} Video Gallery</h1>
                </div>
                <button disabled={isCreating || isUpdating} type="submit" className="admin_primary_btn flex items-center gap-2">
                    {isCreating || isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Gallery
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Gallery Title</label>
                                <input type='text' {...register('title', { required: true })} className="admin_input" placeholder="Event Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Date</label>
                                <input {...register('date')} type="date" className="admin_input" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description</label>
                            <div className="rounded-xl overflow-hidden border border-slate-200">
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <JoditEditor
                                            ref={editor}
                                            config={JODIT_CONFIG}
                                            value={field.value}
                                            onBlur={(newContent) => field.onChange(newContent)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Video Links Input */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-slate-700">Add Video URLs</label>
                        <div className="flex gap-2">
                            <textarea
                                value={currentUrl}
                                onChange={(e) => setCurrentUrl(e.target.value)}
                                className="admin_input py-2 h-12 min-h-12] resize-none"
                                placeholder="Paste YouTube/Vimeo link here..."
                            />
                            <button
                                type="button"
                                onClick={addUrlToList}
                                className="px-4 bg-slate-900 text-white rounded-xl hover:bg-primary transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <PlusCircle size={18} /> Add
                            </button>
                        </div>

                        {/* URL List View */}
                        <div className="space-y-2 mt-4">
                            {effectiveVideoUrls.map((url, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><LinkIcon size={14} /></div>
                                        <span className="text-xs text-slate-600 truncate">{url}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeUrl(index)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            {effectiveVideoUrls.length === 0 && (
                                <p className="text-center py-4 text-xs text-slate-400 italic">No video links added yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-slate-700">Cover Thumbnail</label>
                        {preview ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border">
                                <img src={preview} className="w-full h-full object-cover" alt="" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLocalPreviewByKey(prev => ({ ...prev, [galleryKey]: null }));
                                        if (isEditMode && id) {
                                            setClearedRemotePreviewById(prev => ({ ...prev, [id]: true }));
                                        }
                                        setValue('image', null);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-600 rounded-full"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-xl bg-slate-50 hover:bg-white cursor-pointer transition-all border-slate-200">
                                <Upload className="text-slate-400" />
                                <span className="text-[10px] mt-2 text-slate-500 font-bold uppercase">Upload Cover</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const objectUrl = URL.createObjectURL(file);
                                            setLocalPreviewByKey(prev => ({ ...prev, [galleryKey]: objectUrl }));
                                            setValue('image', e.target.files);
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}