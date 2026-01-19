import { lazy, Suspense } from "react";
import DashboardLayoutSkeleton from "../components/shared/Skeleton/DashboardLayoutSkeleton";
import { PrivateRoute } from "./PrivateRoute";

const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

// setting lazy load
const GeneralSetting = lazy(() => import("../pages/admin/GeneralSetting"));
const ContactUs = lazy(() => import("../pages/admin/ContactUs"));

// banner lazy load
const AllBanner = lazy(() => import("../pages/admin/Banner/AllBanner"));
const AddBanner = lazy(() => import("../pages/admin/Banner/AddBanner"));
const EditBanner = lazy(() => import("../pages/admin/Banner/EditBanner"));

const GtmConfig = lazy(() => import("../pages/admin/GtmConfig"));
const About = lazy(() => import("../pages/admin/About/About"));

// team lazy load
const AllTeam = lazy(() => import("../pages/admin/Team/AllTeam"));
const TeamForm = lazy(() => import("../pages/admin/Team/TeamForm"));

// management lazy load
const AllManagement = lazy(() => import("../pages/admin/Management/AllManagement"));
const ManagementForm = lazy(() => import("../pages/admin/Management/ManagementForm"));


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

        // team
        {
            path: "about/team-member/all",
            element: <AllTeam />
        },
        {
            path: "about/team-member/add",
            element: <TeamForm />
        },
        {
            path: "about/team-member/edit/:id",
            element: <TeamForm />
        },

        // management
        {
            path: "about/management/all",
            element: <AllManagement />
        },
        {
            path: "about/management/add",
            element: <ManagementForm />
        },
        {
            path: "about/management/edit/:id",
            element: <ManagementForm />
        }
    ]
}