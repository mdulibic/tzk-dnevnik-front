import {Button} from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {registerUser} from "@/api/auth.tsx";
import {User} from "@/model/User.ts";
import SchoolSelect from "@/components/shared/select/SchoolSelect.tsx";
import SchoolClassMultiSelect from "@/components/features/admin/SchoolClassMultiSelect.tsx";
import {PasswordInput} from "@/components/shared/input/password-input.tsx";

export function RegistrationDashboard() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [schoolId, setSchoolId] = useState<string>("1");
    const [classIds, setClassIds] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();

    const {toast} = useToast()

    const handleRegistration = async () => {
        try {
            if (role === 'ROLE_STUDENT' && classIds.length > 1) {
                setErrorMessage('Učenik može biti upisan samo u jedan razred!')
                return;
            }

            const userData: User = {name, surname, username, email, role, password, schoolId, classIds};

            await registerUser(userData);

            setName("");
            setSurname("");
            setUsername("");
            setEmail("");
            setRole("");
            setPassword("");
            setErrorMessage("")

            toast({
                title: "Registracija uspješna!",
                description: "Novi korisnik dodan u sustav.",
            });
        } catch (error) {
            console.error('Error registering user:', error);

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
            });
        }
    };

    const isDisabled = () => {
        return name === "" || surname === "" || username === "" || email === "" || role === "";
    }

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
                        <Label htmlFor="school">Škola</Label>
                        <SchoolSelect
                            selectedSchool={schoolId.toString()}
                            onChange={setSchoolId}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="class">Razred</Label>
                        <SchoolClassMultiSelect
                            schoolId={schoolId.toString()}
                            selectedClassIds={classIds}
                            onChange={(ids) => {
                                setErrorMessage(undefined)
                                setClassIds(ids)
                            }}
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-bold text-red-500">
                            {errorMessage}
                        </p>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            value={password}
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            autoComplete="new-password"
                        />
                    </div>
                    <Button type="submit" className="w-full" onClick={handleRegistration} disabled={isDisabled()}>
                        Registracija
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


