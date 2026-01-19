import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import {
    MapPin, MessageSquare,
    Plus, Trash2, Save, Globe, Info, Map
} from 'lucide-react';

export type IContact = {
    title: string;
    subTitle: string; // Now Input
    email: string; // Now Textarea
    phone: string; // Now Textarea
    address: string; // Now Textarea
    googleMapLink?: string; // New Textarea
    whatsappLink: string;
    messengerLink: string;
    socials: {
        icon: string;
        url: string;
    }[];
};

export default function ContactUsManagement() {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IContact>({
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

    const { fields, append, remove } = useFieldArray({
        control,
        name: "socials"
    });

    const onSubmit: SubmitHandler<IContact> = (data) => {
        console.log("Form Data Submitted:", data);
        alert("Contact settings updated successfully!");
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
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:opacity-90 active:scale-95 transition-all"
                >
                    <Save size={18} />
                    Save Changes
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
                                    {...register("title", { required: "Title is required" })}
                                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.title ? 'border-red-400' : 'border-slate-100'} rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all`}
                                />
                            </div>

                            {/* Subtitle - Now Input & Required */}
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Subtitle</label>
                                <input
                                    {...register("subTitle", { required: "Subtitle is required" })}
                                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.subTitle ? 'border-red-400' : 'border-slate-100'} rounded-xl focus:bg-white outline-none transition-all`}
                                />
                            </div>

                            {/* Email - Textarea & Required */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Addresses (Use | to separate)</label>
                                <textarea
                                    {...register("email", { required: "Email is required" })}
                                    rows={3}
                                    placeholder="email1@test.com | email2@test.com"
                                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-100'} rounded-xl outline-none focus:bg-white`}
                                />
                            </div>

                            {/* Phone - Textarea & Required */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Numbers (Use | to separate)</label>
                                <textarea
                                    {...register("phone", { required: "Phone is required" })}
                                    rows={3}
                                    placeholder="+8801... | +8801..."
                                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.phone ? 'border-red-400' : 'border-slate-100'} rounded-xl outline-none focus:bg-white`}
                                />
                            </div>

                            {/* Address - Textarea & Required */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Office Addresses (Use | to separate)</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                    <textarea
                                        {...register("address", { required: "Address is required" })}
                                        rows={2}
                                        className={`w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.address ? 'border-red-400' : 'border-slate-100'} rounded-xl outline-none focus:bg-white`}
                                    />
                                </div>
                            </div>

                            {/* Google Map Link - Textarea (Optional) */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Google Map Embed Link (Optional)</label>
                                <div className="relative">
                                    <Map className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                    <textarea
                                        {...register("googleMapLink")}
                                        rows={3}
                                        placeholder="Paste iframe src or map link here..."
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white"
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
                                <input {...register("whatsappLink", { required: "WhatsApp link is required" })} placeholder="https://wa.me/..." className={`w-full px-4 py-3 bg-slate-50 border ${errors.whatsappLink ? 'border-red-400' : 'border-slate-100'} rounded-xl outline-none`} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-blue-600 uppercase tracking-wider ml-1">Messenger URL</label>
                                <input {...register("messengerLink", { required: "Messenger link is required" })} placeholder="https://m.me/..." className={`w-full px-4 py-3 bg-slate-50 border ${errors.messengerLink ? 'border-red-400' : 'border-slate-100'} rounded-xl outline-none`} />
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
                                <div key={field.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group animate-in slide-in-from-right-2 duration-300">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Platform</label>
                                        <select
                                            {...register(`socials.${index}.icon` as const, { required: true })}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/5"
                                        >
                                            <option value="facebook">Facebook</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="youtube">YouTube</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase">Profile Link</label>
                                        <input
                                            {...register(`socials.${index}.url` as const, {
                                                required: "URL is required",
                                                pattern: {
                                                    value: /^https?:\/\/.+/,
                                                    message: "Must be a valid URL"
                                                }
                                            })}
                                            placeholder="https://..."
                                            className={`w-full bg-white border ${errors.socials?.[index]?.url ? 'border-red-400' : 'border-slate-200'} rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/5`}
                                        />
                                        {errors.socials?.[index]?.url && <p className="text-[9px] text-red-500 font-bold ml-1">{errors.socials[index]?.url?.message}</p>}
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