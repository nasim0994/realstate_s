import { useState } from "react";
import Sidebar from "../components/modules/admin/Sidebar";
import { Bell, Menu, Search } from "lucide-react";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">

            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Area */}
            <div className="lg:ml-70 transition-all duration-300">

                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-8">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg w-72">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search properties..."
                                className="bg-transparent border-none outline-none text-sm w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
