import MainLayout from "../layout/MainLayout";
import Home from "../pages/main/Home";

export const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        }
    ]
}