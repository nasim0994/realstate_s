import { motion } from "framer-motion";
import AnimationButton from "../../shared/AnimationButton";
import { useGetAllProjectQuery } from "@/redux/features/project/projectApi";
import { useMemo } from "react";

export default function HighlightProject() {
    const { data } = useGetAllProjectQuery({ isHighlight: true, fields: "title,description,image,slug" });
    const highlightProject = data?.data[0];

    const { remainingTitle, lastThreeWords, plainDescription } = useMemo(() => {
        const titleWords = highlightProject?.title?.split(" ") || [];
        const description = highlightProject?.description || "";

        return {
            lastThreeWords: titleWords.slice(-2).join(" "),
            remainingTitle: titleWords.slice(0, -2).join(" "),
            plainDescription: description.replace(/<[^>]+>/g, "").slice(0, 80)
        };
    }, [highlightProject?.title, highlightProject?.description]);




    return (
        <section className="relative py-20 md:h-[90vh] w-full overflow-hidden flex items-center justify-center">
            {/* Fixed Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url('${highlightProject?.image || '/images/project2.png'}')`,
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Area */}
            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    {/* Small Tagline */}
                    <h4 className="text-primary font-bold uppercase tracking-[0.5em] text-xs md:text-sm">
                        Featured Masterpiece
                    </h4>

                    {/* Big Project Title */}
                    <h2 className="text-5xl md:text-[8vw] font-bold text-white leading-none tracking-tighter">
                        {remainingTitle} <br /> <span className="text-outline-white">{lastThreeWords}</span>
                    </h2>

                    {/* Subtitle & Action */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                        <p className="text-gray-300 max-w-sm text-sm md:text-base leading-relaxed">
                            {plainDescription}
                        </p>

                        <AnimationButton text="Explore Project" link={`/project/${highlightProject?.slug}`} />
                    </div>
                </motion.div>
            </div>

            {/* Decorative Red Line at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
        </section>
    );
}