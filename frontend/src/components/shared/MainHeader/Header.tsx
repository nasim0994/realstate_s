import { AiOutlineClose } from "react-icons/ai";
import { CgMenuRight } from "react-icons/cg";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
    { name: "Home", href: "#" },
    { name: "Properties", href: "#", hasDropdown: true },
    { name: "Agents", href: "#" },
    { name: "About Us", href: "#" },
];

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void; }) {
    const [scrolled, setScrolled] = useState(false);


    // Scroll detection for changing header style
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div className="container" animate={{ x: mobileMenuOpen ? "-30%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}>
                <div className="flex items-center justify-between">

                    {/* Left: Logo */}
                    <div className="text-2xl font-bold text-white tracking-wider cursor-pointer">
                        LUXE<span className="text-primary-500">ESTATE</span>
                    </div>

                    {/* Middle: Menu (Desktop) */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <div key={index} className="relative group">
                                <Link
                                    to={link.href}
                                    className="text-white/90 hover:text-white font-medium transition-colors flex items-center gap-1"
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={14} />}
                                </Link>
                                {/* Dropdown Animation Line */}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        ))}
                    </nav>

                    {/* Right: Contact Button */}
                    <div className="hidden md:block">
                        <motion.div
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden rounded-full"
                        >
                            <Link
                                to="/contact"
                                className="relative z-10 flex items-center justify-center gap-2 bg-base-100 px-7 py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground duration-200"
                            >
                                {/* Icon Wrapper */}
                                <span className="relative w-4 h-4 overflow-hidden">
                                    {/* Default Icon */}
                                    <motion.span
                                        variants={{
                                            hover: { y: -24, opacity: 0 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                    </motion.span>

                                    {/* Hover Icon */}
                                    <motion.span
                                        initial={{ y: 24, opacity: 0 }}
                                        variants={{
                                            hover: { y: 0, opacity: 1 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                    </motion.span>
                                </span>

                                <span className="font-medium text-sm">Contact Us</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden cursor-pointer w-10 h-10 bg-black/90 rounded-full flex items-center justify-center text-base-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <CgMenuRight className="text-xl" />
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu Dropdown (Simple version) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Dark Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40"
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
                            className="fixed top-0 right-0 w-[95%] h-screen bg-black z-50 flex items-center justify-center"
                        >

                            <motion.div className="absolute top-0 right-0 p-4"
                                initial={{ opacity: 0, y: -40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.6,
                                    ease: [0.77, 0, 0.18, 1],
                                }}>
                                <button>
                                    <AiOutlineClose
                                        className="text-4xl text-white absolute top-6 right-6"
                                        onClick={() => setMobileMenuOpen(false)}
                                    />
                                </button>
                            </motion.div>

                            <motion.nav
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.12,
                                            delayChildren: 0.2,
                                        },
                                    },
                                }}
                                className="flex flex-col items-center gap-8"
                            >
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <Link
                                            to={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-white text-3xl font-semibold tracking-wide hover:text-primary transition"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Contact CTA */}
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 40 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.6 }}
                                    className="mt-10"
                                >
                                    <Link
                                        to="/contact"
                                        className="px-10 py-4 border border-white rounded-full text-white hover:bg-primary hover:border-primary transition"
                                    >
                                        Contact Us
                                    </Link>
                                </motion.div>
                            </motion.nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};


