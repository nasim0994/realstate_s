import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAddAppointmentMutation } from '@/redux/features/appointment/appointmentApi';
import { useGetAllProjectQuery } from '@/redux/features/project/projectApi';
import type { TResponse } from '@/interface/globalInterface';

export default function Appointment() {
    const { data: projectData } = useGetAllProjectQuery({ isActive: true });
    const [createAppointment, { isLoading }] = useAddAppointmentMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        occupation: '',
        project: '',
        date: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createAppointment(formData) as TResponse;
            if (res?.data?.success) {
                toast.success("Appointment submitted successfully!");
                setFormData({ name: '', email: '', phone: '', location: '', occupation: '', project: '', date: '' });
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
            toast.error(error?.data?.message || "Failed to submit appointment");
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 py-20">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Book an Appointment</h1>
                    <p className="mt-4 text-lg text-slate-600">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-3">

                        {/* Left Side: Info */}
                        <div className="bg-primary p-8 md:p-12 text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                                <p className="text-primary-foreground/80 mb-8">
                                    Have a specific project in mind? Our experts are ready to help you.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                            <Phone size={20} />
                                        </div>
                                        <span>+1 (555) 000-0000</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                            <Mail size={20} />
                                        </div>
                                        <span>support@company.com</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <CheckCircle2 size={16} className="text-green-400" />
                                    Fast Response Guaranteed
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <form onSubmit={handleSubmit} className="md:col-span-2 p-8 md:p-12 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label>
                                        <User size={16} className="text-primary" /> Full Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        value={formData.name}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label>
                                        <Mail size={16} className="text-primary" /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        value={formData.email}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label>
                                        <Phone size={16} className="text-primary" /> Phone Number
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+880 1XXX XXXXXX"
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        value={formData.phone}
                                    />
                                </div>

                                {/* Occupation */}
                                <div className="space-y-2">
                                    <label>
                                        <Briefcase size={16} className="text-primary" /> Occupation
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Software Engineer"
                                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                        value={formData.occupation}
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label>
                                        <MapPin size={16} className="text-primary" /> Location
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Dhaka, Bangladesh"
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        value={formData.location}
                                    />
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <label>
                                        <Calendar size={16} className="text-primary" /> Preferred Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        value={formData.date}
                                    />
                                </div>
                            </div>

                            {/* Project Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Select Project</label>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none bg-white"
                                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                    value={formData.project}
                                >
                                    <option value="">Select a project</option>
                                    {projectData?.data?.map((p: any) => (
                                        <option key={p._id} value={p._id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Submitting...</span>
                                ) : (
                                    <>
                                        Submit Appointment <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}