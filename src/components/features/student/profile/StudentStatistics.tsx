import {useEffect, useState} from "react";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Chart} from "react-google-charts";
import {getStatisticsForStudent} from "@/api/statistics";
import {Statistics} from "@/model/Statistics.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {getMonthFromDate} from "@/utils.ts";
import ActivitySelectMui from "@/components/shared/select/ActivitySelectMui.tsx";

interface IProps {
    schoolYear: string;
    studentId: string
}

const options = {
    chart: {
        title: "Activity Performance",
        subtitle: "Average Results for Activities",
    },
}

const getResultsByMonth = (statistics: Statistics): (string | number)[][] => {
    const data = [];
    data.push(["Mjesec", statistics.activity.name])

    statistics.results.forEach(result => {
        data.push([getMonthFromDate(result.timestamp), result.result])
    });

    return data;
};

const getActivitiesDistribution = (list: Statistics[]): (string | number)[][] => {
    const activityMap = new Map<string, number>();

    list.forEach(stat => {
        const activityName = stat.activity.name;
        const resultCount = stat.results.length;

        if (activityMap.has(activityName)) {
            activityMap.set(activityName, activityMap.get(activityName)! + resultCount);
        } else {
            activityMap.set(activityName, resultCount);
        }
    });

    const data: (string | number)[][] = [["Aktivnost", "Broj rezultata"]];
    activityMap.forEach((count, activityName) => {
        data.push([activityName, count]);
    });

    console.log(data);

    return data;
};


export const StudentStatistics = ({schoolYear, studentId}: IProps) => {
    const [statisticsList, setStatisticsList] = useState<Statistics[] | undefined>();
    const [statistics, setStatistics] = useState<Statistics | undefined>();
    const [data1, setData1] = useState<(string | number)[][]>();
    const [data2, setData2] = useState<(string | number)[][]>();

    const [selectedActivity, setSelectedActivity] = useState<string>("1");
    const [selectedSubActivity, setSelectedSubActivity] = useState<string>("");

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const data = await getStatisticsForStudent(studentId, schoolYear);
                setStatisticsList(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getStatistics();
    }, [studentId, schoolYear]);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const filtered = statisticsList?.find(stat => {
                    const activityMatch = stat.activity.id.toString() === selectedActivity;
                    const subactivityMatch = !selectedSubActivity || !stat.subactivity || stat.subactivity.id.toString() === selectedSubActivity;
                    return activityMatch && subactivityMatch;
                })
                setStatistics(filtered);
                setData1(filtered ? getResultsByMonth(filtered) : []);
                if (statisticsList) {
                    setData2(getActivitiesDistribution(statisticsList));
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getStatistics();
    }, [statisticsList, selectedActivity, selectedSubActivity]);

    return (
        <div className="space-y-8">
            <PageHeaderHeading>Statistika</PageHeaderHeading>
            <Card className="p-4 space-x-4">
                <CardTitle className="p-2">Statistika po aktivnosti</CardTitle>
                <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 items-center">
                        <p><strong>Odaberite aktivnost:</strong></p>
                        <ActivitySelectMui
                            selectedActivity={selectedActivity}
                            onActivityChange={setSelectedActivity}
                            onSubActivityChange={setSelectedSubActivity}
                        />
                    </div>
                    <hr/>
                    {statistics ? (
                        <div>
                            <p><strong>Prosječni
                                rezultat:</strong> {statistics.averageResult} ({statistics.results[0]?.unit})</p>
                            <p><strong>Rezultati kroz školsku godinu:</strong></p>
                            <Chart
                                chartType="ColumnChart"
                                data={data1}
                                options={options}
                                height={"300px"}
                            />
                        </div>
                    ) : (
                        <p>Nema zabilježenih rezultata</p>
                    )}
                </CardContent>
            </Card>
            <Card className="p-4 space-x-4">
                <CardTitle className="p-2">Moje aktivnosti</CardTitle>
                <CardContent>
                    <Chart
                        chartType="PieChart"
                        data={data2}
                        options={options}
                        height={"300px"}
                    />
                </CardContent>
            </Card>
        </div>
    );
};