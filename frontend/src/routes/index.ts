import { createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./mainRoutes";
import { adminRoutes } from "./adminRoutes";

export const router = createBrowserRouter([mainRoutes, adminRoutes]);
