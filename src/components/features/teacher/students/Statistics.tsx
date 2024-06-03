import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface StatisticsProps {
    classId: string;
}

export const Statistics: React.FC<StatisticsProps> = ({classId}) => {
    return (
        <div className="space-y-4">
            <PageHeaderHeading>Statistika</PageHeaderHeading>
            <Card>
                <CardContent className="p-8">

                </CardContent>
            </Card>
        </div>
    );
};