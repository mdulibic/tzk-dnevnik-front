import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import Planer from "./pages/Planer";
import Students from "./pages/students/Students";
import MyProfile from "./pages/MyProfile";
import NoMatch from "@/pages/NoMatch.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <Planer />,
            },
            {
                path: "students",
                element: <Students />,
            },
            {
                path: "profile",
                element: <MyProfile />,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
