import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ActivitySelectMui from "@/components/shared/select/ActivitySelectMui.tsx";
import {Chart} from "react-google-charts";
import React, {ChangeEvent, useEffect, useState} from "react";
import {getClassStatistics, getStudentResultsByClass} from "@/api/statistics.tsx";
import {StatisticsDataTable} from "@/components/shared/table/statistics-data-table.tsx";
import {columns} from "./columns";
import {Label} from "@/components/ui/label.tsx";
import {StudentResult} from "@/model/StudentResult.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {downloadClusteringDataCsv} from "@/api/results";

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

    const [file, setFile] = useState<File | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

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

    const handleCsvDownload = () => {
        if (classId !== undefined) {
            downloadClusteringDataCsv(classId);
        }
    };

    const handleImport = async () => {
        if (!file) {
            toast({
                variant: "destructive",
                title: "Uvoz podataka neuspješan!",
                description: "Nije odabrana CSV datoteka.",
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`http://localhost:5000/generate-pdf`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'output.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            alert('PDF file generated successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate PDF');
        }
    };

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
                            <p className="text-lg text-blue-800"><strong>Rezultati učenika</strong></p>
                            <Label className="text-s text-muted-foreground">(Poredani po uspješnosti)</Label>
                            <StatisticsDataTable columns={columns} data={studentResults}/>
                        </div>
                        <hr/>
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Analiza i klasteriranje podataka o motoričkim i funkcionalnim
                            sposobnostima učenika</CardTitle>
                        <CardDescription>
                            Učitajte CSV datoteku s podacima o učenicima ili preuzmite ažurne podatke s sustava kako
                            biste izvršili analizu i klasteriranje njihovih motoričkih i funkcionalnih sposobnosti.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 space-y-4">
                            <div className="flex flex-row items-center space-x-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Input
                                        id="picture"
                                        onChange={handleOnChange}
                                        type="file"
                                        accept=".csv"
                                    />
                                </div>
                                <Label htmlFor="picture">ILI</Label>
                                <Button
                                    onClick={handleCsvDownload}
                                    disabled={classId === undefined}
                                    className="w-48 bg-black text-white rounded shadow-md hover:bg-gray-800 focus:bg-gray-800"
                                >
                                    Preuzmi ažurirani CSV
                                </Button>
                            </div>
                            <Button
                                onClick={handleImport}
                                disabled={file === null || classId === undefined}
                                className="w-48 bg-black text-white rounded shadow-md hover:bg-gray-800 focus:bg-gray-800"
                            >
                                Generiraj izvještaj
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};