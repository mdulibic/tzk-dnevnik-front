import {useEffect, useState} from "react";
import {getStudent} from "@/api/users.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Student} from "@/model/Student.ts";

interface IProps {
    studentId: string
}

export const StudentStatistics = ({studentId}: IProps) => {
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
            <PageHeaderHeading>Statistika</PageHeaderHeading>
            <Card>
                <CardContent className="p-8">
                </CardContent>
            </Card>
        </div>
    );
};