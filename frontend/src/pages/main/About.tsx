import AnimationButton from "@/components/shared/AnimationButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Quote } from "lucide-react";
import { useMemo, useRef } from "react";
import parser from "html-react-parser";
import { useGetAboutQuery } from "@/redux/features/about/aboutApi";
import { useGetAllManagementQuery } from "@/redux/features/management/managementApi";
import type { IManagement } from "@/interface/managementInterface";
import { CONFIG } from "@/config";
import { useGetAllTeamQuery } from "@/redux/features/team/teamApi";
import type { ITeam } from "@/interface/teamInterface";

const counters = [
    { label: "Years of Experience", value: "12+" },
    { label: "Properties Sold", value: "1.2k+" },
    { label: "Happy Clients", value: "800+" },
];

export default function AboutPage() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [100, -250]);


    const { data } = useGetAboutQuery({});
    const about = data?.data || {};


    const { remainingTitle, lastThreeWords, description } = useMemo(() => {
        const titleWords = about?.title?.split(" ") || [];
        const description = about?.description || "";

        return {
            lastThreeWords: titleWords.slice(-3).join(" "),
            remainingTitle: titleWords.slice(0, -3).join(" "),
            description,
        };
    }, [about?.title, about?.description]);


    const { data: managementData } = useGetAllManagementQuery({});
    const managementList = managementData?.data || [];


    const { data: teamData } = useGetAllTeamQuery({});
    const teamMembers = teamData?.data || [];

    return (
        <main className="pt-10 bg-white">
            {/* 1. Main About Component */}
            <section ref={containerRef} className="py-10 md:py-24 bg-white overflow-hidden">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">

                        {/* Left Side: Content */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h4 className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
                                    {about?.subtitle || 'About Us'}
                                </h4>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral leading-tight mb-6">
                                    {remainingTitle} <br /> <span className="text-primary">{lastThreeWords}</span>
                                </h2>
                                <div className="space-y-4 text-gray-600 text-justify lg:pr-10">
                                    {description && parser(description)}
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
                        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end lg:mt-10">
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
                <div className="container space-y-32">
                    {
                        managementList?.map((member: IManagement) => <div key={member?._id} className="flex flex-col md:flex-row items-start gap-16">
                            <div className="md:sticky top-26 w-full md:w-1/3 aspect-3/4 bg-gray-100 overflow-hidden">
                                <img src={CONFIG.BASE_URL + member?.image} alt={member?.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
                            </div>

                            <div className="w-full md:w-2/3 relative">
                                <Quote className="absolute -top-10 -left-10 w-20 h-20 text-gray-100 -z-10" />
                                <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">
                                    {member?.subTitle || `${member?.designation}'s Message`}
                                </h4>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter italic">
                                    {member?.title}
                                </h2>

                                <div>
                                    {member?.message && parser(member?.message)}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </section>

            {/* 4. Team Section */}
            {
                teamMembers?.length > 0 && <section className="py-24 bg-gray-50 overflow-hidden">
                    <div className="container ">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold tracking-tight uppercase">Our Expertise Team</h2>
                            <div className="w-20 h-1 bg-primary mx-auto mt-4" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers?.map((member: ITeam) => (
                                <div key={member?._id} className="group cursor-pointer">
                                    <div className="relative overflow-hidden aspect-4/5 mb-4 bg-gray-200">
                                        <img src={`${CONFIG.BASE_URL}${member?.image}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" alt={member?.name} loading="lazy" />
                                    </div>
                                    <h4 className="font-bold text-lg uppercase tracking-tight">{member?.name}</h4>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{member?.designation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            }


            {/* 5. Sister Concerns Section */}
            {
                about?.ourConcerns?.length > 0 && <section className="py-20 bg-white">
                    <div className="container  text-center">
                        <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gray-400 mb-12">Our Concerns</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50">
                            {
                                about?.ourConcerns?.map((concern: string, index: number) => (
                                    <span key={index} className="text-2xl font-black text-black grayscale tracking-tighter uppercase">{concern}</span>
                                ))
                            }
                        </div>
                    </div>
                </section>
            }

        </main>
    );
}