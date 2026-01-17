import MainLayout from "../layout/MainLayout";
import AboutPage from "../pages/main/About";
import BlogDetails from "../pages/main/BlogDetails";
import Blogs from "../pages/main/Blogs";
import Contact from "../pages/main/Contact";
import Home from "../pages/main/Home";
import ProjectDetails from "../pages/main/ProjectDetails";
import Projects from "../pages/main/Projects";

export const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/project/:id",
            element: <ProjectDetails />
        },
        {
            path: "/about-us",
            element: <AboutPage />
        },
        {
            path: "/projects",
            element: <Projects />
        },
        {
            path: "/contact-us",
            element: <Contact />
        },
        {
            path: "/blogs",
            element: <Blogs />
        },
        {
            path: "/blog/:slug",
            element: <BlogDetails />
        },
    ]
}