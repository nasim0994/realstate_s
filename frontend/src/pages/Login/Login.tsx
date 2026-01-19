
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useLoginMutation } from '../../redux/features/user/authApi';
import { userLoggedIn, type TUser } from '../../redux/features/user/authSlice';
import { useState } from 'react';
import type { TResponse } from '@/interface/globalInterface';
import toast from 'react-hot-toast';
import verifyToken from '@/utils/verifyToken';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Redux Mutation
    const [login, { isLoading }] = useLoginMutation();

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '', password: '' }
    });

    const from = location.state?.from?.pathname || "/dashboard";

    const onSubmit = async (data: { email: string; password: string }) => {
        setErrorMessage(null);

        const res = await login(data) as TResponse;

        if (res?.data?.success) {
            toast.success('Login successful!');
            setErrorMessage(null);

            const user = verifyToken(res?.data?.data?.accessToken) as TUser;
            dispatch(userLoggedIn({ user, token: res?.data?.data?.accessToken }));
            navigate(from, { replace: true });
        } else {
            setErrorMessage(Array.isArray(res?.error?.data?.error) &&
                res?.error?.data?.error.length > 0
                ? `${res?.error?.data?.error[0]?.path || ""} ${res?.error?.data?.error[0]?.message || ""
                    }`.trim()
                : res?.error?.data?.message || res?.error?.error || "Something went wrong!");

            console.log(res);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-10 space-y-8 border border-slate-100">

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-neutral tracking-tight">Admin Login</h2>
                    <p className="text-slate-500 text-sm">Welcome back! Please enter your details.</p>
                </div>

                {errorMessage && (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600 animate-shake">
                        <AlertCircle size={18} />
                        <p className="text-xs font-bold">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                                })}
                                type="email"
                                placeholder="admin@estateflow.com"
                                className={`${errors.email ? 'border-red-300' : 'border-slate-100'} pl-11`}
                            />
                        </div>
                        {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-300" size={18} />
                            <input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                placeholder="••••••••"
                                className={`${errors.password ? 'border-red-300' : 'border-slate-100'} pl-11`}
                            />
                        </div>
                        {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}