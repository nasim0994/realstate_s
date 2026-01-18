import { useState } from 'react';
import {
    LayoutDashboard, Home, Users, MessageSquare,
    BarChart3, Settings, X, Building2, ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
        { icon: MessageSquare, label: 'Inquiries', active: false, badge: 5 },
        { icon: BarChart3, label: 'Analytics', active: false },
        { icon: Building2, label: 'Reports', active: false },
        { icon: Settings, label: 'Settings', active: false },
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
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <Building2 size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">
                            Estate<span className="text-primary">Flow</span>
                        </span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:bg-slate-50 p-1 rounded-lg">
                        <X size={24} />
                    </button>
                </div>

                {/* 2. Navigation Area (Scrollable Section) */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <nav className="space-y-1 pb-4">
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
                                                ? 'bg-blue-50 text-primary'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                                        `}
                                    >
                                        <item.icon size={20} className={item.active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-900'} />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {hasChildren && (
                                            <ChevronDown size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                                        )}
                                        {item.badge && !hasChildren && (
                                            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">{item.badge}</span>
                                        )}
                                    </button>

                                    {hasChildren && (
                                        <div className={`
                                            ml-9 space-y-1 overflow-hidden transition-all duration-300
                                            ${isMenuOpen ? 'max-h-60 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                                        `}>
                                            {item.children?.map((child, idx) => (
                                                <a
                                                    key={idx}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-slate-500 hover:text-primary hover:bg-blue-50/50 rounded-lg transition-colors"
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

                {/* 3. Admin Inquiry Stats & Action (Fixed at Bottom) */}
                <div className="p-2 border-t border-slate-100 shrink-0 bg-white">
                    {/* Message/Inquiry Status Widget */}
                    <Link to="/admin/" className="block cursor-pointer group bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/50">

                        {/* Background Decorative Icon with Hover Effect */}
                        <div className="absolute -right-2 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-blue-100 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1">
                            <MessageSquare size={56} />
                        </div>

                        <div className="relative z-10">
                            {/* Header with Title and pulse dot */}
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary/80 transition-colors">
                                    Form Submissions
                                </p>
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                            </div>

                            {/* Stats Grid */}
                            <div className="flex items-end justify-between gap-2">
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-2xl font-black text-slate-800 tabular-nums">24</p>
                                        <span className="text-[10px] font-bold text-emerald-500">+3</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium">Total Received</p>
                                </div>

                                {/* Divider */}
                                <div className="h-8 w-px bg-slate-200 self-center"></div>

                                <div className="flex-1 pl-2">
                                    <p className="text-2xl font-black text-primary tabular-nums">08</p>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-tighter">Unread</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
}