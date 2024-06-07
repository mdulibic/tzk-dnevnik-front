import {useEffect, useState} from "react";
import {Student} from "@/model/Student.ts";
import {getStudentsById} from "@/api/users.tsx";
import {addResultForStudent} from "@/api/results.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {PageHeaderHeading} from "@/components/core/PageHeader.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {formatDateTime} from "@/utils.ts";
import {ArrowBack} from "@mui/icons-material";

export interface AddResultDto {
    studentId: string;
    activityId: string;
    subActivityId: string;
    result: number;
    unit: string;
}


export const AddResultsByEvent = () => {
    const {state} = useLocation();
    const [students, setStudents] = useState<Student[]>([]);
    const [savedResults, setSavedResults] = useState<string[]>([]);
    const [results, setResults] = useState<{ [key: number]: string }>({});
    const [units, setUnits] = useState<{ [key: number]: string }>({});

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getStudentsById(state.schoolClass.id);
                setStudents(data);
            } catch (error) {
            }
        };

        fetchResults();
    }, [state.schoolClass.id]);

    useEffect(() => {

    }, [state.schoolClass.id]);

    const saveResult = (studentId: string) => {
        // Call your API to save the result
        // After saving, update the savedResults state
        setSavedResults(prevState => [...prevState, studentId]);
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
        alert(JSON.stringify(state));
        const activity = state.activity.id.toString();
        const subactivity = state.subActivity.id.toString();
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
            saveResult(studentId.toString());
        } catch (error) {
            console.error("Error adding result:", error);
        }
    };

    return (
        <div className="space-y-4 p-4">
            <ArrowBack onClick={goBack}></ArrowBack>
            <PageHeaderHeading className="text-blue-600">{state.title}</PageHeaderHeading>
            <div className="space-y-2">
                <p className="text-s">
                    <strong>Aktivnost:</strong> {state.activity.name} {state?.subActivity && `(${state.subActivity.name})`}
                </p>
                <p className="text-s">
                    <strong>Razred:</strong> {state?.schoolClass && `${state.schoolClass.year}.${state.schoolClass.division}`}
                </p>
                <p className="text-s">
                    <strong>Vrijeme:</strong> {formatDateTime(state.startTimestamp)} - {formatDateTime(state.endTimestamp)}
                </p>
            </div>
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
                                <p>
                                    {state.activity.name} {state?.subActivity && `(${state.subActivity.name})`}
                                </p>
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