import { lazy, Suspense } from "react";
import MainLayoutSkeleton from "../components/shared/Skeleton/MainLayoutSkeleton";
import { Navigate } from "react-router-dom";

// Lazy imports
const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/main/Home"));
const ProjectDetails = lazy(() => import("../pages/main/ProjectDetails"));
const AboutPage = lazy(() => import("../pages/main/About"));
const Projects = lazy(() => import("../pages/main/Projects"));
const Contact = lazy(() => import("../pages/main/Contact"));
const Blogs = lazy(() => import("../pages/main/Blogs"));
const BlogDetails = lazy(() => import("../pages/main/BlogDetails"));
const PrivacyPolicy = lazy(() => import("../pages/main/PrivacyPolicy"));
const Appointment = lazy(() => import("../pages/main/Appointment"));

const PhotoArchive = lazy(() => import("../pages/main/archive/PhotoArchive"));
const PhotoArchiveDetails = lazy(() => import("../pages/main/archive/PhotoArchiveDetails"));
const VideoArchive = lazy(() => import("../pages/main/archive/VideoArchive"));
const VideoArchiveDetails = lazy(() => import("../pages/main/archive/VideoArchiveDetails"));

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
        { path: "/about-us", element: <AboutPage /> },
        { path: "/projects", element: <Projects /> },
        { path: "/project/:slug", element: <ProjectDetails /> },
        { path: "/contact-us", element: <Contact /> },
        { path: "/blogs", element: <Blogs /> },
        { path: "/blog/:slug", element: <BlogDetails /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/appointment", element: <Appointment /> },
        // archive
        { path: "/archives/photo-archives", element: <PhotoArchive /> },
        { path: "/archives/photo-archive/:slug", element: <PhotoArchiveDetails /> },
        { path: "/archives/video-archives", element: <VideoArchive /> },
        { path: "/archives/video-archive/:slug", element: <VideoArchiveDetails /> },
    ]
}