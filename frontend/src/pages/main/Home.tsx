import AboutCom from "../../components/modules/home/AboutCom";
import ContactCom from "../../components/modules/home/ContactCom";
import Hero from "../../components/modules/home/Hero";
import ProjectCom from "../../components/modules/home/ProjectsCom";
import InfiniteMarquee from "../../components/modules/home/InfiniteMarquee";
import HighlightProject from "../../components/modules/home/HighlightProject";


export default function Home() {
    window.scrollTo(0, 0);

    return (
        <>
            <Hero />
            <AboutCom />
            <ProjectCom />
            <InfiniteMarquee />
            <HighlightProject />
            <ContactCom />
        </>
    )
}
