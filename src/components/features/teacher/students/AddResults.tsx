import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface AddResultsProps {
    classId: string;
}

export const AddResults: React.FC<AddResultsProps> = ({classId}) => {
    return (
        <div className="space-y-4">
            <PageHeaderHeading>Unos rezultata</PageHeaderHeading>
            <Card>
                <CardContent className="p-8">

                </CardContent>
            </Card>
        </div>
    );
};