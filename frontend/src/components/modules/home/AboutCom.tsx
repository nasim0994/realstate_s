import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import AnimationButton from "../../shared/AnimationButton";
import { useGetAboutQuery } from "@/redux/features/about/aboutApi";
import { CONFIG } from "@/config";
import InfiniteMarquee from "./InfiniteMarquee";

const counters = [
    { label: "Years of Experience", value: "12+" },
    { label: "Properties Sold", value: "1.2k+" },
    { label: "Happy Clients", value: "800+" },
];

export default function AboutCom() {
    const containerRef = useRef(null);

    const { data } = useGetAboutQuery({});
    const about = data?.data || {};

    const { remainingTitle, lastThreeWords, plainDescription } = useMemo(() => {
        const titleWords = about?.title?.split(" ") || [];
        const description = about?.description || "";

        return {
            lastThreeWords: titleWords.slice(-3).join(" "),
            remainingTitle: titleWords.slice(0, -3).join(" "),
            plainDescription: description.replace(/<[^>]+>/g, "").slice(0, 750)
        };
    }, [about?.title, about?.description]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [100, -250]);

    return (
        <>
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
                                    {about?.subtitle || 'About Us'}
                                </h4>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral leading-tight mb-6">
                                    {remainingTitle} <br /> <span className="text-outline">{lastThreeWords}</span>
                                </h2>
                                <div className="space-y-4 text-gray-600 text-justify lg:pr-10">
                                    <p>
                                        {plainDescription?.length > 750 ? plainDescription.slice(0, 750) + "..." : plainDescription}
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
                                    src={CONFIG.BASE_URL + about?.bigImage}
                                    alt="Modern Building"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>

                            {/* Smaller Floating Image (Parallax) */}
                            <motion.div
                                style={{ y: yImage }}
                                className="absolute bottom-10 -left-2 md:-left-10 w-[35%] aspect-9/14 md:aspect-9/14 shadow-2xl z-10 overflow-hidden"
                            >
                                <img
                                    src={CONFIG.BASE_URL + about?.smallImage}
                                    alt="Interior"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>

                            {/* Decorative Element */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-gray-100 -z-10" />
                        </div>

                    </div>
                </div>
            </section>



            <InfiniteMarquee slogan={about?.slogan} />
        </>
    );
};