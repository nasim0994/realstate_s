import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AnimationButton({ text, link }: { text: string; link?: string }) {
    return (
        <Link to={link || "/"}>
            <motion.div
                initial="initial"
                whileHover="hover"
                className="group flex items-center gap-4 hover:bg-primary px-6 py-3 font-medium uppercase tracking-widest text-sm rounded-full duration-300 border border-neutral hover:border-primary bg-transparent text-neutral hover:text-primary-foreground"
            >
                {/* SVG Container for Arrow Animation */}
                <div className="relative w-10 h-4 flex items-center justify-center">
                    <svg
                        width="46"
                        height="16"
                        viewBox="0 0 46 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"

                    >
                        {/* Main Horizontal Line (The stem) */}
                        <motion.path
                            d="M0 8H46"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ stroke: "#211e1f", scaleX: 0.5, originX: 0 }}
                            variants={{
                                initial: {
                                    stroke: "#211e1f",
                                    scaleX: 0.5
                                },
                                hover: {
                                    stroke: "#ffffff",
                                    scaleX: 1
                                },
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />

                        {/* Arrow Head (Top part) */}
                        <motion.path
                            d="M38 1L46 8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            variants={{
                                initial: { stroke: "#e52329", pathLength: 0, opacity: 0 },
                                hover: { stroke: "#ffffff", pathLength: 1, opacity: 1 },
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Arrow Head (Bottom part) */}
                        <motion.path
                            d="M38 15L46 8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            variants={{
                                initial: { stroke: "#e52329", pathLength: 0, opacity: 0 },
                                hover: { stroke: "#ffffff", pathLength: 1, opacity: 1 },
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </svg>
                </div>

                {/* Button Text */}
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        hover: { x: 2 },
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {text}
                </motion.span>
            </motion.div>
        </Link>
    )
}
