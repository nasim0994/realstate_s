import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const contactDetails = [
    {
        icon: <Mail className="w-6 h-6" />,
        label: "Email Us",
        value: "hello@yourrealestate.com",
        link: "mailto:hello@yourrealestate.com",
    },
    {
        icon: <Phone className="w-6 h-6" />,
        label: "Call Anytime",
        value: "+880 1234 567 890",
        link: "tel:+8801234567890",
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        label: "Visit Office",
        value: "12/A, Road 55, Gulshan 2, Dhaka",
        link: "https://maps.google.com",
    },
];

export default function ContactCom() {
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
                        Connect with us
                    </motion.h4>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-extrabold text-neutral"
                    >
                        Ready to build your <br />
                        <span className="text-outline">dream together?</span>
                    </motion.h3>
                </div>

                {/* Contact Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-gray-100 border border-gray-100">
                    {contactDetails.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white p-12 flex flex-col items-center text-center hover:bg-primary transition-all duration-500"
                        >
                            <div className="text-primary group-hover:text-white transition-colors duration-500 mb-6 scale-125">
                                {item.icon}
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 group-hover:text-white/70 mb-2 transition-colors duration-500">
                                {item.label}
                            </span>
                            <p className="text-xl font-bold text-neutral group-hover:text-white transition-colors duration-500">
                                {item.value}
                            </p>
                        </motion.a>
                    ))}
                </div>

            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none">
                <h1 className="text-[30vw] font-black uppercase">Contact</h1>
            </div>
        </section>
    );
}