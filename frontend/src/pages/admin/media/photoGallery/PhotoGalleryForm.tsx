import { CONFIG } from '@/config';
import type { TResponse } from '@/interface/globalInterface';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { JODIT_CONFIG } from '@/config/joditConfig';
import type { IPhotoGallery } from '@/interface/photoGalleryInterface';
import { useAddPhotoGalleryMutation, useGetPhotoGalleryByIdQuery, useUpdatePhotoGalleryMutation } from '@/redux/features/media/photoGalleryApi';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function PhotoGalleryForm() {
    const { id } = useParams();
    const editor = useRef(null);
    const navigate = useNavigate();
    const thumbInputRef = useRef<HTMLInputElement>(null);
    const [thumbPreview, setThumbPreview] = useState<string>('');
    const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; isFile: boolean; fileRef?: File }[]>([]);
    const [fileError, setFileError] = useState<string>('');

    const { register, handleSubmit, setValue, reset, control } = useForm<IPhotoGallery>({});


    const { data } = useGetPhotoGalleryByIdQuery(id, { skip: !id });
    const initialData = data?.data;

    useEffect(() => {
        if (initialData) {
            const formattedData = {
                ...initialData,
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : ''
            };
            reset(formattedData);

            // 2. Thumbnail preview with BASE_URL
            if (typeof initialData.thumbnail === 'string') {
                const thumbPath = initialData.thumbnail.startsWith('http')
                    ? initialData.thumbnail
                    : `${CONFIG.BASE_URL}/${initialData.thumbnail}`;
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setThumbPreview(thumbPath);
            }

            // 3. Gallery previews with BASE_URL
            if (initialData.galleries) {
                const initialGals = (initialData.galleries as string[]).map(url => ({
                    url: url.startsWith('http') ? url : `${CONFIG.BASE_URL}/${url}`,
                    isFile: false
                }));
                setGalleryPreviews(initialGals);
            }
        }
    }, [initialData, reset]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError('');
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > MAX_FILE_SIZE) {
                setFileError('Thumbnail size must be less than 2MB');
                return;
            }
            setValue('thumbnail', file as any);
            setThumbPreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError('');
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const largeFiles = filesArray.filter(f => f.size > MAX_FILE_SIZE);
            if (largeFiles.length > 0) {
                setFileError('Some gallery images exceed 2MB limit');
                return;
            }

            const newPreviews = filesArray.map((file) => ({
                url: URL.createObjectURL(file),
                isFile: true,
                fileRef: file
            }));
            setGalleryPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const [addPhotoGallery, { isLoading }] = useAddPhotoGalleryMutation();
    const [updatePhotoGallery, { isLoading: isUpdating }] = useUpdatePhotoGalleryMutation();

    // FORM SUBMIT LOGIC
    const onFormSubmit = async (data: IPhotoGallery) => {
        const formData = new FormData();

        const isFile = (value: unknown): value is File =>
            typeof File !== 'undefined' &&
            typeof value === 'object' &&
            value !== null &&
            value instanceof File;

        const thumbnail = data?.thumbnail;

        if (isFile(thumbnail)) {
            formData.append('thumbnail', thumbnail);
        } else if (typeof thumbPreview === 'string') {
            const originalPath = thumbPreview.replace(`${CONFIG.BASE_URL}/`, '');
            formData.append('thumbnail', originalPath);
        }



        //  Gallery Logic for Submit
        const existingGalleries: string[] = [];
        galleryPreviews.forEach(item => {
            if (!item.isFile) {
                const originalPath = item.url.replace(`${CONFIG.BASE_URL}/`, '');
                existingGalleries.push(originalPath);
            } else if (item.fileRef) {
                formData.append('gallery', item.fileRef);
            }
        });

        const info = {
            title: data.title,
            description: data.description,
            date: data.date,
            location: data.location,
            existingGalleries,
        }

        formData.append("data", JSON.stringify(info))

        try {
            if (initialData?._id) {
                const res = await updatePhotoGallery({ id: initialData._id, data: formData }) as TResponse;
                if (res?.data?.success) {
                    toast.success("Photo Gallery updated successfully!");
                    navigate('/admin/media/gallery/all');
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
                const res = await addPhotoGallery(formData) as TResponse;
                if (res?.data?.success) {
                    toast.success("Photo Gallery added successfully!");
                    navigate('/admin/media/gallery/all');
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
        } catch (error) {
            console.error("Failed to submit Photo Gallery:", error);
            toast.error("An error occurred while submitting the Photo Gallery.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">Photo Gallery Details</h2>
                        {fileError && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm font-medium">{fileError}</div>}

                        <div>
                            <input type="text" {...register("title", { required: true })} placeholder="Photo Gallery Title" />
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2">Date</label>
                                <input type="date" {...register("date")} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2">Location</label>
                                <input type="text" {...register("location")} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-2 text-gray-700">Galleries</h2>
                        <p className="text-xs text-gray-400 mb-4 font-medium">Max size per image: 2MB</p>

                        <div onClick={() => document.getElementById('gallery-input')?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition">
                            <span className="text-gray-500 font-medium">+ Add Images</span>
                            <input id="gallery-input" type="file" multiple onChange={handleGalleryChange} className="hidden" accept="image/*" />
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                            {galleryPreviews.map((item, i) => (
                                <div key={i} className="relative group h-24 w-full">
                                    <img src={item.url} className="h-full w-full object-cover rounded-lg border" alt="Gallery" />
                                    <button type="button" onClick={() => removeGalleryImage(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-lg opacity-0 group-hover:opacity-100 transition">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2" htmlFor="description">
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

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">Thumbnail (Max 2MB)</h2>
                        <div onClick={() => thumbInputRef.current?.click()}
                            className="relative h-48 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:border-blue-400 transition">
                            {thumbPreview ? (
                                <img src={thumbPreview} className="w-full h-full object-cover" alt="Thumb" />
                            ) : (
                                <span className="text-gray-400 text-sm font-medium italic text-center px-4">Click to upload cover image</span>
                            )}
                            <input ref={thumbInputRef} type="file" onChange={handleThumbnailChange} className="hidden" accept="image/*" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <button disabled={isLoading || isUpdating} type="submit" className="flex justify-center w-full  admin_primary_btn">
                            {initialData?._id ? (isUpdating ? 'Updating...' : 'Update Gallery') : (isLoading ? 'Adding...' : 'Add Gallery')}
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
}