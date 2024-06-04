import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {columns} from "@/pages/admin/students/columns.tsx";
import {DataTable} from "@/components/shared/table/data-table.tsx";
import {getStudentsById} from "@/api/users.tsx";
import {Student} from "@/model/Student.ts";

interface StudentListProps {
    classId: string;
}


export const StudentList: React.FC<StudentListProps> = ({classId}) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudentsById(classId);
                setStudents(data);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchStudents();
    }, [classId]);

    if (error) {
        return <>
            <PageHeader>
                <PageHeaderHeading>Popis učenika</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Pogreška pri dohvaćanju podataka</CardTitle>
                    <CardDescription>Došlo je do pogreške prilikom dohvaćanja podataka. Molimo pokušajte ponovno
                        kasnije.</CardDescription>
                </CardHeader>
            </Card>
        </>;
    }

    return (
        <div>
            <PageHeader>
                <PageHeaderHeading>Popis učenika</PageHeaderHeading>
            </PageHeader>
            <DataTable columns={columns} data={students}/>
        </div>
    )
};