import MainLayout from "../layout/MainLayout";
import AboutPage from "../pages/main/About";
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
    ]
}