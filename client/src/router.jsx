import {createBrowserRouter} from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout.jsx";
import LoggedLayout from "./layouts/LoggedLayout.jsx";
import Login from "./views/Auth/Login.jsx";
import Register from "./views/Auth/Register.jsx";
import NotFoundPage from "./views/NotFoundPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/",
        element: <LoggedLayout />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])