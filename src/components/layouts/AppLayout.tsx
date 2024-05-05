import {Outlet} from "react-router-dom";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";

export function Applayout() {
    return (
        <>
            <Header/>
            <div className="flex-grow flex flex-col">
                <div className="container px-4 md:px-8 flex-grow flex flex-col">
                    <Outlet/>
                </div>
            </div>
            <div className="container fixed bottom-0 left-0 w-full">
                <div className="container px-4 md:px-8">
                    <Footer/>
                </div>
            </div>
        </>
    )
}