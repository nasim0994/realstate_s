import { lazy, Suspense } from "react";
import MainLayoutSkeleton from "../components/shared/Skeleton/MainLayoutSkeleton";
import { Navigate } from "react-router-dom";
import ClientTestimonials from "@/pages/main/media/ClientTestimonials";
import PressRelease from "@/pages/main/media/PressRelease";
import PressReleaseDetails from "@/pages/main/media/PressReleaseDetails";
import OnlineNews from "@/pages/main/media/OnlineNews";
import TvNews from "@/pages/main/media/TvNews";
import TvNewsDetails from "@/pages/main/media/TvNewsDetails";
import ChairmanQuote from "@/pages/main/media/ChairmanQuote";
import ChairmanMessages from "@/pages/main/about/ChairmanMessages";
import ChairmanQuoteDetails from "@/pages/main/media/ChairmanQuoteDetails";
import OurConcerns from "@/pages/main/about/OurConcerns";
import ConcernsDetails from "@/pages/main/about/OurConcernDetails";
import OurTeam from "@/pages/main/about/OurTeam";
import Awards from "@/pages/main/Awards";

// Lazy imports
const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/main/Home"));
const ProjectDetails = lazy(() => import("../pages/main/ProjectDetails"));
const AboutPage = lazy(() => import("../pages/main/about/About"));
const Projects = lazy(() => import("../pages/main/Projects"));
const Contact = lazy(() => import("../pages/main/Contact"));
const Blogs = lazy(() => import("../pages/main/Blogs"));
const BlogDetails = lazy(() => import("../pages/main/BlogDetails"));
const PrivacyPolicy = lazy(() => import("../pages/main/PrivacyPolicy"));
const Appointment = lazy(() => import("../pages/main/Appointment"));

const PhotoArchive = lazy(() => import("../pages/main/media/PhotoGalleries"));
const PhotoArchiveDetails = lazy(() => import("../pages/main/media/PhotoGalleryDetails"));
const VideoArchive = lazy(() => import("../pages/main/media/VideoGalleries"));
const VideoArchiveDetails = lazy(() => import("../pages/main/media/VideoGalleryDetails"));

export const mainRoutes = {
    path: "/",
    element: (
        <Suspense fallback={<MainLayoutSkeleton />}>
            <MainLayout />
        </Suspense>
    ),
    children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Navigate to="/" replace /> },
        { path: "/projects", element: <Projects /> },
        { path: "/project/:slug", element: <ProjectDetails /> },
        { path: "/contact-us", element: <Contact /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/appointment", element: <Appointment /> },

        // about routes
        { path: "/about/chairman-message", element: <ChairmanMessages /> },
        { path: "/about/company-profile", element: <AboutPage /> },
        { path: "/about/our-concerns", element: <OurConcerns /> },
        { path: "/about/our-concerns/:slug", element: <ConcernsDetails /> },
        { path: "/about/our-team", element: <OurTeam /> },

        { path: "/awards", element: <Awards /> },


        // media routes
        { path: "/media/chairman-quote", element: <ChairmanQuote /> },
        { path: "/media/chairman-quote/:slug", element: <ChairmanQuoteDetails /> },
        { path: "/media/photo-galleries", element: <PhotoArchive /> },
        { path: "/media/photo-gallery/:slug", element: <PhotoArchiveDetails /> },
        { path: "/media/video-galleries", element: <VideoArchive /> },
        { path: "/media/video-gallery/:slug", element: <VideoArchiveDetails /> },
        { path: "/media/happy-clients", element: <ClientTestimonials /> },
        { path: "/media/press-release", element: <PressRelease /> },
        { path: "/media/press-release/:slug", element: <PressReleaseDetails /> },
        { path: "/media/online-news", element: <OnlineNews /> },
        { path: "/media/tv-news", element: <TvNews /> },
        { path: "/media/tv-news/:slug", element: <TvNewsDetails /> },
        { path: "/media/blogs", element: <Blogs /> },
        { path: "/media/blog/:slug", element: <BlogDetails /> },
    ]
}