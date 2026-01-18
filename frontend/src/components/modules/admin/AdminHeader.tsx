import { useState } from "react";
import { Menu, ExternalLink, LogOut, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function AdminHeader({ setIsSidebarOpen }: AdminHeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-3 backdrop-blur-md lg:px-4">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* Quick Link to Frontend */}
                <Link
                    to="/"
                    target="_blank"
                    className="flex items-center gap-2 text-neutral hover:text-primary text-[13px] bg-gray-100 px-3 py-2 rounded-lg transition-all"
                >
                    <ExternalLink size={15} />
                    View Website
                </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Notification Bell */}
                {/* <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div> */}

                {/* User Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-100 transition-all"
                    >
                        <img
                            src="https://ui-avatars.com/api/?name=Sabbir+Ahmed&background=0D8ABC&color=fff"
                            className="w-8 h-8 rounded-full border border-slate-200"
                            alt="Admin"
                        />
                        <div className="hidden md:block text-left">
                            <p className="text-xs font-bold text-slate-800 leading-none">Sabbir Ahmed</p>
                            <p className="text-[10px] text-slate-500">Super Admin</p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <>
                            {/* Click outside to close */}
                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>

                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                    <User size={16} />
                                    My Profile
                                </a>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button
                                    onClick={() => console.log("Logging out...")}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}