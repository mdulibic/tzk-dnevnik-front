import {DataTable} from "@/components/shared/table/data-table.tsx";
import {columns} from "@/pages/admin/students/columns.tsx";
import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {useEffect, useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {getStudentsBySchool} from "@/api/users.tsx";
import {Student} from "@/model/Student";
import {Label} from "@/components/ui/label.tsx";
import SchoolSelect from "@/components/shared/select/SchoolSelect.tsx";

export type FilterPair = {
    key: string,
    value: string,
};


export default function StudentsDashboard() {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [schoolId, setSchoolId] = useState<string>("1");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getStudentsBySchool(schoolId);
                setStudents(data);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchStudents();
    }, [schoolId]);

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
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-10 space-y-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold">Popis učenika</h1>
                <div className="space-y-2">
                    <Label htmlFor="school">Škola:</Label>
                    <SchoolSelect
                        selectedSchool={schoolId.toString()}
                        onChange={setSchoolId}
                    />
                </div>
            </div>
            <div>
                <DataTable columns={columns} data={students}/>
            </div>
        </main>
    )
}
