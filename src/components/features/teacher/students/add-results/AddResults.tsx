import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {useEffect, useState} from "react";
import {getStudentsById} from "@/api/users.tsx";
import {Student} from "@/model/Student.ts";
import ActivitySelect from "@/components/shared/select/ActivitySelect.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {addResultForStudent} from "@/api/results";
import {toast} from "@/components/ui/use-toast.ts";

interface AddResultsProps {
    classId: string;
    saveResults: boolean;
}

export interface AddResultDto {
    studentId: string;
    activityId: string;
    subActivityId: string;
    result: number;
    unit: string;
}


export const AddResults: React.FC<AddResultsProps> = ({classId, saveResults}) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [savedResults, setSavedResults] = useState<string[]>([]);

    const [selectedActivities, setSelectedActivities] = useState<{ [key: number]: string }>({});
    const [results, setResults] = useState<{ [key: number]: string }>({});
    const [units, setUnits] = useState<{ [key: number]: string }>({});
    const [selectedSubActivities, setSelectedSubActivities] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getStudentsById(classId);
                setStudents(data);
            } catch (error) {
            }
        };

        fetchResults();
    }, [classId]);

    const saveResult = (studentId: string) => {
        // Call your API to save the result
        // After saving, update the savedResults state
        setSavedResults(prevState => [...prevState, studentId]);
    };

    const handleActivityChange = (studentId: number, activity: string) => {
        setSelectedActivities(prevState => ({
            ...prevState,
            [studentId]: activity,
        }));
    };

    const handleSubActivityChange = (studentId: number, subactivity: string) => {
        setSelectedSubActivities(prevState => ({
            ...prevState,
            [studentId]: subactivity,
        }));
    };

    const handleResultChange = (studentId: number, value: string) => {
        setResults(prevResults => ({
            ...prevResults,
            [studentId]: value,
        }));
    };

    const handleUnitChange = (studentId: number, value: string) => {
        setUnits(prevUnits => ({
            ...prevUnits,
            [studentId]: value,
        }));
    };

    const handleSave = async (studentId: number) => {
        const activity = selectedActivities[studentId];
        const subactivity = selectedActivities[studentId];
        const result = results[studentId];
        const unit = units[studentId];

        const dto: AddResultDto = {
            studentId: studentId.toString(),
            activityId: activity ? activity : '',
            subActivityId: subactivity ? subactivity : '',
            result: parseInt(result) || 0,
            unit: unit || ''
        };

        try {
            await addResultForStudent(dto);
            toast({
                title: "Rezultat dodan!",
                description: "Novi rezultati je upisan u sustav.",
            });
            if (saveResults) {
                saveResult(studentId.toString());
            }
        } catch (error) {
            console.error("Error adding result:", error);
        }
    };

    return (
        <div className="space-y-4 p-4">
            <PageHeaderHeading>Unos rezultata</PageHeaderHeading>
            <table className="min-w-full border border-gray-200 rounded-md p-4">
                <thead>
                <tr className="p-4 text-black font-medium">
                    <th className="border-b p-2 text-left">Student</th>
                    <th className="border-b p-2 text-left">Aktivnost</th>
                    <th className="border-b p-2 text-left">Rezultat</th>
                    <th className="border-b p-2 text-left">Mjera</th>
                    <th className="border-b p-2 text-left">Akcija</th>
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    !savedResults.includes(student.id.toString()) && (
                        <tr key={student.id}>
                            <td className="border-b p-2">{`${student.name} ${student.surname}`}</td>
                            <td className="border-b p-2">
                                <ActivitySelect
                                    selectedActivity={selectedActivities[student.id]}
                                    onActivityChange={(activity) => handleActivityChange(student.id, activity)}
                                    onSubActivityChange={(subactivity) => handleSubActivityChange(student.id, subactivity)}
                                />
                            </td>
                            <td className="border-b p-2">
                                <Input
                                    placeholder="Rezultat"
                                    value={results[student.id] || ''}
                                    onChange={(e) => handleResultChange(student.id, e.target.value)}
                                />
                            </td>
                            <td className="border-b p-2">
                                <Input
                                    placeholder="Mjera"
                                    value={units[student.id] || ''}
                                    onChange={(e) => handleUnitChange(student.id, e.target.value)}
                                />
                            </td>
                            <td className="border-b p-2">
                                <Button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => handleSave(student.id)}
                                >
                                    Spremi rezultat
                                </Button>
                            </td>
                        </tr>
                    )
                ))}
                </tbody>
            </table>
        </div>
    );
};