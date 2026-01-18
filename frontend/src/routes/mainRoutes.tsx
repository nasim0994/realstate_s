import { lazy, Suspense } from "react";

// Lazy imports
const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/main/Home"));
const ProjectDetails = lazy(() => import("../pages/main/ProjectDetails"));
const AboutPage = lazy(() => import("../pages/main/About"));
const Projects = lazy(() => import("../pages/main/Projects"));
const Contact = lazy(() => import("../pages/main/Contact"));
const Blogs = lazy(() => import("../pages/main/Blogs"));
const BlogDetails = lazy(() => import("../pages/main/BlogDetails"));

export const mainRoutes = {
    path: "/",
    element: (
        <Suspense fallback={<p>Loading...</p>}>
            <MainLayout />
        </Suspense>
    ),
    children: [
        { path: "/", element: <Home /> },
        { path: "/project/:id", element: <ProjectDetails /> },
        { path: "/about-us", element: <AboutPage /> },
        { path: "/projects", element: <Projects /> },
        { path: "/contact-us", element: <Contact /> },
        { path: "/blogs", element: <Blogs /> },
        { path: "/blog/:slug", element: <BlogDetails /> },
    ]
}