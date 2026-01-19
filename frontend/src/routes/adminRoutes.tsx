import { lazy, Suspense } from "react";
import DashboardLayoutSkeleton from "../components/shared/Skeleton/DashboardLayoutSkeleton";
import { PrivateRoute } from "./PrivateRoute";
import GtmConfig from "@/pages/admin/GtmConfig";
import About from "@/pages/admin/About/About";

const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

// setting lazy load
const GeneralSetting = lazy(() => import("../pages/admin/GeneralSetting"));
const ContactUs = lazy(() => import("../pages/admin/ContactUs"));

// banner lazy load
const AllBanner = lazy(() => import("../pages/admin/Banner/AllBanner"));
const AddBanner = lazy(() => import("../pages/admin/Banner/AddBanner"));
const EditBanner = lazy(() => import("../pages/admin/Banner/EditBanner"));


export const adminRoutes = {
    path: "/admin",
    element: (
        <Suspense fallback={<DashboardLayoutSkeleton />}>
            <PrivateRoute>
                <AdminLayout />
            </PrivateRoute>
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
        {
            path: "setting/general",
            element: <GeneralSetting />
        },
        {
            path: "setting/banner/all",
            element: <AllBanner />
        },
        {
            path: "setting/banner/add",
            element: <AddBanner />
        },
        {
            path: "setting/banner/edit/:id",
            element: <EditBanner />
        },
        {
            path: "setting/gtm-config",
            element: <GtmConfig />
        },
        {
            path: "about",
            element: <About />
        },
    ]
}