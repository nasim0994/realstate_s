import { useGetContactQuery } from "@/redux/features/contact/contactApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Facebook, Instagram, Twitter, Linkedin, Youtube,
    MessageSquare, Github, Globe,
    ArrowUpRight
} from 'lucide-react';
import { TikTokIcon } from "@/pages/admin/ContactUs";
import type { ISocial } from "@/interface/contactInterface";
import { useGetGeneralSettingQuery } from "@/redux/features/generalSetting/generalSettingApi";
import { CONFIG } from "@/config";
import { useMemo } from "react";

const iconMap: Record<string, React.ReactNode> = {
    facebook: <Facebook size={20} />,
    instagram: <Instagram size={20} />,
    twitter: <Twitter size={20} />,
    linkedin: <Linkedin size={20} />,
    youtube: <Youtube size={20} />,
    whatsapp: <MessageSquare size={20} />,
    github: <Github size={20} />,
    tiktok: <TikTokIcon size={20} />,
    pinterest: <Globe size={20} />,
    snapchat: <Globe size={20} />,
    threads: <Globe size={20} />,
    default: <Globe size={20} />
};
const currentYear = new Date().getFullYear();

export default function MainFooter() {

    const { data } = useGetContactQuery({});
    const contact = data?.data || {};

    const displayPhone = useMemo(() => {
        if (!contact?.phone) return "";
        return contact.phone.split("|")[0].trim();
    }, [contact.phone]);

    const { data: setting } = useGetGeneralSettingQuery({});
    const generalSetting = setting?.data || {};


    return (
        <footer className="relative w-full overflow-hidden bg-black text-white">
            <div className="absolute inset-0 z-0">
                {generalSetting?.footerImage && (
                    <img
                        src={`${CONFIG.BASE_URL}${generalSetting.footerImage}`}
                        alt="Footer Background"
                        className="w-full h-full object-cover opacity-30 grayscale transition-opacity duration-700"
                        loading="lazy"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="container relative z-10 pt-16 pb-10">
                <div className="flex flex-col items-center text-center">

                    {/* Large Phone Number */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-4">
                            {generalSetting?.tagline || "CALL US NOW"}
                        </p>
                        <a
                            href={`tel:${displayPhone}`}
                            className="text-4xl md:text-[6vw] font-bold tracking-tighter hover:text-primary transition-colors duration-500"
                        >
                            {displayPhone}
                        </a>
                    </motion.div>

                    {/* Social Icons */}
                    <div className="flex gap-8 mb-16">
                        {contact?.socials?.map((social: ISocial, i: number) => (
                            <motion.a
                                key={i}
                                href={social?.url}
                                target="_blank"
                                whileHover={{ y: -5, color: "#e52329" }}
                                className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:border-primary transition-all duration-300"
                            >
                                {iconMap[social?.icon.toLowerCase()] || iconMap.default}
                            </motion.a>
                        ))}
                    </div>

                    {/* Address */}
                    <div className="max-w-md mb-20 text-center">
                        <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-medium leading-relaxed">
                            {contact.address || ""}
                        </p>
                    </div>

                    {/* Quick Links Flex Container */}
                    <div className="w-full border-t border-white/10 pt-12 pb-12">
                        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
                            <nav className="flex flex-wrap gap-8 justify-center md:gap-10">
                                <Link
                                    to={`/`}
                                    className="text-xs uppercase font-bold tracking-widest hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    to={`/projects`}
                                    className="text-xs uppercase font-bold tracking-widest hover:text-primary transition-colors"
                                >
                                    Projects
                                </Link>
                                <Link
                                    to={`/about-us`}
                                    className="text-xs uppercase font-bold tracking-widest hover:text-primary transition-colors"
                                >
                                    About
                                </Link>
                                <Link
                                    to={`/contact-us`}
                                    className="text-xs uppercase font-bold tracking-widest hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                                <Link
                                    to={`/blogs`}
                                    className="text-xs uppercase font-bold tracking-widest hover:text-primary transition-colors"
                                >
                                    Blogs
                                </Link>
                            </nav>

                            <Link to="/privacy-policy" className="flex items-center gap-2 group cursor-pointer">
                                <span className="text-xs uppercase font-bold tracking-widest">Privacy Policy</span>
                                <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-gray-500 uppercase tracking-widest">
                        <p>© {currentYear} {generalSetting?.siteName}. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}