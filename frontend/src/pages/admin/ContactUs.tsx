import { useForm, useFieldArray, type SubmitHandler, Controller } from 'react-hook-form';
import {
    MapPin, MessageSquare, Plus, Trash2, Save, Globe, Info, Map,
    Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Loader2
} from 'lucide-react';
import type { IContact } from '@/interface/contactInterface';
import { useAddContactMutation, useGetContactQuery, useUpdateContactMutation } from '@/redux/features/contact/contactApi';
import type { TResponse } from '@/interface/globalInterface';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

// Custom SVG for platforms not in Lucide
export const TikTokIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.32-.43 2.67-1.32 3.66-1.57 1.75-4.43 2.06-6.38 1.05-2.01-1.04-3-3.6-2.15-5.71.74-1.83 2.82-2.9 4.75-2.58.11-1.33.04-2.67.04-4-.01 0-.01 0-.01-.01V12c-2.32-.01-4.66.01-6.99-.01-.08-1.54-.64-3.11-1.78-4.2-1.13-1.12-2.73-1.63-4.29-1.8V1.95c1.45.17 2.91.6 4.16 1.48V.02z" />
    </svg>
);

const SOCIAL_OPTIONS = [
    { label: 'Facebook', value: 'facebook', icon: <Facebook size={16} className="text-blue-600" /> },
    { label: 'Instagram', value: 'instagram', icon: <Instagram size={16} className="text-pink-600" /> },
    { label: 'Twitter / X', value: 'twitter', icon: <Twitter size={16} className="text-slate-900" /> },
    { label: 'LinkedIn', value: 'linkedin', icon: <Linkedin size={16} className="text-blue-700" /> },
    { label: 'YouTube', value: 'youtube', icon: <Youtube size={16} className="text-red-600" /> },
    { label: 'TikTok', value: 'tiktok', icon: <TikTokIcon size={16} /> },
    { label: 'WhatsApp', value: 'whatsapp', icon: <MessageSquare size={16} className="text-emerald-500" /> },
    { label: 'GitHub', value: 'github', icon: <Github size={16} className="text-slate-800" /> },
    { label: 'Pinterest', value: 'pinterest', icon: <Globe size={16} className="text-red-700" /> },
    { label: 'Snapchat', value: 'snapchat', icon: <Globe size={16} className="text-yellow-500" /> },
    { label: 'Threads', value: 'threads', icon: <Globe size={16} className="text-black" /> },
];

export default function ContactUsManagement() {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IContact>({
        defaultValues: {
            title: "",
            subTitle: "",
            email: "",
            phone: "",
            address: "",
            googleMapLink: "",
            whatsappLink: "",
            messengerLink: "",
            socials: []
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "socials" });

    const { data } = useGetContactQuery({});
    const contact = data?.data;
    const id = contact?._id;

    useEffect(() => {
        if (contact) {
            reset({
                title: contact?.title ?? "",
                subTitle: contact?.subTitle ?? "",
                email: contact?.email ?? "",
                phone: contact?.phone ?? "",
                address: contact?.address ?? "",
                googleMapLink: contact?.googleMapLink ?? "",
                whatsappLink: contact?.whatsappLink ?? "",
                messengerLink: contact?.messengerLink ?? "",
                socials: contact?.socials?.length
                    ? contact.socials
                    : []
            });
        }
    }, [contact, reset]);



    const [addContact, { isLoading }] = useAddContactMutation();
    const [updateContact, { isLoading: uLoading }] = useUpdateContactMutation();

    const onSubmit: SubmitHandler<IContact> = async (data: IContact) => {
        if (id) {
            const res = (await updateContact({ id, data: data })) as TResponse;
            if (res?.data?.success) {
                toast.success("Contact Update Success");
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
            const res = (await addContact(data)) as TResponse;
            if (res?.data?.success) {
                toast.success("Contact Add Success");
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
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in duration-500 pb-10">

            {/* Header with Submit Button */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contact Us Settings</h1>
                    <p className="text-slate-500 text-sm">Update your agency's contact points and social presence.</p>
                </div>
                <button
                    type="submit"
                    className="admin_primary_btn"
                    disabled={isLoading || uLoading}
                >
                    {uLoading || isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {uLoading || isLoading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: General Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                            <div className="p-2 bg-blue-50 text-primary rounded-lg">
                                <Info size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">General Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Title - Required */}
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Title</label>
                                <input
                                    type='text'
                                    {...register("title", { required: "Title is required" })}
                                    className={` ${errors.title ? 'border-red-400' : 'border-slate-100'}`}
                                />
                            </div>

                            {/* Subtitle - Now Input & Required */}
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Subtitle</label>
                                <input
                                    type='text'
                                    {...register("subTitle", { required: "Subtitle is required" })}
                                    className={` ${errors.subTitle ? 'border-red-400' : 'border-slate-100'}`}
                                />
                            </div>

                            {/* Email - Textarea & Required */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Addresses (Use | to separate)</label>
                                <textarea
                                    {...register("email", { required: "Email is required" })}
                                    rows={3}
                                    placeholder="email1@test.com | email2@test.com"
                                    className={` ${errors.email ? 'border-red-400' : 'border-slate-100'}`}
                                />
                            </div>

                            {/* Phone - Textarea & Required */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Numbers (Use | to separate)</label>
                                <textarea
                                    {...register("phone", { required: "Phone is required" })}
                                    rows={3}
                                    placeholder="+8801... | +8801..."
                                    className={` ${errors.phone ? 'border-red-400' : 'border-slate-100'}`}
                                />
                            </div>

                            {/* Address - Textarea & Required */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Office Addresses (Use | to separate)</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                                    <textarea
                                        {...register("address", { required: "Address is required" })}
                                        rows={2}
                                        className={`pl-10 ${errors.address ? 'border-red-400' : 'border-slate-100'}`}
                                    />
                                </div>
                            </div>

                            {/* Google Map Link - Textarea (Optional) */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Google Map Embed Link (Optional)</label>
                                <div className="relative">
                                    <Map className="absolute left-4 top-4 text-slate-400" size={18} />
                                    <textarea
                                        {...register("googleMapLink")}
                                        rows={3}
                                        placeholder="Paste iframe src or map link here..."
                                        className='pl-10'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Direct Messaging Section */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Quick Contact Links</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider ml-1">WhatsApp URL</label>
                                <input type="text" {...register("whatsappLink", { required: "WhatsApp link is required" })} placeholder="https://wa.me/..." className={` ${errors.whatsappLink ? 'border-red-400' : 'border-slate-100'}`} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-blue-600 uppercase tracking-wider ml-1">Messenger URL</label>
                                <input
                                    type="text"
                                    {...register("messengerLink")}
                                    placeholder="https://m.me/..."
                                    className={`${errors.messengerLink ? 'border-red-400' : 'border-slate-100'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Dynamic Social Media Links */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-800">Social Presence</h3>
                            <button
                                type="button"
                                onClick={() => append({ icon: 'facebook', url: '' })}
                                className="p-2 bg-primary text-white rounded-lg hover:shadow-md transition-all active:scale-90"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative group animate-in slide-in-from-right-2 duration-300">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors bg-white p-1 rounded-full shadow-sm"
                                    >
                                        <Trash2 size={14} />
                                    </button>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform</label>

                                        {/* Controller for Custom Select with Icons */}
                                        <Controller
                                            control={control}
                                            name={`socials.${index}.icon`}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => {
                                                const selectedOption = SOCIAL_OPTIONS.find(opt => opt.value === value);
                                                return (
                                                    <div className="relative group/dropdown">
                                                        <select
                                                            value={value}
                                                            onChange={(e) => onChange(e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-xl px-10 py-2.5 text-sm outline-none appearance-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                                                        >
                                                            {SOCIAL_OPTIONS.map(opt => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {opt.label}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        {/* Visual Overlays for Icons */}
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            {selectedOption?.icon}
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Link</label>
                                        <input
                                            {...register(`socials.${index}.url` as const, {
                                                required: "URL is required",
                                                pattern: {
                                                    value: /^https?:\/\/.+/,
                                                    message: "Invalid URL"
                                                }
                                            })}
                                            placeholder="https://..."
                                            className={`w-full bg-white border ${errors.socials?.[index]?.url ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all`}
                                        />
                                        {errors.socials?.[index]?.url && (
                                            <p className="text-[9px] text-red-500 font-bold ml-1">{errors.socials[index]?.url?.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {fields.length === 0 && (
                                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                    <Globe size={32} className="mx-auto text-slate-200 mb-2" />
                                    <p className="text-xs text-slate-400 font-medium">Add social links to build trust</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Error Summary */}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-xs text-red-600 font-bold">Please fill all required fields before saving.</p>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}