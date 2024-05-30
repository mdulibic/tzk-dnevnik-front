import {DataTable} from "@/components/shared/table/data-table.tsx";
import {columns, Student} from "@/pages/admin/students/columns.tsx";
import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {useEffect, useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export type FilterPair = {
    key: string,
    value: string,
};

async function getStudents(): Promise<Student[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/students/all`,
        {
            method: 'GET',
            headers: {
                Origin: origin,
                Authorization: authHeader(),
            },
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Student[];
}


export default function StudentsDashboard() {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudents();
                setStudents(data);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchStudents();
    }, []);

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
}
