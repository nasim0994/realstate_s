import { CONFIG } from '@/config';
import type { TResponse } from '@/interface/globalInterface';
import type { IProject } from '@/interface/projectInterface';
import type { IProjectType } from '@/interface/projectTypeInterface';
import { useAddProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from '@/redux/features/project/projectApi';
import { useGetAllProjectTypeQuery } from '@/redux/features/projectType/projectTypeApi';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function ProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const thumbInputRef = useRef<HTMLInputElement>(null);
    const [thumbPreview, setThumbPreview] = useState<string>('');
    const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; isFile: boolean; fileRef?: File }[]>([]);
    const [fileError, setFileError] = useState<string>('');

    const { register, handleSubmit, setValue, reset } = useForm<IProject>({
        defaultValues: { status: 'upcoming' }
    });

    const { data } = useGetAllProjectTypeQuery({});
    const types = data?.data || [];

    const { data: projectData } = useGetProjectByIdQuery(id, { skip: !id });
    const initialData = projectData?.data;

    useEffect(() => {
        if (initialData) {
            const formattedData = {
                ...initialData,
                handoverDate: initialData.handoverDate ? new Date(initialData.handoverDate).toISOString().split('T')[0] : ''
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

    const [addProject, { isLoading }] = useAddProjectMutation();
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    // FORM SUBMIT LOGIC
    const onFormSubmit = async (data: IProject) => {
        const formData = new FormData();
        const thumbnail = data?.thumbnail;

        if (thumbnail instanceof File) {
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
            landArea: data.landArea,
            facing: data.facing,
            storied: data.storied,
            layout: data.layout,
            aptSize: data.aptSize,
            handoverDate: data.handoverDate,
            status: data.status,
            type: data.type,
            location: data.location,
            googleMapEmbedLink: data.googleMapEmbedLink,
            existingGalleries,
        }

        formData.append("data", JSON.stringify(info))

        try {
            if (initialData?._id) {
                const res = await updateProject({ id: initialData._id, data: formData }) as TResponse;
                if (res?.data?.success) {
                    toast.success("Project updated successfully!");
                    navigate('/admin/projects/all');
                } else {
                    toast.error(res?.error?.data?.message || "Failed to update project!");
                    console.log(res);
                }
            } else {
                const res = await addProject(formData) as TResponse;
                if (res?.data?.success) {
                    toast.success("Project added successfully!");
                    navigate('/admin/projects/all');
                } else {
                    toast.error(res?.error?.data?.message || "Failed to added project!");
                    console.log(res);
                }
            }
        } catch (error) {
            console.error("Failed to submit project:", error);
            toast.error("An error occurred while submitting the project.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">Project Details</h2>
                        {fileError && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm font-medium">{fileError}</div>}

                        <div>
                            <input type="text" {...register("title", { required: true })} placeholder="Project Title" />
                        </div>

                        <textarea {...register("description")} rows={4} className="w-full p-3 border rounded-lg mb-4" placeholder="Description"></textarea>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['landArea', 'facing', 'storied', 'layout', 'aptSize'].map((field) => (
                                <div key={field}>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">{field}</label>
                                    <input type="text" {...register(field as any)} />
                                </div>
                            ))}
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Handover Date</label>
                                <input type="date" {...register("handoverDate")} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-2 text-gray-700">Project Gallery</h2>
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
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                        <select {...register("status")}>
                            <option value="ongoing">Ongoing</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                        </select>

                        <select {...register("type")}>
                            <option value="">Select Project Type</option>
                            {
                                types?.map((type: IProjectType) => (
                                    <option key={type?._id} value={type?._id}>{type?.name}</option>
                                ))
                            }
                        </select>


                        <input {...register("location")} className="w-full p-3 border rounded-lg text-sm" placeholder="Location" />
                        <input {...register("googleMapEmbedLink")} className="w-full p-3 border rounded-lg text-xs" placeholder="Google Map Iframe/Link" />
                        <button disabled={isLoading || isUpdating} type="submit" className="flex justify-center w-full  admin_primary_btn">
                            {initialData?._id ? (isUpdating ? 'Updating...' : 'Update Project') : (isLoading ? 'Adding...' : 'Add Project')}
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
}