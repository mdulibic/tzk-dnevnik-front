import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {getUserId} from "@/utils.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Teacher} from "@/model/Teacher.ts";
import {fetchTeacherById} from "@/api/users.tsx";

const General = () => {
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const teacherId = getUserId();

    useEffect(() => {
        const getTeacher = async () => {
            try {
                const data = await fetchTeacherById(teacherId);
                setTeacher(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getTeacher();
    }, [teacherId]);

    return (
        <div className="space-y-4">
            <PageHeaderHeading>Općenito</PageHeaderHeading>
            <Card>
                <CardContent className="p-8">
                    {teacher ? (
                        <div className="space-y-4 flex gap-8">
                            <div className="flex-shrink-0">
                                <Avatar className="w-48 h-48">
                                    <AvatarImage src={`https://avatar.iran.liara.run/username?username=${teacher.name}+${teacher.surname}`} />
                                    <AvatarFallback>{teacher.name.charAt(0)}{teacher.surname.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-2">
                                <p><strong>Ime i prezime:</strong> {teacher.name} {teacher.surname}</p>
                                <p><strong>Korisničko ime:</strong> {teacher.username}</p>
                                <p><strong>Email:</strong> {teacher.email}</p>
                                <p><strong>Škola:</strong> {teacher.school.name}, {teacher.school.county}, {teacher.school.city}</p>
                                <p><strong>Razredi:</strong></p>
                                <ul>
                                    {teacher.classesTeaching.map((schoolClass) => (
                                        <li key={schoolClass.id}>
                                            {schoolClass.year}.{schoolClass.division}
                                        </li>
                                    ))}
                                </ul>
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

export default General;

