import { lazy, Suspense } from "react";
import ContactUs from "../pages/admin/ContactUs";


const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));


export const adminRoutes = {
    path: "/admin",
    element: (
        <Suspense fallback={<p>Loading...</p>}>
            <AdminLayout />
        </Suspense>
    ),
    children: [
        {
            path: "dashboard",
            element: <Dashboard />
        },
        {
            path: "contact-us",
            element: <ContactUs />
        },
    ]
}