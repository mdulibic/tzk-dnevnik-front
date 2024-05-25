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
import {ProtectedRoute} from "@/ProtectedRoute.tsx";

export const router = createBrowserRouter([
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
                element: <ProtectedRoute><Planer /></ProtectedRoute>,
            },
            {
                path: "students",
                element: <ProtectedRoute><Students /></ProtectedRoute>,
            },
            {
                path: "profile",
                element: <ProtectedRoute><MyProfile /></ProtectedRoute>,
            },
        ],
    },
    {
        path: "/admin",
        element: <Adminlayout />,
        children: [
            {
                path: "",
                element: <ProtectedRoute><RegistrationDashboard /></ProtectedRoute>,
            },
            {
                path: "students",
                element: <ProtectedRoute><StudentsDashboard /></ProtectedRoute>,
            },
            {
                path: "teachers",
                element: <ProtectedRoute><TeachersDashboard /></ProtectedRoute>,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
