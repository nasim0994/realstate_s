import { motion } from "framer-motion";
import {
    MapPin, Maximize, Calendar, Share2,
    Layers, Compass, Home, Map, ExternalLink
} from "lucide-react";
import parser from "html-react-parser";
import { useGetProjectBySlugQuery } from "@/redux/features/project/projectApi";
import { useParams } from "react-router-dom";
import { CONFIG } from "@/config";
import moment from "moment";
import MainLayoutSkeleton from "@/components/shared/Skeleton/MainLayoutSkeleton";


export default function ProjectDetails() {
    const { slug } = useParams();

    const { data, isLoading } = useGetProjectBySlugQuery(slug);
    const project = data?.data || {};
    const responsiveIframe = project?.googleMapEmbedLink?.replace(/width="\d+"/, 'width="100%"');


    const parseDescription = project?.description ? parser(project?.description) : "";
    const convertPlainText = (htmlString: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    const plainDescription = convertPlainText(project.description);
    const metaDescription = plainDescription.length > 160
        ? plainDescription.substring(0, 157) + "..."
        : plainDescription;

    if (isLoading) return <MainLayoutSkeleton />;

    return (
        <div className="bg-white min-h-screen">
            <title>{project?.title}</title>
            <meta name="description" content={metaDescription} />

            {/* Hero Section (Same as before) */}
            <section className="relative h-[65vh] w-full">
                <img src={CONFIG.BASE_URL + project?.thumbnail} alt={project?.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/60 flex items-end">
                    <div className="container pb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Status & Category Badge */}
                            <div className="flex gap-3 mb-4">
                                <span className="bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white inline-block">
                                    {project?.type?.name}
                                </span>
                                {/* Ongoing Status Badge */}
                                <span className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white inline-block">
                                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                    {project?.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project?.title}</h1>
                            <div className="flex items-center gap-2 text-gray-200 uppercase tracking-widest text-xs font-semibold">
                                <MapPin className="w-4 h-4 text-primary" />
                                {project?.location}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-2/3 space-y-16">
                        {/* Project Perspective / Overview */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold border-l-4 border-primary pl-6 uppercase tracking-tight">Project Perspective</h2>
                            <div>{parseDescription}</div>
                        </div>

                        {/* Technical Specifications Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1px bg-gray-100 border border-gray-100 shadow-sm">
                            <SpecItem icon={<Map />} label="Land Area" value={project?.landArea} />
                            <SpecItem icon={<Layers />} label="Storied" value={project?.storied} />
                            <SpecItem icon={<Compass />} label="Facing" value={project?.facing} />
                            <SpecItem icon={<Maximize />} label="Apt/Space Size" value={project?.aptSize} />
                            <SpecItem icon={<Home />} label="Layout" value={project?.layout} />
                            <SpecItem icon={<Calendar />} label="Handover" value={moment(project?.handoverDate).format('MMMM YYYY')} />
                        </div>

                        {/* Gallery Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Galleries</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project?.galleries?.map((img: string, i: number) => (
                                    <motion.div key={i} whileHover={{ scale: 0.98 }} className="overflow-hidden aspect-video bg-gray-100">
                                        <img src={CONFIG.BASE_URL + img} className="w-full h-full object-cover" alt="gallery" loading="lazy" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Google Maps Integration */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Project Location</h3>
                            <div className="w-full h-100 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
                                <div
                                    dangerouslySetInnerHTML={{ __html: responsiveIframe }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-[#f9f9f9] p-10 border-t-4 border-primary">
                                <p className="text-xs uppercase font-bold text-gray-400 mb-2">Request Information</p>
                                <h3 className="text-3xl font-bold mb-8">Want to learn more?</h3>

                                <div className="space-y-4">
                                    <button className="w-full bg-black text-white py-6 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all">
                                        Download Brochure
                                    </button>
                                    <button className="w-full border-2 border-black py-6 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                        Contact Agent
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border border-gray-100 p-6 group cursor-pointer hover:border-primary transition-all">
                                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Share2 className="w-4 h-4 text-primary" /> Share Project
                                </span>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

// Spec Item Component for the Grid
function SpecItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="bg-white p-8 flex flex-col items-start gap-3">
            <div className="text-primary w-8 h-8 flex items-center justify-center bg-[#fdf2f2] rounded-full p-1.5">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{label}</p>
                <p className="font-bold text-lg text-black">{value}</p>
            </div>
        </div>
    );
}