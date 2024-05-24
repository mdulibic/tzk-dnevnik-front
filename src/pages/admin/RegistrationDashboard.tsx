import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {BASE_API_URL} from "@/constants.tsx";

export function RegistrationDashboard() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    const {toast} = useToast()

    const handleRegistration = async () => {
        try {
            const response = await fetch(BASE_API_URL + '/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, surname, username, email, role, password})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setName("");
            setSurname("");
            setUsername("");
            setEmail("");
            setRole("");
            setPassword("");

            toast({
                title: "Registracija uspješna!",
                description: "Novi korisnik dodan u sustav.",
            })
        } catch (error) {
            console.error('Error logging in:', error);

            setName("");
            setSurname("");
            setUsername("");
            setEmail("");
            setRole("");
            setPassword("");

            toast({
                duration: 2000,
                variant: "destructive",
                title: "Registracija neuspješna!",
                description: "Provjerite podatke i pokušajte ponovno.",
            })
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Registracija korisnika</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Ime</Label>
                            <Input
                                id="first-name"
                                placeholder="Ivan"
                                required
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Prezime</Label>
                            <Input
                                id="last-name"
                                placeholder="Horvat"
                                required
                                value={surname}
                                onChange={(e) => {
                                    setSurname(e.target.value);
                                }}/>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Korisničko ime</Label>
                        <Input
                            id="username"
                            placeholder="ihorvat"
                            required
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ivan.horvat@gmail.com"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Rola</Label>
                        <Select value={role} onValueChange={(value) => {
                            setRole(value);
                        }}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Odaberite rolu"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="ROLE_STUDENT">Učenik</SelectItem>
                                    <SelectItem value="ROLE_TEACHER">Nastavnik</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}/>
                    </div>
                    <Button type="submit" className="w-full" onClick={handleRegistration}>
                        Registracija
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


