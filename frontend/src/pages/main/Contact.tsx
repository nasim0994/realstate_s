import { useGetContactQuery } from "@/redux/features/contact/contactApi";
import { motion } from "framer-motion";
import {
    Facebook, Instagram, Twitter, Linkedin, Youtube,
    MessageSquare, Github, Globe,
    MapPin,
    Phone,
    Mail,
} from 'lucide-react';
import { useMemo } from "react";
import { TikTokIcon } from "../admin/ContactUs";
import type { ISocial } from "@/interface/contactInterface";
import ContactForm from "@/components/modules/contact/ContactForm";


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

export default function Contact() {
    const { data } = useGetContactQuery({});
    const contact = data?.data || {};

    const { remainingTitle, lastTwoWords } = useMemo(() => {
        if (!contact?.subTitle) return { remainingTitle: "", lastTwoWords: "" };
        const titleWords = contact.subTitle.split(" ");

        return {
            lastTwoWords: titleWords.slice(-2).join(" "),
            remainingTitle: titleWords.slice(0, -2).join(" "),
        };
    }, [contact.subTitle]);

    const responsiveIframe = contact?.googleMapLink?.replace(/width="\d+"/, 'width="100%"');

    return (
        <div className="bg-white min-h-screen pt-32">
            <div className="container">

                {/* Header Section */}
                <div className="max-w-4xl mb-20">
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
                    >
                        {contact?.title || "Get in Touch"}
                    </motion.h4>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter leading-none"
                    >
                        {remainingTitle} <br />
                        <span className="text-outline">{lastTwoWords}</span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

                    {/* Left Side: Contact Info (4 Columns) */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-widest mb-2">Our Office</h4>
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        {contact?.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-widest mb-2">Call Us</h4>
                                    {contact?.phone?.split("|").map((phone: string,) => (
                                        <p key={phone} className="text-gray-500 text-sm">{phone}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-widest mb-2">Email</h4>
                                    {contact?.email?.split("|").map((email: string,) => (
                                        <div key={email}>
                                            <a href={`mailto:${email}`} className="text-gray-500 text-sm hover:underline">
                                                {email}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-gray-100">
                            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-6 text-gray-400">Follow Our Journey</h4>
                            <div className="flex gap-4">
                                {contact?.socials?.map((social: ISocial, i: number) => (
                                    <motion.a
                                        key={i}
                                        href={social?.url}
                                        target="_blank"
                                        className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                                    >
                                        {iconMap[social?.icon.toLowerCase()] || iconMap.default}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form (8 Columns) */}
                    <div className="lg:col-span-8 bg-[#f9f9f9] p-8 md:p-12">
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Map Section - Full Width */}
            <div className="w-full h-125 bg-gray-200 grayscale hover:grayscale-0 contrast-125 duration-300">
                <div
                    dangerouslySetInnerHTML={{ __html: responsiveIframe }}
                />
            </div>
        </div>
    );
}