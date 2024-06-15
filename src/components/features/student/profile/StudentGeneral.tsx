import {useEffect, useState} from "react";
import {getStudent} from "@/api/users.tsx";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Student} from "@/model/Student.ts";
import {getCurrentSchoolYear} from "@/utils.ts";
import {genderToCroatian} from "@/model/Gender.ts";
import {Button} from "@/components/ui/button.tsx";
import {generatePdf} from "@/pages/teacher/students/StudentDetailsPdfGenerator.tsx";
import {fetchResultsByStudentId} from "@/api/results.tsx";
import {ActivityResult} from "@/model/ActivityResult.ts";

interface IProps {
    studentId: string
}

const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    return weight / (heightInMeters * heightInMeters);
};

export const StudentGeneral = ({studentId}: IProps) => {
    const [student, setStudent] = useState<Student | null>(null);
    const [bmi, setBmi] = useState<number>();
    const [resultsData, setResultsData] = useState<ActivityResult[]>();

    useEffect(() => {
        const getTeacher = async () => {
            try {
                const data = await getStudent(studentId);
                const results = await fetchResultsByStudentId(studentId, "2023/2024");
                setResultsData(results);

                setStudent(data);
                const bmiData = data ? calculateBMI(data.weight, data.height) : undefined;
                setBmi(bmiData);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        getTeacher();
    }, [studentId]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between">
                <PageHeaderHeading>Općenito</PageHeaderHeading>
                <Button onClick={() => generatePdf(student, bmi, resultsData)}>Izvoz u PDF</Button>
            </div>
            <Card>
                <CardTitle className="p-6">Osnovne informacije</CardTitle>
                <CardContent className="p-8">
                    {student ? (
                        <div className="space-y-4 flex gap-8">
                            <div className="flex-shrink-0">
                                <Avatar className="w-48 h-48">
                                    <AvatarImage
                                        src={`https://avatar.iran.liara.run/username?username=${student.name}+${student.surname}`}/>
                                    <AvatarFallback>{student.name.charAt(0)}{student.surname.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="space-y-2">
                                <p><strong>Ime i prezime:</strong> {student.name} {student.surname}</p>
                                <p><strong>Korisničko ime:</strong> {student.username}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p>
                                    <strong>Škola:</strong> {student.schoolClass.school.name}, {student.schoolClass.school.county}, {student.schoolClass.school.city}
                                </p>
                                <p>
                                    <strong>Razred:</strong> {student.schoolClass.year}.{student.schoolClass.division} ({getCurrentSchoolYear()})
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>Učitavanje podataka</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardTitle className="p-6">Morfološka obilježja</CardTitle>
                <CardContent className="p-8">
                    {student ? (
                        <div className="space-y-2">
                            <div className="flex flex-row rounded-sm space-x-4">
                                <div className="space-y-2">
                                    <p><strong>Spol:</strong> {genderToCroatian(student.gender)}</p>
                                    <p><strong>Visina:</strong> {student.height} cm</p>
                                    <p><strong>Težina:</strong> {student.weight} kg</p>
                                    <p><strong>ITM</strong> (Indeks tjelesne mase): {bmi?.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col flex-grow justify-end">
                                    <div className="ml-auto">
                                        <p><strong>Legenda (ITM):</strong></p>
                                        <div className="flex items-center mb-2">
                                            <div className="w-4 h-4 mr-2 bg-red-500"></div>
                                            <p className="text-red-500">Nedovoljna tjelesna masa (&lt; 18.5)</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <div className="w-4 h-4 mr-2 bg-green-500"></div>
                                            <p className="text-green-500">Normalna tjelesna masa (18.5 - 24.9)</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <div className="w-4 h-4 mr-2 bg-yellow-500"></div>
                                            <p className="text-yellow-500">Prekomjerna tjelesna masa (24.9 -
                                                29.9)</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 mr-2 bg-red-500"></div>
                                            <p className="text-red-500">Gojaznost (&gt; 30)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Učitavanje podataka</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};