import {Outlet} from "react-router-dom";
import {AdminHeader} from "./header/AdminHeader.tsx";
import {Footer} from "./Footer.tsx";
import {Toaster} from "@/components/ui/toaster.tsx"
import {UserRole} from "@/model/UserRole.ts";
import {getUserRole} from "@/utils.ts";
import {TeacherHeader} from "@/components/shared/layouts/header/TeacherHeader.tsx";
import {StudentHeader} from "@/components/shared/layouts/header/StudentHeader.tsx";

export function AppLayout() {
    const role = getUserRole();
    let HeaderComponent;

    switch (role) {
        case UserRole.ADMIN:
            HeaderComponent = AdminHeader;
            break;
        case UserRole.TEACHER:
            HeaderComponent = TeacherHeader;
            break;
        case UserRole.STUDENT:
            HeaderComponent = StudentHeader;
            break;
        default:
            HeaderComponent = () => <div>No valid role</div>;
    }
    return (
        <div className="flex flex-col min-h-screen bg-muted/30">
            <HeaderComponent/>
            <div className="flex-1 p-16 sm:p-8 md:p-4">
                <Outlet/>
                <Toaster/>
            </div>
            <div className="container w-full">
                <div className="container py-4 md:px-8">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}