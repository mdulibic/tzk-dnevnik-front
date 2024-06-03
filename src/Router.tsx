import { createBrowserRouter } from "react-router-dom";

import { TeacherLayout } from "@/components/shared/layouts/TeacherLayout.tsx";

import Schedule from "@/pages/teacher/schedule/Schedule.tsx";
import Students from "@/pages/teacher/students/Students";
import Settings from "@/pages/teacher/settings/Settings.tsx";
import NoMatch from "@/pages/NoMatch.tsx";
import Login from "@/pages/login/Login.tsx";
import TeachersDashboard from "@/pages/admin/teachers/TeachersDashboard.tsx";
import {RegistrationDashboard} from "@/pages/admin/registration/RegistrationDashboard.tsx";
import StudentsDashboard from "@/pages/admin/students/StudentsDashboard.tsx";
import {Adminlayout} from "@/components/shared/layouts/AdminLayout.tsx";
import {AdminRoute, TeacherRoute} from "@/components/core/ProtectedRoute.tsx";
import {ImportUsersDashboard} from "@/pages/admin/import-users/ImportUsersDashboard.tsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <TeacherLayout />,
        children: [
            {
                path: "",
                element: <TeacherRoute><Schedule /></TeacherRoute>,
            },
            {
                path: "students",
                element: <TeacherRoute><Students /></TeacherRoute>,
            },
            {
                path: "settings",
                element: <TeacherRoute><Settings /></TeacherRoute>,
            },
        ],
    },
    {
        path: "/admin",
        element: <Adminlayout />,
        children: [
            {
                path: "",
                element: <AdminRoute><RegistrationDashboard /></AdminRoute>,
            },
            {
                path: "students",
                element: <AdminRoute><StudentsDashboard /></AdminRoute>,
            },
            {
                path: "teachers",
                element: <AdminRoute><TeachersDashboard /></AdminRoute>,
            },
            {
                path: "import",
                element: <AdminRoute><ImportUsersDashboard></ImportUsersDashboard></AdminRoute>,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
