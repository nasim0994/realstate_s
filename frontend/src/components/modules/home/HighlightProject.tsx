import { motion } from "framer-motion";
import AnimationButton from "../../shared/AnimationButton";
import { useGetAllProjectQuery } from "@/redux/features/project/projectApi";
import { useMemo } from "react";
import { CONFIG } from "@/config";

export default function HighlightProject() {
    const { data } = useGetAllProjectQuery({ isHighlight: true, fields: "title,description,image,slug" });
    const highlightProject = data?.data[0];

    const { remainingTitle, lastThreeWords, plainDescription } = useMemo(() => {
        const titleWords = highlightProject?.title?.split(" ") || [];
        const description = highlightProject?.description || "";

        return {
            lastThreeWords: titleWords.slice(-2).join(" "),
            remainingTitle: titleWords.slice(0, -2).join(" "),
            plainDescription: description.replace(/<[^>]+>/g, "").slice(0, 120) // Sedikit lebih panjang untuk deskripsi
        };
    }, [highlightProject?.title, highlightProject?.description]);

    return (
        <section className="relative py-24 md:h-[95vh] w-full overflow-hidden flex items-center justify-center bg-black">
            <div
                className="absolute inset-0 z-0 transition-transform duration-700 scale-105"
                style={{
                    backgroundImage: `url('${highlightProject?.image ? CONFIG.BASE_URL + highlightProject.image : '/images/project2.png'}')`,
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                {/* Layer 1: Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Layer 2: Red Vignette (Efek merah di pinggir) */}
                <div className="absolute inset-0 bg-linear-to-b from-primary/40 via-transparent to-[#e52329]/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            {/* Content Area */}
            <div className="container relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Small Tagline dengan Red Glow */}
                    <motion.h4
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
                        className="text-[#e52329] font-black uppercase text-[10px] md:text-xs drop-shadow-[0_0_10px_rgba(229,35,41,0.8)]"
                    >
                        Featured Masterpiece
                    </motion.h4>

                    {/* Big Project Title */}
                    <h2 className="text-5xl md:text-[9vw] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                        {remainingTitle} <br />
                        <span
                            className="text-transparent"
                            style={{ WebkitTextStroke: '2px #e52329' }}
                        >
                            {lastThreeWords}
                        </span>
                    </h2>

                    {/* Subtitle & Action */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <p className="text-gray-200 max-w-sm text-sm md:text-base leading-relaxed border-l-2 border-[#e52329] pl-6 py-2 text-left bg-black/20 backdrop-blur-sm">
                                {plainDescription}...
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <AnimationButton
                                text="Explore Project"
                                link={`/project/${highlightProject?.slug}`}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}