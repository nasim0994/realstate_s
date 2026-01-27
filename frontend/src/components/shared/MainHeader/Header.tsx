import { AiOutlineClose } from "react-icons/ai";
import { CgMenuRight } from "react-icons/cg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetGeneralSettingQuery } from "@/redux/features/generalSetting/generalSettingApi";
import { CONFIG } from "@/config";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    {
        name: "Projects",
        href: "/projects",
        hasDropdown: true,
        dropdown: [
            { name: "Upcoming Projects", href: "/projects?status=upcoming" },
            { name: "Ongoing Projects", href: "/projects?status=ongoing" },
            { name: "Completed Projects", href: "/projects?status=completed" },
        ]
    },
    {
        name: "Media",
        href: "#",
        hasDropdown: true,
        dropdown: [
            { name: "Chairman Quote", href: "/media/chairman-quote" },
            { name: "Photo Gallery", href: "/media/photo-galleries" },
            { name: "Video Gallery", href: "/media/video-galleries" },
            { name: "Happy Clients", href: "/media/happy-clients" },
            { name: "Press Release", href: "/media/press-release" },
            { name: "Online News", href: "/media/online-news" },
            { name: "Tv News", href: "/media/tv-news" },
            { name: "Blogs", href: "/media/blogs" },
        ]
    },
    {
        name: "About Us",
        href: "/about/company-profile",
        hasDropdown: true,
        dropdown: [
            { name: "Message From Chairman", href: "/about/chairman-message" },
            { name: "Company Profile", href: "/about/company-profile" },
            { name: "Our Concerns", href: "/about/our-concerns" },
            { name: "Our Team", href: "/about/our-team" },
        ]
    },
    { name: "Awards", href: "/awards" },
    { name: "Contact Us", href: "/contact-us" },
];

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void; }) {
    const [scrolled, setScrolled] = useState(false);
    const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
    const location = useLocation();

    const isHomePage = location.pathname === "/";
    const isProjectDetailsPage = location.pathname.startsWith("/project/");
    const isPhotoGalleryDetailsPage = location.pathname.startsWith("/media/photo-gallery/");

    const { data } = useGetGeneralSettingQuery({});
    const logo = data?.data?.logo;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(isHomePage || isProjectDetailsPage || isPhotoGalleryDetailsPage ? window.scrollY > 50 : true);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage, isProjectDetailsPage, isPhotoGalleryDetailsPage]);

    const toggleMobileDropdown = (idx: number) => {
        setOpenDropdownIdx(openDropdownIdx === idx ? null : idx);
    };

    // Handle Body Lock saat Sidebar terbuka
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/60 text-neutral shadow-lg backdrop-blur-md py-2" : "bg-transparent py-6 text-white"}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="container flex items-center justify-between">
                <Link to="/" className="relative z-10">
                    <img src={CONFIG.BASE_URL + logo || "/images/logo.png"} alt="Logo" className="w-16 sm:w-20 transition-transform hover:scale-105" loading="lazy" />
                </Link>

                <nav className="hidden lg:flex items-center gap-7">
                    {navLinks.map((link, index) => (
                        <div key={index} className="relative group py-2">
                            <Link to={link.href} className="hover:text-primary font-bold transition-all flex items-center gap-1 uppercase text-xs tracking-[0.15em]">
                                {link.name}
                                {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                            </Link>
                            {link.hasDropdown && (
                                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                                    <div className="bg-white p-5 w-64 shadow-xl border-t-4 border-primary">
                                        <div className="flex flex-col gap-3">
                                            {link.dropdown?.map((sub, idx) => (
                                                <Link key={idx} to={sub.href} className="text-neutral-600 hover:text-primary text-[10px] font-bold uppercase tracking-widest py-1">
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </div>
                    ))}
                </nav>

                <div className="hidden lg:block">
                    <Link
                        to="/appointment"
                        className="group relative overflow-hidden bg-primary text-white hover:text-primary px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] rounded-sm transition-all duration-500 ease-in-out flex items-center gap-3 shadow-[0_10px_20px_rgba(229,35,41,0.3)] hover:shadow-[0_15px_30px_rgba(229,35,41,0.5)] hover:-translate-y-1"
                    >
                        {/* Shimmer Effect Overlay */}
                        <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                        {/* Button Text */}
                        <span className="relative z-10">Appointment</span>

                        {/* Animated Icon */}
                        <div className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="w-4 h-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>

                        {/* Hover Background Layer */}
                        <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
                    </Link>
                </div>

                <button
                    className={`lg:hidden p-2 rounded-full transition-colors ${scrolled ? "text-neutral-900 bg-neutral-100" : "text-white bg-white/10"}`}
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <CgMenuRight size={26} />
                </button>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        data-lenis-prevent
                        className="fixed inset-0 bg-white z-60 flex flex-col h-screen overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-8 py-4 border-b border-neutral/50 shrink-0">
                            <img src={CONFIG.BASE_URL + logo} alt="Logo" className="w-16" />
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground duration-300" onClick={() => setMobileMenuOpen(false)}>
                                <AiOutlineClose size={24} />
                            </button>
                        </div>


                        <div className="flex-1 overflow-y-auto p-8 overscroll-contain">
                            <div className="flex flex-col gap-5">
                                {navLinks.map((link, i) => (
                                    <div key={i} className="flex flex-col">
                                        <div className="flex items-center justify-between group">
                                            <Link
                                                to={link.href}
                                                onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                                                className={`text-lg font-bold uppercase tracking-tighter transition-colors ${location.pathname === link.href ? "text-primary" : "text-neutral group-hover:text-primary"}`}
                                            >
                                                {link.name}
                                            </Link>
                                            {link.hasDropdown && (
                                                <button
                                                    onClick={() => toggleMobileDropdown(i)}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${openDropdownIdx === i ? 'bg-primary text-white rotate-180' : 'bg-primary/5 text-primary'}`}
                                                >
                                                    <ChevronDown size={20} />
                                                </button>
                                            )}
                                        </div>
                                        <AnimatePresence>
                                            {link.hasDropdown && openDropdownIdx === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden border-l-2 border-primary/30 ml-2 mt-4 flex flex-col gap-2"
                                                >
                                                    {link.dropdown?.map((sub, idx) => (
                                                        <Link
                                                            key={idx}
                                                            to={sub.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="py-3 pl-6 text-neutral text-sm font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className="h-px w-full mt-4" />
                                    </div>
                                ))}

                                <Link
                                    to="/appointment"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full bg-primary text-white py-5 text-xs font-black uppercase tracking-[0.3em] rounded-sm text-center shadow-lg"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </motion.header>
    );
}