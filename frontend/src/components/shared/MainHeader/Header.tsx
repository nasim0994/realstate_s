import { AiOutlineClose } from "react-icons/ai";
import { CgMenuRight } from "react-icons/cg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
    { name: "Home", href: "/" },
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
    { name: "About Us", href: "/about-us" },
    { name: "Blogs", href: "/blogs" },
];

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void; }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isProjectDetailsPage = location.pathname.startsWith("/project/");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(isHomePage || isProjectDetailsPage ? window.scrollY > 50 : true);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage, isProjectDetailsPage]);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link to="/" >
                    <img src="/images/logo.png" alt="Logo" className="w-17.5 sm:w-20" loading="lazy" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <div key={index} className="relative group py-2">
                            <Link to={link.href} className="text-white/90 hover:text-white font-medium transition-colors flex items-center gap-1 uppercase text-xs tracking-widest">
                                {link.name}
                                {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                            </Link>

                            {/* Desktop Dropdown */}
                            {link.hasDropdown && (
                                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white p-6 w-56 shadow-xl border-t-2 border-primary]">
                                        <div className="flex flex-col gap-4">
                                            {link.dropdown?.map((sub, idx) => (
                                                <Link key={idx} to={sub.href} className="text-black text-[10px] font-bold uppercase tracking-widest hover:text-primary] transition-colors">
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary] transition-all duration-300 group-hover:w-full"></span>
                        </div>
                    ))}
                </nav>

                {/* Contact Us (Desktop) */}
                <div className="hidden md:block">
                    <Link to="/contact-us" className="bg-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-neutral transition-all duration-300">
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
                    <CgMenuRight size={28} />
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
                        className="fixed inset-0 bg-black z-60 flex flex-col p-10 h-screen"
                    >
                        <button className="absolute top-8 right-8 text-white" onClick={() => setMobileMenuOpen(false)}>
                            <AiOutlineClose size={32} />
                        </button>

                        <div className="flex flex-col gap-8 mt-20">
                            {navLinks.map((link, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <Link
                                            to={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-xl sm:text-3xl font-bold text-white uppercase tracking-tighter">
                                            {link.name}
                                        </Link>
                                        {link.hasDropdown && (
                                            <button
                                                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                                className={`p-2 bg-white/5 rounded-full text-white transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                                            >
                                                <ChevronDown size={20} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown Items */}
                                    <AnimatePresence>
                                        {link.hasDropdown && mobileDropdownOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-white/5 flex flex-col px-4"
                                            >
                                                {link.dropdown?.map((sub, idx) => (
                                                    <Link
                                                        key={idx}
                                                        to={sub.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="py-4 text-white/60 text-sm font-bold uppercase tracking-widest border-b border-white/5 last:border-0"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <div className="mt-8">
                                <Link to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="block bg-primary text-primary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-full text-center hover:bg-white hover:text-neutral transition-all duration-300">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </motion.header>
    );
}