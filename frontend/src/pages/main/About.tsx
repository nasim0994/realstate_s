import { motion } from "framer-motion";
import { Target, Eye, Quote } from "lucide-react";
import AboutCom from "../../components/modules/home/AboutCom";
import { useEffect } from "react";

export default function AboutPage() {
    useEffect(() => { window.scrollTo(0, 0); }, [])

    return (
        <main className="pt-10 bg-white">
            {/* 1. Main About Component */}
            <AboutCom />

            {/* 2. Mission & Vision Section */}
            <section className="py-24 bg-[#f9f9f9]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 shadow-sm border-t-4 border-primary"
                        >
                            <Target className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To redefine urban living by delivering sustainable, high-quality, and innovative architectural masterpieces that exceed the expectations of our valued clients.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 shadow-sm border-t-4 border-black"
                        >
                            <Eye className="w-12 h-12 text-black mb-6" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be the most trusted name in the real estate industry, recognized for our commitment to excellence, integrity, and transforming skylines.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Leadership Message Section */}
            <section className="py-24 bg-white">
                <div className="container  space-y-32">
                    {/* Chairman Message */}
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/3 aspect-3/4 bg-gray-100 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" alt="Chairman" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                        </div>
                        <div className="w-full md:w-2/3 relative">
                            <Quote className="absolute -top-10 -left-10 w-20 h-20 text-gray-100 -z-10" />
                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Chairman's Message</h4>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter italic">"Building Trust, Delivering Excellence."</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Our journey has always been about more than just construction; it's about creating communities where dreams can flourish. We believe in transparency and the power of quality architecture.
                            </p>
                            <h5 className="text-xl font-bold">A.K. Azad</h5>
                            <p className="text-gray-400 uppercase text-xs tracking-widest mt-1">Chairman, Real Estate Group</p>
                        </div>
                    </div>

                    {/* MD Message (Reversed) */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="w-full md:w-1/3 aspect-3/4 bg-gray-100 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" alt="MD" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                        </div>
                        <div className="w-full md:w-2/3 text-right">
                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Managing Director's Message</h4>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter italic">"Innovation in Every Square Inch."</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Innovation and sustainability are the core pillars of our operations. We are dedicated to bringing world-class technology to the Bangladeshi real estate market.
                            </p>
                            <h5 className="text-xl font-bold">Md. Rahman</h5>
                            <p className="text-gray-400 uppercase text-xs tracking-widest mt-1">Managing Director</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Team Section */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="container ">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight uppercase">Our Expertise Team</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mt-4" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden aspect-4/5 mb-4 bg-gray-200">
                                    <img src={`https://i.pravatar.cc/400?img=${i + 10}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" alt="Team" loading="lazy" />
                                </div>
                                <h4 className="font-bold text-lg uppercase tracking-tight">Johnathan Smith</h4>
                                <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Chief Architect</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Sister Concerns Section */}
            <section className="py-20 bg-white">
                <div className="container  text-center">
                    <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gray-400 mb-12">Our Concerns</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50">
                        {/* এখানে আপনার সিস্টার কোম্পানির লোগোগুলো হবে */}
                        <span className="text-2xl font-black text-black grayscale tracking-tighter">CONSTRUCTO</span>
                        <span className="text-2xl font-black text-black grayscale tracking-tighter">FINANCE-GO</span>
                        <span className="text-2xl font-black text-black grayscale tracking-tighter">LIVING-PRO</span>
                        <span className="text-2xl font-black text-black grayscale tracking-tighter">STEEL-BOND</span>
                    </div>
                </div>
            </section>
        </main>
    );
}