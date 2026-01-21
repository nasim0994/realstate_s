import AnimationButton from "@/components/shared/AnimationButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import parser from "html-react-parser";

const counters = [
    { label: "Years of Experience", value: "12+" },
    { label: "Properties Sold", value: "1.2k+" },
    { label: "Happy Clients", value: "800+" },
];

export default function AboutPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [100, -250]);




    const cMessage = `<section className="chairman-message max-w-4xl mx-auto">
      <p className="mb-4">
        I am <strong>Khabeer Uddin Khan</strong>, Chairman and Managing Director of Swan Group. 
        Beyond my role in business, I am proud to be an internationally recognized marathon runner. 
        At the age of 73, my journey through life, sports, and enterprise has shaped a set of core 
        principles that guide not only my personal discipline, but also the philosophy behind every 
        initiative we undertake at Swan Properties.
      </p>

      <p className="mb-4">
        I firmly believe that true success in life is built on strong fundamentals—<strong>integrity, discipline, hard work,</strong> 
        and responsibility toward society. Families are the foundation of human development, and nurturing 
        values within the family is as important as professional achievement. Education, sustained effort, 
        and honesty over the course of many years are essential to building a meaningful and dignified life. 
        Above all, one must remember that becoming a good human being is far more important than merely 
        becoming a successful professional.
      </p>

      <p className="mb-4">
        At <strong>Swan Properties Ltd.</strong>, we carry these beliefs into our approach to real estate development. 
        Construction, to us, is not simply about creating buildings—it is about ensuring <strong>safety, responsibility, 
        and long-term sustainability</strong> for the people who will live and work within them. Every project we develop 
        is planned and executed in full compliance with <strong>BNBC Code 2020</strong>, with structural designs engineered 
        through modern analysis to ensure <strong>earthquake resistance up to 7.5 Richter scale</strong>.
      </p>

      <p className="mb-4">
        Our focus on <strong>strong foundations, quality materials,</strong> and expert engineering supervision reflects 
        our commitment to building structures that stand the test of time—both structurally and ethically. 
        We do not believe in shortcuts, favoritism, or compromise. <strong>Transparency, fairness, and professionalism</strong> 
        remain at the core of our operations.
      </p>

      <p className="mb-4">
        Economic success alone does not define a fulfilled life or a responsible organization. We believe in contributing 
        positively to society, maintaining ethical practices, encouraging healthy lifestyles, and fostering human values 
        alongside business growth. <strong>Discipline, punctuality, proper planning, and continuous self-improvement</strong> 
        are principles we practice daily—both as individuals and as an organization.
      </p>

      <p className="mb-4">
        As we continue to shape modern urban living through Swan Properties, our promise remains unwavering:
        <ul className="list-disc list-inside mt-2">
          <li>to build with strength,</li>
          <li>to operate with integrity,</li>
          <li>and to earn trust through performance.</li>
        </ul>
      </p>

      <p className="mb-4">
        <strong>Swan Properties Ltd.</strong> is not just constructing buildings—we are building safer futures, 
        stronger communities, and a legacy rooted in responsibility and trust.
      </p>

      <p className="mt-6 font-semibold">
        Khabeer Uddin Khan<br />
        Chairman & Managing Director<br />
        Swan Group
      </p>
    </section>`;

    return (
        <main className="pt-10 bg-white">
            {/* 1. Main About Component */}
            <section ref={containerRef} className="py-10 md:py-24 bg-white overflow-hidden">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

                        {/* Left Side: Content */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h4 className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
                                    Since 2012
                                </h4>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral leading-tight mb-6">
                                    We Provide The Best <br /> <span className="text-primary">Property For You</span>
                                </h2>
                                <div className="space-y-4 text-gray-600 text-justify lg:pr-10">
                                    <p>
                                        Swan Properties Ltd. is a trusted real estate development company in Bangladesh, committed to delivering safe, sustainable, and thoughtfully designed residential and commercial spaces. As a sister concern of Swan Group, we carry forward a legacy of quality, integrity, and reliability built over decades.
                                    </p>

                                    <p>
                                        At Swan Properties, we believe that construction is not just about buildings—it is about responsibility toward people, communities, and the future. Every project is carefully planned and executed in full compliance with the BNBC Code 2020, ensuring structural safety, durability, and preparedness for seismic resilience of up to 7.5 Richter scale.
                                    </p>

                                    <p>
                                        Our developments are driven by strong engineering foundations, premium-grade construction materials, and the expertise of experienced architects, engineers, and project management teams. From design to delivery, we maintain strict quality control to ensure long-term value, safety, and comfort for our clients.
                                    </p>


                                    <p>
                                        Swan Properties Ltd. is a registered member of the Real Estate & Housing Association of Bangladesh (REHAB) with Membership No: 1146/2011, reflecting our commitment to regulatory compliance, ethical practices, and industry standards.
                                    </p>

                                    <p>
                                        With a focus on modern architecture, functional planning, and trusted construction practices, Swan Properties continues to shape reliable urban living across key locations. Our promise is simple—to build with strength, deliver with integrity, and earn trust through performance.
                                    </p>

                                    <p className="italic font-medium">
                                        Swan Properties Ltd. <br />
                                        Built on Strength. Built on Trust.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Counters */}
                            <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-8">
                                {counters.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                    >
                                        <h3 className="text-3xl font-bold text-neutral">{item.value}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="w-max">
                                <AnimationButton text="Contact Us" link="/contact-us" />
                            </div>
                        </div>

                        {/* Right Side: Image Parallax */}
                        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                            {/* Main Large Image */}
                            <motion.div
                                className="relative w-full sm:aspect-4/5 md:max-h-140 overflow-hidden"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
                                    alt="Modern Building"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Smaller Floating Image (Parallax) */}
                            <motion.div
                                style={{ y: yImage }}
                                className="absolute bottom-10 -left-2 md:-left-10 w-[35%] aspect-9/14 md:aspect-9/14 shadow-2xl z-10 overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
                                    alt="Interior"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Decorative Element */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-gray-100 -z-10" />
                        </div>

                    </div>
                </div>
            </section>

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
                    <div className="flex flex-col md:flex-row items-start gap-16">
                        <div className="sticky top-26 w-full md:w-1/3 aspect-3/4 bg-gray-100 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" alt="Chairman" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                        </div>

                        <div className="w-full md:w-2/3 relative">
                            <Quote className="absolute -top-10 -left-10 w-20 h-20 text-gray-100 -z-10" />
                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Chairman's Message</h4>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter italic">"Building Trust, Delivering Excellence."</h2>

                            <div>
                                {parser(cMessage)}
                            </div>
                        </div>
                    </div>

                    {/* MD Message (Reversed) */}
                    {/* <div className="flex flex-col md:flex-row-reverse items-start gap-16">
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
                    </div> */}
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