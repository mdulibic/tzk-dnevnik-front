import {Image} from "antd";
import {Button} from "@/components/ui/button"
import loginImage from '../assets/login.png';
import googleLogo from '../assets/googleLogo.svg';

export function Login() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex justify-center items-center bg-green-100 h-full lg:h-auto">
                <Image
                    src={loginImage}
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">E-Tzk Dnevnik</h1>
                        <p className="text-balance text-muted-foreground">
                            Prijavite se svojim Google računom!
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-gray-300 bg-cta-button text-white"
                        onClick={() => {
                            // TODO
                        }}
                    >
                        <Image
                            width={32}
                            height={32}
                            className="mr-2 h-4 w-4 gap-6"
                            src={googleLogo}
                        /> Prijava sa Google računom
                    </Button>
                    </div>
                </div>
        </div>
    )
}

export default Login;