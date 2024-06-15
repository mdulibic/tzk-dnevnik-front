import {DataTable} from "@/components/shared/table/data-table.tsx";
import {columns} from "@/pages/admin/teachers/columns.tsx";
import {PageHeader, PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {useEffect, useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {getTeachersBySchool} from "@/api/users.tsx";
import {Teacher} from "@/model/Teacher.ts";
import {Label} from "@/components/ui/label.tsx";
import SchoolSelect from "@/components/shared/select/SchoolSelect.tsx";

export default function TeachersDashboard() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [schoolId, setSchoolId] = useState<string>("1");

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await getTeachersBySchool(schoolId);
                setTeachers(data);
                setError(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchTeachers();
    }, [schoolId]);

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
        <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-10 space-y-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold">Popis nastavnika</h1>
                <div className="space-y-2">
                    <Label htmlFor="school">Škola:</Label>
                    <SchoolSelect
                        selectedSchool={schoolId.toString()}
                        onChange={setSchoolId}
                    />
                </div>
            </div>
            <DataTable columns={columns} data={teachers}/>
        </main>
    )
}
