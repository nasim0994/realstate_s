import { useState, useEffect } from 'react';
import { Upload, X, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetAllConcernsQuery } from '@/redux/features/concerns/concernsApi';
import type { IConcerns } from '@/interface/concernsInterface';
import {
    useAddConcernProductMutation,
    useGetConcernProductByIdQuery,
    useUpdateConcernProductMutation
} from '@/redux/features/concerns/concernProductApi';
import toast from 'react-hot-toast';
import { CONFIG } from '@/config';
import type { TResponse } from '@/interface/globalInterface';


interface IProductForm {
    title: string;
    concern: string;
    description: string;
    image: FileList | null;
}

export default function ConcernProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [preview, setPreview] = useState<string | null>(null);
    const API_URL = CONFIG.BASE_URL;

    // React Hook Form setup
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<IProductForm>();

    // API Queries
    const { data: productData, isSuccess: isProductLoaded } = useGetConcernProductByIdQuery(id!, { skip: !isEditMode });
    const { data: concernsData } = useGetAllConcernsQuery({});
    const concerns = concernsData?.data || [];

    // Mutations
    const [addConcernProduct, { isLoading: isCreating }] = useAddConcernProductMutation();
    const [updateConcernProduct, { isLoading: isUpdating }] = useUpdateConcernProductMutation();


    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (isEditMode && isProductLoaded && productData?.data) {
            const product = productData.data;
            reset({
                title: product.title,
                concern: product.concern?._id || product.concern,
                description: product.description,
            });

            const nextPreview = product.image ? API_URL + product.image : null;
            timeoutId = setTimeout(() => setPreview(nextPreview), 0);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isEditMode, isProductLoaded, productData, reset, API_URL]);

    // 2. Image preview handler
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue('image', e.target.files);
        }
    };

    // 3. Form Submission
    const onSubmit = async (data: IProductForm) => {
        const loadingToast = toast.loading(isEditMode ? "Updating product..." : "Creating product...");

        try {
            const formData = new FormData();

            const info = {
                title: data.title,
                concern: data.concern,
                description: data.description,
            };

            formData.append('data', JSON.stringify(info));
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            }

            if (isEditMode) {
                const res = await updateConcernProduct({ id, data: formData }) as TResponse;
                if (res?.data?.success) {
                    toast.success("Product updated successfully", { id: loadingToast });
                    navigate('/admin/about/concerns/product/all');
                } else {
                    toast.error(res?.error?.data?.message || "Something went wrong", { id: loadingToast });
                    console.log(res);
                }
            } else {
                const res = await addConcernProduct(formData) as TResponse;
                if (res?.data?.success) {
                    toast.success("Product created successfully", { id: loadingToast });
                    navigate('/admin/about/concerns/product/all');
                } else {
                    toast.error(res?.error?.data?.message || "Something went wrong", { id: loadingToast });
                    console.log(res);
                }
            }

        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong", { id: loadingToast });
        }
    };

    const isPending = isCreating || isUpdating;

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-neutral">{isEditMode ? 'Edit' : 'Add New'} Product</h1>
                        <p className="text-slate-500 text-[11px]">Fill in the details below to save the product.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left Side: Basic Info */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Product Title</label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                type="text"
                                className={`admin_input ${errors.title ? 'border-red-500' : ''}`}
                                placeholder="Enter product title..."
                            />
                            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Select Concern</label>
                            <select
                                {...register('concern', { required: 'Please select a concern' })}
                                className={`admin_input bg-white cursor-pointer ${errors.concern ? 'border-red-500' : ''}`}
                            >
                                <option value="">Choose a concern</option>
                                {concerns?.map((c: IConcerns) => (
                                    <option key={c?._id} value={c?._id}>{c?.name}</option>
                                ))}
                            </select>
                            {errors.concern && <p className="text-red-500 text-xs">{errors.concern.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Description</label>
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                rows={6}
                                className={`admin_input py-3 ${errors.description ? 'border-red-500' : ''}`}
                                placeholder="Write product details..."
                            />
                            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Upload & Actions */}
                <div className="space-y-5">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                        <label className="text-sm font-semibold text-slate-700">Product Image</label>

                        {preview ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreview(null);
                                        setValue('image', null);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 hover:border-primary/40 transition-all cursor-pointer group">
                                <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Upload size={20} className="text-primary" />
                                </div>
                                <p className="text-[11px] text-slate-500 mt-3 font-medium">Click to upload image</p>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                        <p className="text-[10px] text-slate-400 text-center italic">Recommended: 800x600px (PNG/JPG)</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
                        <button
                            disabled={isPending}
                            type="submit"
                            className="admin_primary_btn w-full flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {isEditMode ? 'Update' : 'Publish'} Product
                        </button>
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => navigate(-1)}
                            className="w-full py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
                        >
                            Discard Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}