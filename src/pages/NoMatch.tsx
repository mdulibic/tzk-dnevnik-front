import {useNavigate} from "react-router-dom";
import {appConfig} from "@/config/app.ts";
import {Icons} from "@/components/shared/icons/icons.tsx";
import {UserRole} from "@/model/UserRole.ts";
import {getUserRole} from "@/utils.ts";
import {Button} from "@/components/ui/button.tsx";

export default function NoMatch() {
    const navigate = useNavigate();

    const handleBack = () => {
        const role = getUserRole();
        switch (role) {
            case UserRole.STUDENT:
                navigate('/student/schedule');
                break;
            case UserRole.TEACHER:
                navigate('/teacher/schedule');
                break;
            case UserRole.ADMIN:
                navigate('/admin/registration');
                break;
            default:
                navigate('/login');
                break;
        }
    }
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className=" text-center space-y-4">
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <Icons.logoLight className="h-16 w-16 mr-2"/>
                        <h1 className="text-3xl font-bold">{appConfig.appName}</h1>
                    </div>
                </div>
                <h2 className="text-8xl text-blue-800 mb-4">404</h2>
                <h1 className="text-3xl font-semibold">Oops! Stranica nije pronađena.</h1>
                <Button
                    onClick={handleBack}
                    className="bg-blue-800 text-white font-bold py-2 px-4 rounded inline-block"
                >
                    Nazad na Početnu
                </Button>
            </div>
        </div>
    )
}
