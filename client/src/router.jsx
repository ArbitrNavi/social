import {createBrowserRouter} from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout.jsx";
import LoggedLayout from "./layouts/LoggedLayout.jsx";
import Login from "./views/Auth/Login.jsx";
import Register from "./views/Auth/Register.jsx";
import NotFoundPage from "./views/NotFoundPage.jsx";
import App from "./views/App/App.jsx";
import News from "./views/App/app_components/News/News.jsx";
import Profile from "./views/App/app_components/Profile/Profile.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoggedLayout />,
        children: [
            {
                path: "/",
                element: <App />,
                children: [
                    {
                        path: "news",
                        element: <News />
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    }
                ]
            }
        ]
    },
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
        path: "*",
        element: <NotFoundPage />
    }
])