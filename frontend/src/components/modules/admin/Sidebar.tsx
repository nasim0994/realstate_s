import React, { useState } from 'react';
import {
    LayoutDashboard, Home, Users, MessageSquare,
    BarChart3, Settings, X, Building2, ChevronDown
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (label: string) => {
        setOpenMenu(openMenu === label ? null : label);
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        {
            icon: Home,
            label: 'Properties',
            children: [
                { label: 'All Properties', href: '/admin/properties' },
                { label: 'Add Property', href: '/admin/properties/add' },
                { label: 'Categories', href: '/admin/properties/categories' },
            ]
        },
        {
            icon: Users,
            label: 'Agents',
            children: [
                { label: 'Agent List', href: '/admin/agents' },
                { label: 'Performance', href: '/admin/agents/stats' },
            ]
        },
        // Aro kisu menu add korsi scroll check korar jonno
        { icon: MessageSquare, label: 'Inquiries', active: false, badge: 5 },
        { icon: BarChart3, label: 'Analytics', active: false },
        { icon: Building2, label: 'Reports', active: false },
        { icon: Settings, label: 'Settings', active: false },
        { icon: Users, label: 'Customers', active: false },
        { icon: Home, label: 'Maintenance', active: false },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-70 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                {/* 1. Header (Fixed) */}
                <div className="p-6 flex items-center justify-between shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <Building2 size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">
                            Estate<span className="text-blue-600">Flow</span>
                        </span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500">
                        <X size={24} />
                    </button>
                </div>

                {/* 2. Navigation Area (Scrollable Section) */}
                <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
                    <nav className="space-y-1 pb-6">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>

                        {menuItems.map((item, index) => {
                            const hasChildren = !!item.children;
                            const isMenuOpen = openMenu === item.label;

                            return (
                                <div key={index} className="space-y-1">
                                    <button
                                        onClick={() => hasChildren ? toggleMenu(item.label) : setOpenMenu(null)}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group
                                            ${item.active && !hasChildren
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                                        `}
                                    >
                                        <item.icon size={20} className={item.active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-900'} />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {hasChildren && (
                                            <ChevronDown size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>

                                    {hasChildren && (
                                        <div className={`
                                            ml-9 space-y-1 overflow-hidden transition-all duration-300
                                            ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                                        `}>
                                            {item.children?.map((child, idx) => (
                                                <a
                                                    key={idx}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* 3. User Section (Fixed at Bottom) */}
                <div className="p-4 border-t border-slate-100 shrink-0 bg-white">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <img
                            src="https://ui-avatars.com/api/?name=Sabbir+Ahmed&background=0D8ABC&color=fff"
                            className="w-10 h-10 rounded-lg"
                            alt="Admin"
                        />
                        <div className="flex-1 overflow-hidden text-left">
                            <p className="text-sm font-bold text-slate-800 truncate">Sabbir Ahmed</p>
                            <p className="text-xs text-slate-500 truncate">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Scrollbar Style */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
            `}</style>
        </>
    );
}