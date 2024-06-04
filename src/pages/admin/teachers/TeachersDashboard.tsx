import {DataTable} from "@/components/shared/table/data-table.tsx";
import {columns} from "@/pages/admin/teachers/columns.tsx";
import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {useEffect, useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {getTeachers} from "@/api/users.tsx";
import {Teacher} from "@/model/Teacher.ts";

export default function TeachersDashboard() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await getTeachers();
                setTeachers(data);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchTeachers();
    }, []);

    if (error) {
        return <>
            <PageHeader>
                <PageHeaderHeading>Popis nastavnika</PageHeaderHeading>
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
                <PageHeaderHeading>Popis nastavnika</PageHeaderHeading>
            </PageHeader>
            <DataTable columns={columns} data={teachers}/>
        </div>
    )
}
