import {Outlet} from "react-router-dom";
import {AdminHeader} from "./AdminHeader.tsx";
import {Footer} from "../Footer.tsx";
import { Toaster } from "@/components/ui/toaster"

export function Adminlayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeader/>
            <div className="flex-grow flex flex-col">
                <div className="container px-4 md:px-8 flex-grow flex flex-col pt-8">
                    <Outlet/>
                    <Toaster />
                </div>
            </div>
            <div className="container bottom-0 left-0 w-full">
                <div className="container px-4 md:px-8">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}