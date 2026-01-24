import { useState } from 'react';
import { Mail, Phone, Trash2, Eye, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import type { TResponse } from '@/interface/globalInterface';
import TableSkeleton from '@/components/shared/Skeleton/TableSkeleton';
import { useDeleteAppointmentMutation, useGetAllAppointmentQuery } from '@/redux/features/appointment/appointmentApi';
import type { IAppointment } from '@/interface/appointmentInterface';
import AppointmentModal from '@/components/modules/admin/appointment/AppointmentModal';
import { CONFIG } from '@/config';

export default function AllAppointment() {
    const { data, isLoading } = useGetAllAppointmentQuery({});
    const appointments = data?.data || [];
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                const res = await deleteAppointment(id) as TResponse;
                if (res?.data?.success) {
                    toast.success(res.data.message || "Message deleted successfully");
                } else {
                    toast.error(
                        Array.isArray(res?.error?.data?.error) && res?.error?.data?.error.length > 0
                            ? `${res?.error?.data?.error[0]?.path || ""} ${res?.error?.data?.error[0]?.message || ""}`.trim()
                            : res?.error?.data?.message || "Something went wrong!"
                    );
                    console.log(res);
                }
            } catch (error: any) {
                toast.error(error?.data?.message || "Failed to delete appointment");
                console.log(error);
            }
        }
    };

    return (
        <div className="space-y-3 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className='flex items-start gap-2'>
                    <div className="p-2 bg-primary/5 text-primary rounded-lg">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-neutral">All Appointments</h1>
                        <p className="text-slate-500 text-xs mt-1">You have {data?.meta?.total || 0} total booking appointments.</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th>Sender & Occupation</th>
                                <th>Contact & Location</th>
                                <th>Project & Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? <TableSkeleton columns={4} /> : appointments?.map((appointment: IAppointment) => (
                                <tr key={appointment?._id} className="group hover:bg-slate-50/50 transition-all">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                {appointment?.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-700">{appointment?.name}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-medium">{appointment?.occupation}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Mail size={12} /> {appointment?.email || 'N/A'}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Phone size={12} /> {appointment?.phone}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-medium">
                                                📍 {appointment?.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="space-y-1">
                                            <div className='flex items-center gap-2'>
                                                <img src={CONFIG.BASE_URL + appointment?.project?.thumbnail || ""} alt={appointment?.project?.title || 'General Project'} loading='lazy' className='w-8 h-8 rounded-md object-cover' />
                                                <p className="text-sm font-semibold text-primary">{appointment?.project?.title || 'General Project'}</p>
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                {new Date(appointment?.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedMessage(appointment)}
                                                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(appointment?._id)}
                                                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600 hover:border-red-600 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Component */}
            {selectedMessage && (
                <AppointmentModal
                    appointment={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                />
            )}
        </div>
    );
}