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
import SchoolClassSelect from "@/components/shared/select/SchoolClassSelect.tsx";
import {PasswordInput} from "@/components/shared/input/password-input.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import authHeader from "@/auth-header.tsx";
import {useNavigate} from "react-router-dom";
import {Student} from "@/model/Student.ts";

interface StudentDialogProps {
    student: Student;
}

const StudentUpdateDialog: React.FC<StudentDialogProps> = ({student}) => {
    const [name, setName] = useState(student.name);
    const [surname, setSurname] = useState(student.surname);
    const [username, setUsername] = useState(student.username);
    const [email, setEmail] = useState(student.email);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [classId, setClassId] = useState<string>(String(student.schoolClass.id));
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

    const handleStudentUpdate = async () => {
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
            const response = await fetch(BASE_API_URL + '/api/students/update', {
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
                        classId: classId,
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
                <DialogDescription>Ažuriraj podatke učenika.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Ime
                    </Label>
                    <Input
                        id="name"
                        defaultValue={student.name}
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
                        defaultValue={student.surname}
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
                        defaultValue={student.username}
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
                        defaultValue={student.email}
                        className="col-span-3"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="school-class" className="text-right">
                        Razred
                    </Label>
                    <SchoolClassSelect
                        schoolId={String(student.schoolClass.school.id)}
                        selectedClass={classId.toString()}
                        onChange={setClassId}
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
                    <Button type="submit" onClick={handleStudentUpdate}>Spremi</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default StudentUpdateDialog;
