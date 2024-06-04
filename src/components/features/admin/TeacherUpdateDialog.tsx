import React, {useState} from 'react';
import {Button} from "@/components/ui/button.tsx"
import {
    DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {PasswordInput} from "@/components/shared/input/password-input.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import authHeader from "@/auth-header.tsx";
import {useNavigate} from "react-router-dom";
import SchoolClassMultiSelect from "@/components/features/admin/SchoolClassMultiSelect.tsx";
import {Teacher} from "@/model/Teacher.ts";

interface TeacherUpdateProps {
    teacher: Teacher;
}

const TeacherUpdateDialog: React.FC<TeacherUpdateProps> = ({teacher}) => {
    const [name, setName] = useState(teacher.name);
    const [surname, setSurname] = useState(teacher.surname);
    const [username, setUsername] = useState(teacher.username);
    const [email, setEmail] = useState(teacher.email);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [classIds, setClassIds] = useState<string[]>(teacher.classesTeaching.map(sc => String(sc.id)));
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }

    const handlePasswordChange = (newPassword: string): boolean => {
        if (newPassword !== password) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
            return true;
        }
    };

    const handleTeacherUpdate = async () => {
        const passwordsMatch = password === passwordConfirmation;
        if (!passwordsMatch) {
            toast({
                duration: 2000,
                variant: "destructive",
                title: "Ažuriranje neuspješno!",
                description: "Provjerite podatke i pokušajte ponovno.",
            })
            return;
        }

        try {
            const response = await fetch(BASE_API_URL + '/api/teachers/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader(),
                },
                body: JSON.stringify(
                    {
                        name: name,
                        surname: surname,
                        username: username,
                        email: email,
                        password: password,
                        classIds: classIds,
                    }
                )
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast({
                title: "Podaci ažurirani!",
                description: "Podaci o učeniku su uspješno ažurirani!",
            })
            refreshPage()
        } catch (error) {
            console.error('Update error:', error);

            toast({
                duration: 2000,
                variant: "destructive",
                title: "Ažuriranje neuspješno!",
                description: "Provjerite podatke i pokušajte ponovno.",
            })
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Uredi profil</DialogTitle>
                <DialogDescription>Ažuriraj podatke nastavnika.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Ime
                    </Label>
                    <Input
                        id="name"
                        defaultValue={teacher.name}
                        className="col-span-3"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="surname" className="text-right">
                        Prezime
                    </Label>
                    <Input
                        id="surname"
                        defaultValue={teacher.surname}
                        className="col-span-3"
                        onChange={(e) => {
                            setSurname(e.target.value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Korisničko ime
                    </Label>
                    <Input
                        id="username"
                        defaultValue={teacher.username}
                        className="col-span-3"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        defaultValue={teacher.email}
                        className="col-span-3"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="space-y-4">
                    <Label htmlFor="school-class" className="text-right">
                        Razredi
                    </Label>
                    <SchoolClassMultiSelect
                        selectedClassIds={classIds}
                        onChange={setClassIds}
                    />
                </div>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="password">Nova lozinka</Label>
                        <PasswordInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password_confirmation">Potvrdi lozinku</Label>
                        <PasswordInput
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                setPasswordError(false);
                                setPasswordConfirmation(e.target.value);
                                if (passwordConfirmation.length >= password.length) {
                                    handlePasswordChange(passwordConfirmation);
                                }
                            }}
                            autoComplete="new-password"
                        />
                    </div>
                    {passwordError && (
                        <p className="text-sm text-bold text-red-500 text-center">
                            Lozinke se ne podudaraju!
                        </p>
                    )}
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild disabled={passwordError}>
                    <Button type="submit" onClick={handleTeacherUpdate}>Spremi</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default TeacherUpdateDialog;
