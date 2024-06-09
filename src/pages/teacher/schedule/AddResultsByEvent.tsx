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
import {Label} from "@/components/ui/label.tsx";

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
    const [unit, setUnit] = useState<string>("");

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
        setSavedResults(prevState => [...prevState, studentId]);
    };

    const handleResultChange = (studentId: number, value: string) => {
        setResults(prevResults => ({
            ...prevResults,
            [studentId]: value,
        }));
    };

    const handleSave = async (studentId: number) => {
        const activity = state.activity.id.toString();
        const subactivity = state.subActivity.id.toString();
        const result = results[studentId];

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

    const skipStudent = (studentId: number) => {
        saveResult(studentId.toString());
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
                <div className="flex items-center space-x-2">
                    <p className="text-s">
                        <strong>Vrsta mjere:</strong>
                    </p>
                    <Input
                        className="w-200"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>
                <Label className="text-xs text-muted-foreground">(Ovo polje može prihvatiti različite vrijednosti
                    mjerenja, poput ocjena, cm, m, broj ponavljanja i slično..)</Label>
            </div>
            <table className="min-w-full border border-gray-200 rounded-md p-4">
                <thead>
                <tr className="p-4 text-black font-medium">
                    <th className="border-b p-2 text-left">Student</th>
                    <th className="border-b p-2 text-left">Aktivnost</th>
                    <th className="border-b p-2 text-left">Rezultat</th>
                    <th className="border-b p-2 text-left">Akcije</th>
                </tr>
                </thead>
                <tbody>
                {students.filter(student => !savedResults.includes(student.id.toString())).length === 0 ? (
                    <tr>
                        <td colSpan={4} className="text-center p-4 justify-center">
                            Nema više studenata za unos rezultata.
                        </td>
                    </tr>
                ) : (
                    students.map(student => (
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
                                <td className="border-b p-2 space-x-4 space-y-4">
                                    <Button
                                        disabled={results[student.id] === undefined || results[student.id] === ''}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={() => handleSave(student.id)}
                                    >
                                        Spremi rezultat
                                    </Button>
                                    <Button
                                        className="px-4 py-2 rounded"
                                        onClick={() => skipStudent(student.id)}
                                    >
                                        Preskoči
                                    </Button>
                                </td>
                            </tr>
                        )
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};