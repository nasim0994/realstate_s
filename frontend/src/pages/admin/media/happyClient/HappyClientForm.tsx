import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft, Loader2, Star } from 'lucide-react';
import { CONFIG } from '@/config';
import { useAddHappyClientMutation, useGetHappyClientByIdQuery, useUpdateHappyClientMutation } from '@/redux/features/media/happyClientApi';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';

export default function HappyClientForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [preview, setPreview] = useState<string | null>(null);
    const [rating, setRating] = useState(0);

    const { data: clientData, isSuccess } = useGetHappyClientByIdQuery(id!, { skip: !isEditMode });
    const [addHappyClient, { isLoading: isCreating }] = useAddHappyClientMutation();
    const [updateHappyClient, { isLoading: isUpdating }] = useUpdateHappyClientMutation();

    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (isEditMode && isSuccess && clientData?.data) {
            reset(clientData.data);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRating(clientData.data.rating);
            setPreview(CONFIG.BASE_URL + clientData.data.image);
        }
    }, [isEditMode, isSuccess, clientData, reset]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ ...data, rating }));
        if (data?.image?.[0] instanceof File) {
            formData.append('image', data?.image[0]);
        }

        try {
            const res = isEditMode
                ? await updateHappyClient({ id, data: formData }) as TResponse
                : await addHappyClient(formData) as TResponse;

            if (res.data?.success) {
                toast.success(isEditMode ? "Happy Client updated successfully!" : "Happy Client created successfully!");
                navigate('/admin/media/review/all');
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
                    <button type="button" onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ArrowLeft size={20} /></button>
                    <h1 className="text-lg font-bold text-neutral">{isEditMode ? 'Edit' : 'Add'} Happy Client</h1>
                </div>
                <button disabled={isCreating || isUpdating} type="submit" className="admin_primary_btn flex items-center gap-2">
                    {isCreating || isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Client Name</label>
                                <input type="text" {...register('name', { required: true })} className="admin_input" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Profession</label>
                                <input type="text" {...register('profession', { required: true })} className="admin_input" placeholder="e.g. Banker" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Youtube Video Url</label>
                            <input type="text" {...register('videoLink')} className="admin_input" placeholder="YouTube URL" />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Rating</label>
                            <div className="flex gap-2 p-2 bg-slate-50 rounded-xl w-fit border border-slate-100">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button key={num} type="button" onClick={() => setRating(num)} className="transition-all hover:scale-110">
                                        <Star size={24} fill={num <= rating ? "#fbbf24" : "none"} className={num <= rating ? "text-amber-400" : "text-slate-300"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Client Review</label>
                            <textarea {...register('review', { required: true })} rows={5} className="admin_input py-3" placeholder="What the client said..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-slate-700">Client Photo</label>
                        {preview ? (
                            <div className="relative aspect-video rounded-2xl overflow-hidden border">
                                <img src={preview} className="w-full h-full object-cover" alt="" />
                                <button type="button" onClick={() => { setPreview(null); setValue('image', null); }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full"><X size={14} /></button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-2xl bg-slate-50 hover:bg-white cursor-pointer transition-all">
                                <Upload className="text-slate-400" />
                                <span className="text-[10px] mt-2 text-slate-500 font-bold uppercase">Upload Photo</span>
                                <input type="file" className="hidden" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
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