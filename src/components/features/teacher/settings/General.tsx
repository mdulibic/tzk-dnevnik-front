import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {IEvent, ISchoolClass} from "@/components/features/teacher/schedule/EventCalendar.tsx";
import {useEffect, useState} from "react";
import {getUserId} from "@/utils.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

interface ITeacher {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    role: string;
    classesTeaching: ISchoolClass[];
    events: IEvent[];
}

export async function fetchTeacherById(teacherId: number): Promise<ITeacher> {
    const response = await fetch(`${BASE_API_URL}/api/teachers/${teacherId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as ITeacher;
}

const General = () => {
    const [teacher, setTeacher] = useState<ITeacher | null>(null);
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
                                    <AvatarImage src="https://i.pravatar.cc/300"/>
                                    <AvatarFallback>{teacher.name.charAt(0)}{teacher.surname.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <p><strong>Ime i prezime:</strong> {teacher.name} {teacher.surname}</p>
                                <p><strong>Korisničko ime:</strong> {teacher.username}</p>
                                <p><strong>Email:</strong> {teacher.email}</p>
                                <p><strong>Razredi:</strong></p>
                                <ul>
                                    {teacher.classesTeaching.map((schoolClass) => (
                                        <li key={schoolClass.id}>
                                            - {schoolClass.year}.{schoolClass.division}
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

