import { useEffect, useRef } from 'react';
import { Controller, useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { Save, Loader2, Info, Type, Image as ImageIcon, Plus, ListChecks, X } from 'lucide-react';
import FileUploadField from '@/utils/fileUploadField';
import { useAddAboutMutation, useGetAboutQuery, useUpdateAboutMutation } from '@/redux/features/about/aboutApi';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import JoditEditor from 'jodit-react';
import { JODIT_CONFIG } from '@/config/joditConfig';

export default function About() {
    const editor = useRef(null);
    const { register, handleSubmit, watch, setValue, control, reset, formState: { errors } } = useForm<any>();

    const { data, isLoading: isFetching } = useGetAboutQuery({});
    const about = data?.data;
    const id = about?._id;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ourConcerns"
    });

    // Load existing data
    useEffect(() => {
        if (about) {
            reset({
                title: about?.title,
                subTitle: about?.subTitle,
                description: about?.description,
                bigImage: about?.bigImage,
                smallImage: about?.smallImage,
                ourConcerns: about?.ourConcerns?.length > 0 ? about?.ourConcerns : ['']
            });
        }
    }, [about, reset]);

    const [addAbout, { isLoading: isAdding }] = useAddAboutMutation();
    const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();

    const onSubmit: SubmitHandler<any> = async (data) => {

        // check image
        if (!data.bigImage?.[0] && !about?.bigImage) {
            return toast.error("Big Image is required");
        }

        if (!data.smallImage?.[0] && !about?.smallImage) {
            return toast.error("Small Image is required");
        }

        // check file size
        if (data.bigImage?.[0] && data.bigImage[0].size > 1 * 1024 * 1024 || data.smallImage?.[0] && data.smallImage[0].size > 1 * 1024 * 1024) {
            return toast.error("Image size should be less than 1MB");
        }


        const filteredConcerns = data.ourConcerns.filter((val: string) => val.trim() !== "");

        const formData = new FormData();
        const info = {
            title: data.title,
            subTitle: data.subTitle,
            description: data.description,
            ourConcerns: filteredConcerns
        };

        formData.append('data', JSON.stringify(info));

        // Handle Big Image
        if (data.bigImage?.[0] instanceof File) {
            formData.append('bigImage', data.bigImage[0]);
        }

        // Handle Small Image
        if (data.smallImage?.[0] instanceof File) {
            formData.append('smallImage', data.smallImage[0]);
        }

        try {
            if (id) {
                const res = (await updateAbout({ id, data: formData })) as TResponse;
                if (res?.data?.success) {
                    toast.success("About updated successfully");
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
            } else {
                const res = (await addAbout(formData)) as TResponse;
                if (res?.data?.success) {
                    toast.success("About added successfully");
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
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update about section");
        }
    };

    if (isFetching) {
        return (
            <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="font-medium animate-pulse">Loading About Settings...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Info size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">About Section</h1>
                        <p className="text-slate-500 text-xs mt-1">Manage the main about us content on your homepage.</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isUpdating || isAdding}
                    className="admin_primary_btn"
                >
                    {isUpdating || isAdding ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isUpdating || isAdding ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                {/* Left: Images */}
                <div className="lg:col-span-4 space-y-3">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm mb-6 border-b border-slate-50 pb-4">
                            <ImageIcon size={18} className="text-primary" /> Media Assets
                        </h3>

                        <div className="space-y-8">
                            <FileUploadField
                                label="Big Banner Image"
                                name="bigImage"
                                watch={watch}
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                maxSize={2}
                            />

                            <FileUploadField
                                label="Small Foreground Image"
                                name="smallImage"
                                watch={watch}
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                maxSize={1}
                            />
                        </div>
                    </div>



                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
                        <div className="flex items-center justify-between pb-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-[13px] uppercase tracking-wider">
                                <ListChecks size={18} className="text-primary" /> Our Concerns
                            </h3>
                            <button
                                type="button"
                                onClick={() => append('')}
                                className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {fields?.map((field, index) => (
                                <div key={field?.id} className="flex items-center gap-2 group">
                                    <input
                                        type="text"
                                        {...register(`ourConcerns.${index}`)}
                                        placeholder="Type concern name..."
                                    />
                                    {fields?.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm mb-2 border-b border-slate-50 pb-4">
                            <Type size={18} className="text-primary" /> Content Details
                        </h3>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label>Sub Title</label>
                                    <input
                                        type="text"
                                        {...register("subTitle")}
                                        placeholder="e.g. WHO WE ARE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label>Main Title</label>
                                    <input
                                        type="text"
                                        {...register("title", { required: "Title is required" })}
                                        placeholder="Enter about title"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label >
                                    Description
                                </label>
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
                    </div>
                </div>
            </div>
        </form>
    );
}