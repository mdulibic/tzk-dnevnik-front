import {useEffect, useState} from "react";
import {fetchResultsByStudentId} from "@/api/results.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {ResultsDataTable} from "@/components/shared/table/results-data-table.tsx";
import {columns} from "@/components/features/teacher/students/results/columns.tsx";
import {ResultInfo} from "@/components/features/teacher/students/results/Results.tsx";
import {formatDateTime} from "@/utils.ts";

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
            <PageHeaderHeading>Rezultati</PageHeaderHeading>
            <ResultsDataTable columns={columns} data={results}/>
        </div>
    );
};