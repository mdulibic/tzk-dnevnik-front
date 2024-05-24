import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import Planer from "./pages/Planer";
import Students from "./pages/students/Students";
import MyProfile from "./pages/MyProfile";
import NoMatch from "@/pages/NoMatch.tsx";
import Login from "@/pages/Login.tsx";
import TeachersDashboard from "@/pages/admin/teachers/TeachersDashboard.tsx";
import {RegistrationDashboard} from "@/pages/admin/RegistrationDashboard.tsx";
import StudentsDashboard from "@/pages/admin/students/StudentsDashboard.tsx";
import {Adminlayout} from "@/components/layouts/admin/AdminLayout.tsx";

export const router = createBrowserRouter([
    {
        path: "/admin",
        element: <TeachersDashboard />,
    },
    {
        path: "/login",
        element: <Login />,
    },
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
        path: "/admin",
        element: <Adminlayout />,
        children: [
            {
                path: "",
                element: <RegistrationDashboard />,
            },
            {
                path: "students",
                element: <StudentsDashboard />,
            },
            {
                path: "teachers",
                element: <TeachersDashboard />,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
