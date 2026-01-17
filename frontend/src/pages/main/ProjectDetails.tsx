import { motion } from "framer-motion";
import {
    MapPin, Maximize, Calendar, Share2,
    Layers, Compass, Home, Map, ExternalLink
} from "lucide-react";
import parser from "html-react-parser";

const projectData = {
    title: "The Sky Garden - Luxury Landmark",
    description: `<div className="text-neutral">
        <p className="leading-relaxed mb-6">
            গুলশানের অভিজাত লোকেশনে অবস্থিত এই পূর্ণাঙ্গ রেসিডেন্সিয়াল বিল্ডিংটি
            আধুনিক স্থাপত্য, বিলাসিতা এবং আরামদায়ক জীবনযাপনের এক অনন্য সংমিশ্রণ।
            শহরের কোলাহল থেকে কিছুটা দূরে, কিন্তু প্রয়োজনীয় সব সুযোগ-সুবিধার একদম কাছে—
            এই প্রকল্পটি তৈরি করা হয়েছে ভবিষ্যৎমুখী আরবান লাইফস্টাইলকে মাথায় রেখে।
        </p>

        <p className="leading-relaxed mb-6">
            প্রতিটি ফ্লোর ও ইউনিট পরিকল্পিত হয়েছে সর্বোচ্চ আলো-বাতাস নিশ্চিত করার জন্য।
            প্রশস্ত লিভিং স্পেস, আধুনিক ইন্টেরিয়র ডিজাইন এবং প্রিমিয়াম ফিনিশিং
            এই বিল্ডিংকে গুলশানের অন্যান্য প্রকল্প থেকে আলাদা করে তুলেছে।
        </p>

        <p className="leading-relaxed">
            শক্তিশালী স্ট্রাকচার, উন্নত নিরাপত্তা ব্যবস্থা, নিরবচ্ছিন্ন বিদ্যুৎ ও পানির সুবিধা
            এবং সুপরিকল্পিত কমন এরিয়া—সব মিলিয়ে এটি শুধু একটি ভবন নয়,
            বরং একটি পরিপূর্ণ ও সম্মানজনক জীবনযাপনের প্রতিচ্ছবি।
        </p>
    </div>`,
    location: "Gulshan 2, Dhaka",
    type: "Residential",
    status: "Ongoing",
    price: "Price on Request",

    // Technical Specifications
    landArea: "15 Katha",
    facing: "South Facing",
    storied: "G + 14 Storied",
    layout: "3 Units Per Floor",
    aptSize: "2200 - 3500 SqFt",
    handover: "December 2026",

    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800"
    ],
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5983416206684!2d90.4182967753364!3d23.791012178640324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c36427b19cf12!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1715432000000!5m2!1sen!2sbd"
};

export default function ProjectDetails() {
    window.scrollTo(0, 0);

    return (
        <div className="bg-white min-h-screen">
            <title>{projectData?.title}</title>
            <meta name="description" content={projectData?.description} />

            {/* Hero Section (Same as before) */}
            <section className="relative h-[65vh] w-full">
                <img src={projectData?.image} alt={projectData?.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-end">
                    <div className="container mx-auto px-6 pb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Status & Category Badge */}
                            <div className="flex gap-3 mb-4">
                                <span className="bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white inline-block">
                                    {projectData?.type}
                                </span>
                                {/* Ongoing Status Badge */}
                                <span className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white inline-block">
                                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                    {projectData?.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{projectData.title}</h1>
                            <div className="flex items-center gap-2 text-gray-200 uppercase tracking-widest text-xs font-semibold">
                                <MapPin className="w-4 h-4 text-primary" />
                                {projectData?.location}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-2/3 space-y-16">
                        {/* Project Perspective / Overview */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold border-l-4 border-primary pl-6 uppercase tracking-tight">Project Perspective</h2>
                            <div>{projectData?.description && parser(projectData?.description)}</div>
                        </div>

                        {/* Technical Specifications Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1px bg-gray-100 border border-gray-100 shadow-sm">
                            <SpecItem icon={<Map />} label="Land Area" value={projectData.landArea} />
                            <SpecItem icon={<Layers />} label="Storied" value={projectData.storied} />
                            <SpecItem icon={<Compass />} label="Facing" value={projectData.facing} />
                            <SpecItem icon={<Maximize />} label="Apt/Space Size" value={projectData.aptSize} />
                            <SpecItem icon={<Home />} label="Layout" value={projectData.layout} />
                            <SpecItem icon={<Calendar />} label="Handover" value={projectData.handover} />
                        </div>

                        {/* Gallery Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Galleries</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projectData.gallery.map((img, i) => (
                                    <motion.div key={i} whileHover={{ scale: 0.98 }} className="overflow-hidden aspect-video bg-gray-100">
                                        <img src={img} className="w-full h-full object-cover" alt="gallery" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Google Maps Integration */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Project Location</h3>
                            <div className="w-full h-100 bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    src={projectData.googleMapEmbed}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
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