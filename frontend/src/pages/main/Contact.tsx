import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Contact() {
    window.scrollTo(0, 0);

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
                        Get in touch
                    </motion.h4>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter leading-none"
                    >
                        Let’s Build Your <br />
                        <span className="text-outline">Dream Together.</span>
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
                                        House 12, Road 05, Block F, <br />
                                        Banani, Dhaka - 1213, Bangladesh.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-widest mb-2">Call Us</h4>
                                    <p className="text-gray-500 text-sm">+880 1712 345 678</p>
                                    <p className="text-gray-500 text-sm">+880 1912 345 678</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase font-bold tracking-widest mb-2">Email</h4>
                                    <p className="text-gray-500 text-sm">info@luxeestate.com</p>
                                    <p className="text-gray-500 text-sm">sales@luxeestate.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-gray-100">
                            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-6 text-gray-400">Follow Our Journey</h4>
                            <div className="flex gap-4">
                                {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                                    <a key={idx} href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form (8 Columns) */}
                    <div className="lg:col-span-8 bg-[#f9f9f9] p-8 md:p-12">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:border-black transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:border-black transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label>Subject</label>
                                <select className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:border-black transition-all appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Residential Project</option>
                                    <option>Commercial Project</option>
                                    <option>Appointment</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label>Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you?"
                                    className="w-full bg-white border border-gray-100 px-6 py-4 text-sm focus:outline-none focus:border-black transition-all resize-none"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <button className="bg-black text-white px-10 py-5 text-xs uppercase font-bold tracking-[0.2em] flex items-center gap-3 hover:bg-primary transition-all group">
                                    Send Message
                                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            {/* Map Section - Full Width */}
            <div className="w-full h-125 bg-gray-200 grayscale contrast-125">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.000000000000!2d90.4000000000000!3d23.7900000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70000000001%3A0x0000000000000000!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}