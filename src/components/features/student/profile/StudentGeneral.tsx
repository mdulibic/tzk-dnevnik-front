import {useEffect, useState} from "react";
import {getStudent} from "@/api/users.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Student} from "@/model/Student.ts";
import {getCurrentSchoolYear} from "@/utils.ts";

interface IProps {
   studentId: string
}

export const StudentGeneral = ({studentId}: IProps) => {
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const getTeacher = async () => {
            try {
                const data = await getStudent(studentId);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getTeacher();
    }, [studentId]);

    return (
        <div className="space-y-4">
            <PageHeaderHeading>Općenito</PageHeaderHeading>
            <Card>
                <CardContent className="p-8">
                    {student ? (
                        <div className="space-y-4 flex gap-8">
                            <div className="flex-shrink-0">
                                <Avatar className="w-48 h-48">
                                    <AvatarImage src={`https://avatar.iran.liara.run/username?username=${student.name}+${student.surname}`} />
                                    <AvatarFallback>{student.name.charAt(0)}{student.surname.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-2">
                                <p><strong>Ime i prezime:</strong> {student.name} {student.surname}</p>
                                <p><strong>Korisničko ime:</strong> {student.username}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Škola:</strong> {student.schoolClass.school.name}, {student.schoolClass.school.county}, {student.schoolClass.school.city}</p>
                                <p><strong>Razred:</strong> {student.schoolClass.year}.{student.schoolClass.division} ({getCurrentSchoolYear()})</p>
                            </div>
                        </div>
                    ) : (
                        <p>Učitavanje podataka</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};