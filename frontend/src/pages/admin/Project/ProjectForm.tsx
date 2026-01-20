import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Map as MapIcon, Calendar, Maximize, AlignLeft, LayoutPanelLeft, Building2, Compass } from 'lucide-react';
import { useAddProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from '@/redux/features/project/projectApi';
import FileUploadField from '@/utils/fileUploadField';
import toast from 'react-hot-toast';
import { useGetAllProjectTypeQuery } from '@/redux/features/projectType/projectTypeApi';
import JoditEditor from 'jodit-react';
import { JODIT_CONFIG } from '@/config/joditConfig';
import Galleries from '@/components/modules/admin/project/Galleries';

export default function ProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm();

    const [galleries, setGalleries] = useState<{ name: string; file: File }[]>([]);
    const [galleriesUrl, setGalleriesUrl] = useState<string[]>([]);

    const { data: projectData, isLoading: isFetching } = useGetProjectByIdQuery(id, { skip: !id });
    const { data: typesData } = useGetAllProjectTypeQuery({});
    const [addProject, { isLoading: isCreating }] = useAddProjectMutation();
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

    useEffect(() => {
        if (isEditMode && projectData?.data) {
            reset(projectData.data);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setGalleriesUrl(projectData.data.galleries || []);
        }
    }, [projectData, reset, isEditMode]);


    useEffect(() => {
        if (isEditMode && projectData?.data) reset(projectData.data);
    }, [projectData, reset, isEditMode]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        const info = { ...data };
        delete info.thumbnail;
        delete info.galleries;

        formData.append('data', JSON.stringify(info));
        if (data.thumbnail?.[0] instanceof File) formData.append('thumbnail', data.thumbnail[0]);
        if (data.galleries?.length) {
            Array.from(data.galleries).forEach((file: any) => formData.append('galleries', file));
        }

        try {
            const res = isEditMode
                ? await updateProject({ id, data: formData }).unwrap()
                : await addProject(formData).unwrap();

            if (res?.data?.success) {
                toast.success(isEditMode ? "Project updated successfully!" : "Project created successfully!");
                navigate('/admin/project/all');
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
            toast.error(error?.data?.message || (isEditMode ? "Failed to update project!" : "Failed to create project!"));
            console.log(error);
        }
    };

    if (isFetching) return <div className="p-10 text-center font-bold">Loading...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Form Header */}
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link to="/admin/project/all" className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={20} /></Link>
                    <h1 className="text-xl font-bold text-neutral">{isEditMode ? 'Edit Project' : 'New Project Listing'}</h1>
                </div>
                <button type="submit" disabled={isCreating || isUpdating} className="admin_primary_btn min-w-37.5">
                    <Save size={18} /> {isEditMode ? 'Update' : 'Publish'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Project Title</label>
                            <input type='text' {...register("title", { required: true })} placeholder="e.g. Skyline Apartments" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Property Status</label>
                                <select {...register("status")} className="w-full px-4 py-3 rounded-2xl border border-slate-200">
                                    <option value="ongoing">Ongoing</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Project Type</label>
                                <select {...register("type")} className="w-full px-4 py-3 rounded-2xl border border-slate-200">
                                    {typesData?.data?.map((t: any) => (
                                        <option key={t._id} value={t._id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><MapIcon size={14} /> Location</label>
                                <input type="text" {...register("location")} placeholder="Dhaka, Bangladesh" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Maximize size={14} /> Land Area</label>
                                <input type="text" {...register("landArea")} placeholder="10 Katha" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Maximize size={14} /> Apt Size</label>
                                <input type="text" {...register("aptSize")} placeholder="1200 - 2500 sqft" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Compass size={14} />Facing</label>
                                <input type="text" {...register("facing")} placeholder="Dhaka, Bangladesh" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Building2 size={14} />Storied</label>
                                <input type="text" {...register("storied")} placeholder="10 Katha" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><LayoutPanelLeft size={14} />Layout</label>
                                <input type="text" {...register("layout")} placeholder="10 Katha" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Calendar size={14} /> Handover Date</label>
                                <input type="date" {...register("handoverDate")} />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sidebar: Media & Type */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-4">
                        <h3 className="font-bold text-sm text-slate-800 border-b pb-3">Primary Thumbnail</h3>
                        <FileUploadField name="thumbnail" watch={watch} register={register} errors={errors} setValue={setValue} />
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-4">
                        <h3 className="font-bold text-sm text-slate-800 border-b pb-3">Map Embed Link</h3>
                        <textarea rows={5} {...register("googleMapEmbedLink")} placeholder="iframe src link..." className="text-[10px] font-mono" />
                    </div>
                </div>
            </div>



            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-3">
                    Project Galleries
                </h3>

                <Galleries
                    galleries={galleries}
                    setGalleries={setGalleries}
                    galleriesUrl={galleriesUrl}
                    setGalleriesUrl={setGalleriesUrl}
                />
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><AlignLeft size={14} />Project Description</label>
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
        </form>
    );
}