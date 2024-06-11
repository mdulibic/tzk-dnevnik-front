import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {ActivityResult} from "@/model/ActivityResult.ts";
import {AddResultDto} from "@/pages/teacher/schedule/AddResultsByEvent.tsx";

export async function fetchResultsByClassId(classId: string): Promise<ActivityResult[]> {
    const response = await fetch(`${BASE_API_URL}/api/results/class/${classId}`, {
        method: 'GET',
        headers: {
            Origin: origin,
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function fetchResultsByStudentId(studentId: string, year: string): Promise<ActivityResult[]> {
    const response = await fetch(`${BASE_API_URL}/api/students/${studentId}/results${year ? `?schoolYear=${year}` : ''}`, {
        method: 'GET',
        headers: {
            Origin: origin,
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function addResultForStudent(dto: AddResultDto) {
    const response = await fetch(`${BASE_API_URL}/api/results/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}
