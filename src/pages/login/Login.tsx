import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Icons} from "@/components/shared/icons/icons.tsx";
import {Player} from '@lottiefiles/react-lottie-player';

import {Link} from 'react-router-dom';
import {useState} from 'react';
import {PasswordInput} from "@/components/shared/input/password-input.tsx";
import {useNavigate} from 'react-router-dom';
import {toast} from "@/components/ui/use-toast.ts";
import {loginUser} from "@/api/auth.tsx";
import {UserRole} from "@/model/UserRole.ts";
import {getUserRole} from "@/utils.ts";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleLogin = async () => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('user', JSON.stringify(data));
            setInvalidCredentials(false);

            toast({
                title: "Prijava uspješna!",
                description: "Dobrodošli natrag.",
            });

            const role = getUserRole();

            switch (role) {
                case UserRole.STUDENT:
                    navigate('/student')
                    break;
                case UserRole.TEACHER:
                    navigate('/teacher')
                    break;
                case UserRole.ADMIN:
                    navigate('/admin')
                    break;
                default:
                    navigate('/login')
                    break;
            }

        } catch (error) {
            console.error('Error logging in:', error);
            setInvalidCredentials(true);

            toast({
                duration: 2000,
                variant: "destructive",
                title: "Prijava neuspješna!",
                description: "Provjerite svoje korisničko ime i lozinku i pokušajte ponovno.",
            });
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="border border-gray-100 flex items-center justify-center">
                <Player
                    src='https://lottie.host/3e254137-8415-4679-96bf-384e2689c81f/thZKQZDSBL.json'
                    className="h-920 w-920"
                    loop
                    autoplay
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Prijava</h1>
                        <p className="text-balance text-muted-foreground">
                            Prijava u sustav e-TZK dnevnik
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Korisničko ime</Label>
                            <Input
                                id="username"
                                type="username"
                                placeholder="peroperic"
                                required
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setInvalidCredentials(false); // Reset invalidCredentials state
                                }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Lozinka</Label>
                            </div>
                            <PasswordInput
                                id="password"
                                value={password}
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setInvalidCredentials(false); // Reset invalidCredentials state
                                }}
                                autoComplete="new-password"
                            />
                        </div>
                        <Button type="submit" className="w-full" onClick={handleLogin}>
                            Prijava
                        </Button>
                        {invalidCredentials && (
                            <p className="text-sm text-bold text-red-500 text-center">
                                Neispravno korisničko ime/lozinka!
                            </p>
                        )}
                        <Link to="http://localhost:8080/oauth2/authorization/google" className="w-full">
                            <Button variant="outline" className="w-full">
                                <Icons.googleLogo className="h-8 w-8"/>Prijava sa Google računom
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
