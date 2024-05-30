import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "@/components/shared/layouts/AppLayout";

import Planer from "@/pages/teacher/planer/Planer.tsx";
import Students from "@/pages/teacher/students/Students";
import MyProfile from "./pages/teacher/profile/MyProfile.tsx";
import NoMatch from "@/pages/NoMatch.tsx";
import Login from "@/pages/login/Login.tsx";
import TeachersDashboard from "@/pages/admin/teachers/TeachersDashboard.tsx";
import {RegistrationDashboard} from "@/pages/admin/registration/RegistrationDashboard.tsx";
import StudentsDashboard from "@/pages/admin/students/StudentsDashboard.tsx";
import {Adminlayout} from "@/components/shared/layouts/AdminLayout.tsx";
import {ProtectedRoute} from "@/components/core/ProtectedRoute.tsx";
import {ImportUsersDashboard} from "@/pages/admin/import-users/ImportUsersDashboard.tsx";

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
            {
                path: "import",
                element: <ProtectedRoute><ImportUsersDashboard></ImportUsersDashboard></ProtectedRoute>,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
