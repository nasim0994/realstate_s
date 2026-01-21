import { motion } from "framer-motion";
import AnimationButton from "../../shared/AnimationButton";

export default function HighlightProject() {
    return (
        <section className="relative py-20 md:h-[90vh] w-full overflow-hidden flex items-center justify-center">
            {/* Fixed Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url('/images/project2.png')`,
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
                        SWAN <br />
                        <span className="text-outline-white">Khatibun Casel</span>
                    </h2>

                    {/* Subtitle & Action */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                        <p className="text-gray-300 max-w-sm text-sm md:text-base leading-relaxed">
                            A paradigm of luxury living in the heart of the city, where nature meets modern architecture.
                        </p>

                        <AnimationButton text="Explore Project" link={`/project/khatibun-casel`} />
                    </div>
                </motion.div>
            </div>

            {/* Decorative Red Line at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
        </section>
    );
}