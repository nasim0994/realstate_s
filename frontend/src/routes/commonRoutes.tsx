import Login from "../pages/Login/Login";

export const commonRoutes = {
    path: "/",
    children: [
        {
            path: "login",
            element: <Login />
        }
    ]
}