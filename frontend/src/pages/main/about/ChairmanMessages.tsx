import { CONFIG } from "@/config";
import type { IManagement } from "@/interface/managementInterface";
import { useGetAllManagementQuery } from "@/redux/features/management/managementApi";
import { Quote } from "lucide-react";
import parser from "html-react-parser";


export default function ChairmanMessages() {
    const { data: managementData } = useGetAllManagementQuery({});
    const managementList = managementData?.data || [];

    return (
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
    )
}
