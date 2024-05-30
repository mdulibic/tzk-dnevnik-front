import {Outlet} from "react-router-dom";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";

export function Applayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex-grow flex flex-col  z-0">
                <div className="container px-4 md:px-8 flex-grow flex flex-col">
                    <Outlet/>
                </div>
            </div>
            <div className="bottom-0 w-full z-1">
                <div className="container">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}