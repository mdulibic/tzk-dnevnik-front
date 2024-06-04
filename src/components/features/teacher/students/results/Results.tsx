import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {fetchResultsByClassId} from "@/api/results.tsx";

interface ResultsProps {
    classId: string;
}

export const Results: React.FC<ResultsProps> = ({classId}) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchResultsByClassId(classId);
                setResults(data);
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
            <PageHeaderHeading>Rezultati</PageHeaderHeading>
            <Card>
                <CardContent className="p-8">

                </CardContent>
            </Card>
        </div>
    );
};