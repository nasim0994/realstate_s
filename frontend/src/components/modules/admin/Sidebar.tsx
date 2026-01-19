import { useState, useEffect, useMemo } from 'react';
import {
    LayoutDashboard, MessageSquare, Settings, X, Building2, ChevronDown,
    FileText, UserCog, ShieldCheck, Globe, Mail, Info, Search
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { pathname } = useLocation();
    const [openMenu, setOpenMenu] = useState<string | null>(null);


    const menuItems = useMemo(() => [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        {
            icon: Building2,
            label: 'Projects',
            children: [
                { label: 'All Projects', href: '/admin/projects/all' },
                { label: 'Add Project', href: '/admin/projects/add' },
                { label: 'Type', href: '/admin/projects/type/all' },
            ]
        },
        { icon: FileText, label: 'Blogs', href: '/admin/blogs/all' },
        {
            icon: Info,
            label: 'About Us',
            children: [
                { label: 'About', href: '/admin/about' },
                { label: 'More About', href: '/admin/about/more' },
                { label: 'Management Message', href: '/admin/about/management/all' },
                { label: 'Team Members', href: '/admin/about/team-member/all' },
            ]
        },
        { icon: Globe, label: 'Contact Us', href: "/admin/contact-us" },
        { icon: Mail, label: 'Contact Message', href: "/admin/contact-message" },
        {
            icon: Settings,
            label: 'Setting',
            children: [
                { label: 'General Setting', href: '/admin/setting/general' },
                { label: 'Banner Setting', href: '/admin/setting/banner/all' },
                { label: 'GTM Config', href: '/admin/setting/gtm-config' },
            ]
        },
        {
            icon: ShieldCheck,
            label: 'User & Role',
            children: [
                { label: 'Role Management', href: '/admin/user-role/role-management' },
                { label: 'User Management', href: '/admin/user-role/user-management' },
            ]
        },
        {
            icon: UserCog,
            label: 'Profile',
            children: [
                { label: 'My Profile', href: '/admin/profile/my-profile' },
                { label: 'Update Password', href: '/admin/profile/update-password' },
            ]
        },
        { icon: Search, label: 'SEO', href: "/admin/seo" },
    ], []);

    // 2. URL change hole auto-dropdown open korar logic
    useEffect(() => {
        menuItems?.forEach(item => {
            if (item.children) {
                const isActive = item.children.some(child => child.href === pathname);
                if (isActive) {
                    setOpenMenu(item.label);
                }
            }
        });
    }, [pathname, menuItems]);

    const toggleMenu = (label: string) => {
        setOpenMenu(openMenu === label ? null : label);
    };



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
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:bg-slate-50 p-1 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* 2. Navigation Area */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <nav className="space-y-1 pb-4">
                        {menuItems.map((item, index) => {
                            const hasChildren = !!item.children;
                            const isMenuOpen = openMenu === item.label;

                            // 3. Main item active check (child thakle child-er link check hobe)
                            const isMainItemActive = hasChildren
                                ? item.children?.some(child => child.href === pathname)
                                : item.href === pathname;

                            return (
                                <div key={index} className="space-y-1">
                                    {hasChildren ? (
                                        <button
                                            onClick={() => toggleMenu(item.label)}
                                            className={`
                                                w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group text-[15px]
                                                ${isMainItemActive ? 'bg-slate-50 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
                                            `}
                                        >
                                            <item.icon size={20} className={isMainItemActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'} />
                                            <span className="flex-1 text-left">{item.label}</span>
                                            <ChevronDown size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.href || '#'}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                                                w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group text-[15px]
                                                ${isMainItemActive
                                                    ? 'bg-blue-50 text-primary'
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
                                            `}
                                        >
                                            <item.icon size={20} className={isMainItemActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'} />
                                            <span className="flex-1 text-left">{item.label}</span>
                                        </Link>
                                    )}

                                    {hasChildren && (
                                        <div className={`
                                            ml-9 space-y-1 overflow-hidden transition-all duration-300
                                            ${isMenuOpen ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                                        `}>
                                            {item.children?.map((child, idx) => {
                                                const isChildActive = pathname === child.href;
                                                return (
                                                    <Link
                                                        key={idx}
                                                        to={child.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${isChildActive
                                                            ? 'text-primary bg-blue-50/50'
                                                            : 'text-slate-500 hover:text-primary hover:bg-blue-50/50'
                                                            }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* 3. Admin Inquiry Stats (Fixed at Bottom) */}
                <div className="p-2 border-t border-slate-100 shrink-0 bg-white">
                    <Link to="/admin/contact-message" onClick={() => setIsOpen(false)} className="block cursor-pointer group bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/50">
                        <div className="absolute -right-2 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-blue-100 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1">
                            <MessageSquare size={56} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary/80 transition-colors">
                                    Form Submissions
                                </p>
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                            </div>

                            <div className="flex items-end justify-between gap-2">
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-2xl font-black text-slate-800 tabular-nums">24</p>
                                        <span className="text-[10px] font-bold text-emerald-500">+3</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium">Total Received</p>
                                </div>
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