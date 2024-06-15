import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import ActivitySelectMui from "@/components/shared/select/ActivitySelectMui.tsx";
import {Chart} from "react-google-charts";
import {useEffect, useState} from "react";
import {getClassStatistics, getStudentResultsByClass} from "@/api/statistics.tsx";
import {StatisticsDataTable} from "@/components/shared/table/statistics-data-table.tsx";
import { columns } from "./columns";

interface StatisticsProps {
    classId: string;
}

const options = {
    title: "Histogram prosječnih rezultata razreda po aktivnosti",
    legend: {position: "none"},
};


export const Statistics: React.FC<StatisticsProps> = ({classId}) => {
    const [selectedActivity, setSelectedActivity] = useState<string>("1");
    const [selectedSubActivity, setSelectedSubActivity] = useState<string>("1");

    const [classStatistics, setClassStatistics] = useState<(string | number)[][]>();
    const [studentResults, setStudentResults] = useState<StudentResult[]>([]);


    useEffect(() => {
        const getStatistics = async () => {
            try {
                const data = await getClassStatistics(classId, selectedActivity, selectedSubActivity);
                const mappedData = [
                    ["Učenik", "Prosječni rezultat"],
                    ...Object.entries(data.averageResultsMap).map(([studentId, averageResult]) => [studentId, averageResult])
                ];
                setClassStatistics(mappedData);

                const data2 = await getStudentResultsByClass(classId, selectedActivity, selectedSubActivity);
                setStudentResults(data2);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getStatistics();
    }, [classId, selectedActivity, selectedSubActivity]);

    return (
        <div className="space-y-8">
            <PageHeaderHeading>Statistika</PageHeaderHeading>
            <Card className="p-4 space-x-4">
                <CardTitle className="p-2">Statistika po aktivnosti</CardTitle>
                <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 items-center">
                        <p>Odaberite aktivnost:</p>
                        <ActivitySelectMui
                            selectedActivity={selectedActivity}
                            onActivityChange={setSelectedActivity}
                            onSubActivityChange={setSelectedSubActivity}
                        />
                    </div>
                    <hr/>
                    <div>
                        <div className="space-y-4 mt-4">
                            <p className="text-lg text-blue-800"><strong>Usporedba rezultata u aktivnostima</strong></p>
                            <Chart
                                chartType="Histogram"
                                width="100%"
                                height="400px"
                                data={classStatistics}
                                options={options}
                            />
                            <StatisticsDataTable columns={columns} data={studentResults}/>
                        </div>
                        <hr/>
                    </div>
                </CardContent>
            </Card>
            {/*<Card className="p-4 space-x-4">*/}
            {/*    <CardTitle className="p-2">Aktivnosti kroz školsku godinu {schoolYear}</CardTitle>*/}
            {/*    <CardContent>*/}
            {/*        <Chart*/}
            {/*            chartType="PieChart"*/}
            {/*            data={data2}*/}
            {/*            options={options}*/}
            {/*            height={"300px"}*/}
            {/*        />*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </div>
    );
};