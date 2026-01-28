import { lazy, Suspense } from "react";
import DashboardLayoutSkeleton from "../components/shared/Skeleton/DashboardLayoutSkeleton";
import { PrivateRoute } from "./PrivateRoute";
import { Navigate } from "react-router-dom";
import AllConcernProducts from "@/pages/admin/About/concerns/AllConcernProducts";
import ConcernProductForm from "@/pages/admin/About/concerns/ConcernProductForm";

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

const MyProfile = lazy(() => import("../pages/admin/Profile/MyProfile"));
const UpdatePassword = lazy(() => import("../pages/admin/Profile/UpdatePassword"));
const SeoSettings = lazy(() => import("../pages/admin/Seo"));
const ContactMessage = lazy(() => import("../pages/admin/ContactMessage"));

const AllBlogs = lazy(() => import("../pages/admin/blog/AllBlogs"));
const BlogForm = lazy(() => import("../pages/admin/blog/BlogsForm"));

const AllProjectType = lazy(() => import("../pages/admin/Project/AllProjectType"));
const AllProjects = lazy(() => import("../pages/admin/Project/AllProjects"));
const ProjectForm = lazy(() => import("../pages/admin/Project/ProjectForm"));

const AllRole = lazy(() => import("../pages/admin/Role/AllRole"));
const AllUsers = lazy(() => import("../pages/admin/User/AllUsers"));

const TeamCategory = lazy(() => import("../pages/admin/Team/TeamCategory"));
const AllAwards = lazy(() => import("../pages/admin/awards/AllAwards"));
const AwardsForm = lazy(() => import("../pages/admin/awards/AwardsForm"));
const AllMoreAbout = lazy(() => import("../pages/admin/About/moreAbout/AllMoreAbout"));
const MoreAboutForm = lazy(() => import("../pages/admin/About/moreAbout/MoreAboutForm"));
const AllConcerns = lazy(() => import("../pages/admin/About/concerns/AllConcerns"));
const ConcernsForm = lazy(() => import("../pages/admin/About/concerns/ConcernsForm"));
const AllAppointment = lazy(() => import("../pages/admin/AllAppointment"));



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
            index: true,
            element: <Navigate to="/admin/dashboard" replace />
        },
        {
            path: "dashboard",
            element: <Dashboard />
        },
        // project
        {
            path: "projects/type/all",
            element: <AllProjectType />
        },
        {
            path: "projects/all",
            element: <AllProjects />
        },
        {
            path: "projects/add",
            element: <ProjectForm />
        },
        {
            path: "projects/edit/:id",
            element: <ProjectForm />
        },
        // blogs
        {
            path: "archives",
            children: [
                // blog
                {
                    path: "blogs/all",
                    element: <AllBlogs />
                },
                {
                    path: "blogs/add",
                    element: <BlogForm />
                },
                {
                    path: "blogs/edit/:id",
                    element: <BlogForm />
                },
            ]
        },

        {
            path: "contact-us",
            element: <ContactUs />
        },
        {
            path: "contact-message",
            element: <ContactMessage />
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

        // about
        {
            path: "about",
            children: [
                {
                    path: "",
                    element: <About />
                },

                // more about
                {
                    path: "more/all",
                    element: <AllMoreAbout />
                },
                {
                    path: "more/add",
                    element: <MoreAboutForm />
                },
                {
                    path: "more/edit/:id",
                    element: <MoreAboutForm />
                },

                // concerns
                {
                    path: "concerns/all",
                    element: <AllConcerns />
                },
                {
                    path: "concerns/add",
                    element: <ConcernsForm />
                },
                {
                    path: "concerns/edit/:id",
                    element: <ConcernsForm />
                },

                // concern products
                {
                    path: "concerns/product/all",
                    element: <AllConcernProducts />
                },
                {
                    path: "concerns/product/add",
                    element: <ConcernProductForm />
                },
                {
                    path: "concerns/product/edit/:id",
                    element: <ConcernProductForm />
                },

                // team
                {
                    path: "team/category/all",
                    element: <TeamCategory />
                },
                {
                    path: "team/all",
                    element: <AllTeam />
                },
                {
                    path: "team/add",
                    element: <TeamForm />
                },
                {
                    path: "team/edit/:id",
                    element: <TeamForm />
                },

                // management
                {
                    path: "management/all",
                    element: <AllManagement />
                },
                {
                    path: "management/add",
                    element: <ManagementForm />
                },
                {
                    path: "management/edit/:id",
                    element: <ManagementForm />
                },
            ]
        },

        // awards
        {
            path: "awards/all",
            element: <AllAwards />
        },
        {
            path: "awards/add",
            element: <AwardsForm />
        },
        {
            path: "awards/edit/:id",
            element: <AwardsForm />
        },

        // appointments
        {
            path: "appointments/all",
            element: <AllAppointment />
        },



        {
            path: "profile/my-profile",
            element: <MyProfile />
        },
        {
            path: "profile/update-password",
            element: <UpdatePassword />
        },
        {
            path: "user-role/role-management",
            element: <AllRole />
        },
        {
            path: "user-role/user-management",
            element: <AllUsers />
        },
        {
            path: "seo",
            element: <SeoSettings />
        },
    ]
}