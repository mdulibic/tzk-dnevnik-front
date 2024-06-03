import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface ResultsProps {
    classId: string;
}

export const Results: React.FC<ResultsProps> = ({classId}) => {
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