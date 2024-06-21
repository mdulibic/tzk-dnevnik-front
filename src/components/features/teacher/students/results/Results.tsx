import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {useEffect, useState} from "react";
import {downloadClassResults, fetchResultsByClassId} from "@/api/results.tsx";
import {columns} from "@/components/features/teacher/students/results/columns.tsx";
import {ResultsDataTable} from "@/components/shared/table/results-data-table.tsx";
import {formatDateTime} from "@/utils.ts";
import {Button} from "@/components/ui/button.tsx";

interface ResultsProps {
    classId: string;
}

export interface ResultInfo {
    student: string;
    activity: string;
    subactivity: string;
    result: number;
    unit: string;
    timestamp: string
}

export const Results: React.FC<ResultsProps> = ({classId}) => {
    const [results, setResults] = useState<ResultInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchResultsByClassId(classId);
                const transformedData: ResultInfo[] = data.map(result => ({
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
    }, [classId]);

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
                <Button onClick={() => downloadClassResults(classId)}>Izvoz u Excel</Button>
            </div>
            <ResultsDataTable columns={columns} data={results}/>
        </div>
    );
};