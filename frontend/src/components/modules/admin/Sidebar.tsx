import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    LayoutDashboard, MessageSquare, Settings, X, Building2, ChevronDown, UserCog, ShieldCheck, Globe, Mail, Info, Search,
    Calendar
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useGetMessageCountQuery } from '@/redux/features/contactMessage/contactMessageApi';

interface MenuItem {
    icon?: any;
    label: string;
    href?: string;
    children?: MenuItem[];
}

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { pathname } = useLocation();
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const { data: messageCount } = useGetMessageCountQuery({});

    const menuItems: MenuItem[] = useMemo(() => [
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
        {
            icon: Info,
            label: 'About Us',
            children: [
                { label: 'About', href: '/admin/about' },
                { label: 'More About', href: '/admin/about/more/all' },
                {
                    label: 'Concerns',
                    children: [
                        { label: 'Our Concern', href: '/admin/about/concerns/all' },
                        { label: 'Concern Products', href: '/admin/about/concerns/product/all' },
                    ]
                },
                { label: 'Management Message', href: '/admin/about/management/all' },
                { label: 'Team Category', href: '/admin/about/team/category/all' },
                { label: 'Team Members', href: '/admin/about/team/all' },
            ]
        },
        {
            icon: Info,
            label: 'Media',
            children: [
                { label: 'Chairman Quote', href: '/admin/media/chairman-quote' },
                { label: 'Photo Galleries', href: '/admin/media/photo' },
                { label: 'Video Galleries', href: '/admin/media/video' },
                { label: 'Happy Clients', href: '/admin/media/happy-clients' },
                { label: 'News', href: '/admin/media/news/all' },
                { label: 'Blogs', href: '/admin/media/blogs/all' },
            ]
        },
        { icon: Globe, label: 'Awards', href: "/admin/awards/all" },
        { icon: Globe, label: 'Contact Us', href: "/admin/contact-us" },
        { icon: Mail, label: 'Contact Message', href: "/admin/contact-message" },
        { icon: Calendar, label: 'Appointments', href: "/admin/appointments/all" },
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

    // Active link check function (supports deep nesting)
    const isUrlActive = useCallback((item: MenuItem): boolean => {
        if (item.href === pathname) return true;
        if (item.children) {
            return item.children.some(child => isUrlActive(child));
        }
        return false;
    }, [pathname]);

    // Auto open menus on route change
    useEffect(() => {
        const opened: string[] = [];
        const findAndOpen = (items: MenuItem[]) => {
            items.forEach(item => {
                if (item.children && isUrlActive(item)) {
                    opened.push(item.label);
                    findAndOpen(item.children);
                }
            });
        };
        findAndOpen(menuItems);
        setOpenMenus(prev => Array.from(new Set([...prev, ...opened])));
    }, [pathname, menuItems, isUrlActive]);

    const toggleMenu = (label: string) => {
        setOpenMenus(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    // --- Sub-component for Recursive Rendering ---
    const NavItem = ({ item, level = 0 }: { item: MenuItem, level?: number }) => {
        const hasChildren = !!item.children;
        const isOpenMenu = openMenus.includes(item.label);
        const isActive = isUrlActive(item);

        // Level er upor depend kore padding-left hobe
        const paddingLeft = level === 0 ? "px-4" : level === 1 ? "pl-11 pr-4" : level === 2 ? "pl-6 pr-4" : "pl-10 pr-4";

        const content = (
            <div className={`flex items-center gap-3 py-3 rounded-xl font-medium transition-all group text-[15px]
            ${paddingLeft}
            ${isActive ? 'bg-slate-50 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}
            ${level > 0 ? 'text-sm py-2' : ''}
        `}>
                {item.icon && <item.icon size={20} className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'} />}
                <span className="flex-1 text-left">{item.label}</span>
                {hasChildren && <ChevronDown size={16} className={`transition-transform duration-300 ${isOpenMenu ? 'rotate-180' : ''}`} />}
            </div>
        );

        return (
            <div className="w-full">
                {hasChildren ? (
                    <button onClick={() => toggleMenu(item.label)} className="w-full">
                        {content}
                    </button>
                ) : (
                    <Link to={item.href || '#'} onClick={() => setIsOpen(false)}>
                        {content}
                    </Link>
                )}

                {/* Nested Children Rendering */}
                {hasChildren && (
                    <div className={`
                    overflow-hidden transition-all duration-300 
                    ${isOpenMenu ? 'max-h-200 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                    ${level > 0 ? 'border-l border-slate-100 ml-6' : ''} 
                `}>
                        {item.children?.map((child, idx) => (
                            <NavItem key={idx} item={child} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

            <aside className={`fixed top-0 left-0 z-50 h-screen w-70 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-6 flex items-center justify-between shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg text-white"><Building2 size={24} /></div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">Estate<span className="text-primary">Flow</span></span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:bg-slate-50 p-1 rounded-lg transition-colors"><X size={24} /></button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <nav className="space-y-1 pb-4">
                        {menuItems.map((item, index) => (
                            <NavItem key={index} item={item} />
                        ))}
                    </nav>
                </div>

                {/* Inquiry Stats Section */}
                <div className="p-2 border-t border-slate-100 shrink-0 bg-white">
                    <Link to="/admin/contact-message" onClick={() => setIsOpen(false)} className="block cursor-pointer group bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/50">
                        <div className="absolute -right-2 -bottom-2 text-slate-200/50 transition-all duration-500 group-hover:text-blue-100 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1">
                            <MessageSquare size={56} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary/80 transition-colors">Form Submissions</p>
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                            </div>
                            <div className="flex items-end justify-between gap-2">
                                <div className="flex-1">
                                    <p className="text-2xl font-black text-slate-800 tabular-nums">{messageCount?.data?.totalMessages || 0}</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Total Received</p>
                                </div>
                                <div className="h-8 w-px bg-slate-200 self-center"></div>
                                <div className="flex-1 pl-2">
                                    <p className="text-2xl font-black text-primary tabular-nums">{messageCount?.data?.unreadMessages || 0}</p>
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