import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MainFooter() {
    return (
        <footer className="relative w-full overflow-hidden bg-black text-white">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
                    alt="Footer Background"
                    className="w-full h-full object-cover opacity-30 grayscale"
                />
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
                        <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-4">Discuss your project</p>
                        <a
                            href="tel:+8801234567890"
                            className="text-4xl md:text-[6vw] font-bold tracking-tighter hover:text-primary transition-colors duration-500"
                        >
                            +880 1234 567 890
                        </a>
                    </motion.div>

                    {/* Social Icons */}
                    <div className="flex gap-8 mb-16">
                        {[
                            { icon: <Facebook />, link: "#" },
                            { icon: <Instagram />, link: "#" },
                            { icon: <Linkedin />, link: "#" },
                            { icon: <Twitter />, link: "#" },
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                whileHover={{ y: -5, color: "#e52329" }}
                                className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:border-primary transition-all duration-300"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    {/* Address */}
                    <div className="max-w-md mb-20 text-center">
                        <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-medium leading-relaxed">
                            Level 12, Corporate Tower, Gulshan Avenue <br />
                            Dhaka 1212, Bangladesh
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
                        <p>© 2024 Your Real Estate Firm. All Rights Reserved.</p>
                        <p className="mt-4 md:mt-0 flex items-center gap-2">
                            Design & Developed by
                            <Link to="https://devnasim.xyz" className="text-white font-bold">DevNasim</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}