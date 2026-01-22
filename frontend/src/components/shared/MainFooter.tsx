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
        <footer className="relative w-full overflow-hidden bg-neutral-950 text-white">
            {/* Background Overlay dengan Red Vibe */}
            <div className="absolute inset-0 z-0">
                {generalSetting?.footerImage && (
                    <img
                        src={`${CONFIG.BASE_URL}${generalSetting.footerImage}`}
                        alt="Footer Background"
                        className="w-full h-full object-cover opacity-20 grayscale transition-opacity duration-700"
                        loading="lazy"
                    />
                )}
                {/* Gradient Deep Red Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-red-950 via-red-900/80 to-white/20" />
                {/* Glowing Red Spotlights */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 blur-[150px] rounded-full" />
            </div>

            <div className="container relative z-10 pt-20 pb-10">
                <div className="flex flex-col items-center text-center">

                    {/* Tagline & Phone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 group"
                    >
                        <p className="text-red-500 font-black uppercase tracking-[0.5em] text-xs mb-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                            {generalSetting?.tagline || "CALL US NOW"}
                        </p>
                        <a
                            href={`tel:${displayPhone}`}
                            className="relative inline-block text-5xl md:text-[7vw] font-black tracking-tighter text-white hover:text-red-500 transition-all duration-500"
                        >
                            <span className="relative z-10">{displayPhone}</span>
                            <div className="absolute -bottom-2 left-0 w-0 h-1 bg-red-600 transition-all duration-500 group-hover:w-full shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                        </a>
                    </motion.div>

                    {/* Red Glossy Social Icons */}
                    <div className="flex flex-wrap justify-center gap-6 mb-20">
                        {contact?.socials?.map((social: ISocial, i: number) => (
                            <motion.a
                                key={i}
                                href={social?.url}
                                target="_blank"
                                className="relative group overflow-hidden bg-white/5 backdrop-blur-xl w-14 h-14 flex items-center justify-center border border-white/10 rounded-full transition-all duration-500 hover:scale-125 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                            >
                                {/* Glossy Red Background Effect */}
                                <div className="absolute inset-0 bg-linear-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Moving Shine Flare */}
                                <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1.5s_ease-in-out]" />

                                <span className="relative z-10 text-white group-hover:text-red-500 transition-colors duration-300">
                                    {iconMap[social?.icon.toLowerCase()] || iconMap.default}
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Address with Red Hint */}
                    <div className="max-w-2xl mb-24 px-4">
                        <p className="text-gray-300 text-sm md:text-base uppercase tracking-[0.2em] font-light leading-relaxed">
                            {contact.address || ""}
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="w-full border-t border-red-900/30 pt-12 pb-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <nav className="flex flex-wrap gap-6 md:gap-10 justify-center">
                                {['Home', 'Projects', 'About', 'Contact', 'Blogs'].map((item) => (
                                    <Link
                                        key={item}
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-xs uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors relative group"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all group-hover:w-full" />
                                    </Link>
                                ))}
                            </nav>

                            <Link to="/privacy-policy" className="flex items-center gap-2 group text-gray-400 hover:text-white transition-colors">
                                <span className="text-xs uppercase font-bold tracking-widest">Privacy Policy</span>
                                <ArrowUpRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="w-full flex justify-center items-center pt-8 border-t border-red-900/20 text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                        <p>© {currentYear} <span className="text-red-800 font-bold">{generalSetting?.siteName}</span>. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}