import { useGetContactQuery } from "@/redux/features/contact/contactApi";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useMemo } from "react";

export default function ContactCom() {
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

    const googleMapsUrl = useMemo(() => {
        if (!contact?.address) return "#";
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;
    }, [contact.address]);


    if (!contact) return null;


    return (
        <section className="py-10 md:py-32 bg-white relative overflow-hidden">
            <div className="container">

                {/* Header Part */}
                <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-20">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-6"
                    >
                        {contact?.title}
                    </motion.h4>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-extrabold text-neutral"
                    >
                        {remainingTitle} <br /> <span className="text-outline">{lastTwoWords}</span>
                    </motion.h3>
                </div>

                {/* Contact Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-100 border border-gray-100">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group bg-white p-12 flex flex-col items-center text-center hover:bg-primary transition-all duration-500"
                    >
                        <div className="text-primary group-hover:text-white transition-colors duration-500 mb-6 scale-125">
                            <Phone />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 group-hover:text-white/70 mb-2 transition-colors duration-500">
                            Phone
                        </span>
                        <div className="font-semibold text-neutral group-hover:text-white transition-colors duration-500">
                            {contact?.phone?.split("|")?.map((phone: string, index: number) => (
                                <a href={`tel:${phone}`} key={index} className="block">
                                    {phone}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group bg-white p-12 flex flex-col items-center text-center hover:bg-primary transition-all duration-500"
                    >
                        <div className="text-primary group-hover:text-white transition-colors duration-500 mb-6 scale-125">
                            <Mail />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 group-hover:text-white/70 mb-2 transition-colors duration-500">
                            Email
                        </span>
                        <div className="font-semibold text-neutral group-hover:text-white transition-colors duration-500">
                            {contact?.email?.split("|")?.map((email: string, index: number) => (
                                <a href={`mailto:${email}`} key={index} className="block">
                                    {email}
                                </a>
                            ))}
                        </div>
                    </motion.div>


                    {/* address */}
                    <motion.a
                        href={googleMapsUrl}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group bg-white p-12 flex flex-col items-center text-center hover:bg-primary transition-all duration-500"
                    >
                        <div className="text-primary group-hover:text-white transition-colors duration-500 mb-6 scale-125">
                            <MapPin />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 group-hover:text-white/70 mb-2 transition-colors duration-500">
                            Address
                        </span>
                        <div className="font-semibold text-neutral group-hover:text-white transition-colors duration-500">
                            {contact?.address}
                        </div>
                    </motion.a>
                </div>

            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none">
                <h1 className="text-[30vw] font-black uppercase">Contact</h1>
            </div>
        </section>
    );
}