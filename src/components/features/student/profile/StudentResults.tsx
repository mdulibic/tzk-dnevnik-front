import {useEffect, useState} from "react";
import {downloadExcel, fetchResultsByStudentId} from "@/api/results.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {ResultsDataTable} from "@/components/shared/table/results-data-table.tsx";
import {ResultInfo} from "@/components/features/teacher/students/results/Results.tsx";
import {formatDateTime} from "@/utils.ts";
import { columns } from "./columns";
import {Button} from "@/components/ui/button.tsx";

interface ResultsProps {
    studentId: string;
    schoolYear: string;
}

export const StudentResults: React.FC<ResultsProps> = ({studentId, schoolYear}) => {
    const [results, setResults] = useState<ResultInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchResultsByStudentId(studentId, schoolYear);
                const transformedData: ResultInfo[] = data
                    .map(result => ({
                        student: `${result.student.name} ${result.student.surname}`,
                        activity: result.activity.name,
                        subactivity: result.subactivity ? result.subactivity.name : '',
                        result: result.result,
                        unit: result.unit,
                        timestamp: formatDateTime(result.timestamp),
                    }));
                setResults(transformedData);
            } catch (error) {
                setError(true);
            } finally {
                setError(false);
                setLoading(false);
            }
        };

        fetchResults();
    }, [studentId, schoolYear]);

    if (loading) {
        return <div>Učitavanje podataka...</div>;
    }

    if (error) {
        return <div>Pogreška prilikom učitavanja podataka</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <PageHeaderHeading>Rezultati</PageHeaderHeading>
                <Button onClick={() => downloadExcel(studentId)}>Izvoz u Excel</Button>
            </div>
            <ResultsDataTable columns={columns} data={results}/>
        </div>
    );
};