import {useEffect, useState} from "react";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Chart} from "react-google-charts";
import {getActivityStatisticsForStudent, getClassStatisticsForStudent} from "@/api/statistics";
import {ActivityStatistics} from "@/model/ActivityStatistics.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {getMonthFromDate} from "@/utils.ts";
import ActivitySelectMui from "@/components/shared/select/ActivitySelectMui.tsx";

interface IProps {
    schoolYear: string;
    studentId: string
}

const options = {
    chart: {
        title: "Rezultati kroz školsku godinu po aktivnosti",
        legend: {position: "none"},
    },
}

const options3 = {
    title: "Histogram prosječnih rezultata generacije/razreda po aktivnosti",
    legend: {position: "none"},
};

const getResultsByMonth = (statistics: ActivityStatistics): (string | number)[][] => {
    const data = [];
    data.push(["Mjesec", statistics.activity.name])

    statistics.results.forEach(result => {
        data.push([getMonthFromDate(result.timestamp), result.result])
    });

    return data;
};

const getActivitiesDistribution = (list: ActivityStatistics[]): (string | number)[][] => {
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

    console.log("Activity statistics: " + data);

    return data;
};


export const StudentStatistics = ({schoolYear, studentId}: IProps) => {
    const [activityStatisticsList, setActivityStatisticsList] = useState<ActivityStatistics[] | undefined>();
    const [activityStatistics, setActivityStatistics] = useState<ActivityStatistics | undefined>();
    const [data1, setData1] = useState<(string | number)[][]>();
    const [data2, setData2] = useState<(string | number)[][]>();
    const [data3, setData3] = useState<(string | number)[][]>();

    const [selectedActivity, setSelectedActivity] = useState<string>("1");
    const [selectedSubActivity, setSelectedSubActivity] = useState<string>("1");

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const data = await getActivityStatisticsForStudent(studentId, schoolYear);
                setActivityStatisticsList(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getStatistics();
    }, [studentId, schoolYear]);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const filtered = activityStatisticsList?.find(stat => {
                    const activityMatch = stat.activity.id.toString() === selectedActivity;
                    const subactivityMatch = !selectedSubActivity || !stat.subactivity || stat.subactivity.id.toString() === selectedSubActivity;
                    return activityMatch && subactivityMatch;
                })
                setActivityStatistics(filtered);
                setData1(filtered ? getResultsByMonth(filtered) : []);
                if (activityStatisticsList) {
                    setData2(getActivitiesDistribution(activityStatisticsList));
                }

                const classStatistics = await getClassStatisticsForStudent(studentId, selectedActivity, selectedSubActivity, schoolYear);
                console.log("Class statistics:" + JSON.stringify(classStatistics));
                const data = [
                    ["Učenik", "Prosječni rezultat"],
                    ...Object.entries(classStatistics.averageResultsMap).map(([studentId, averageResult]) => [studentId, averageResult])
                ];
                setData3(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        getStatistics();
    }, [activityStatisticsList, selectedActivity, selectedSubActivity]);

    return (
        <div className="space-y-8">
            <PageHeaderHeading>Statistika</PageHeaderHeading>
            <Card className="p-4 space-x-4">
                <CardTitle className="p-2">Statistika po aktivnosti ({schoolYear})</CardTitle>
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
                    {activityStatistics ? (
                        <div>
                            <p className="text-lg text-blue-800"><strong>Rezultati kroz školsku godinu</strong></p>
                            <Chart
                                chartType="ColumnChart"
                                data={data1}
                                options={options}
                                height={"300px"}
                            />
                            <hr/>
                            <div className="space-y-4 mt-4">
                                <p className="text-lg text-blue-800"><strong>Usporedba rezultata u aktivnostima prema razredu</strong></p>
                                <p><strong>Prosječni
                                    rezultat:</strong> {activityStatistics.averageResult} ({activityStatistics.results[0]?.unit})
                                </p>
                                <Chart
                                    chartType="Histogram"
                                    width="100%"
                                    height="400px"
                                    data={data3}
                                    options={options3}
                                />
                            </div>
                        </div>
                    ) : (
                        <p>Nema zabilježenih rezultata</p>
                    )}
                </CardContent>
            </Card>
            <Card className="p-4 space-x-4">
                <CardTitle className="p-2">Aktivnosti kroz školsku godinu {schoolYear}</CardTitle>
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