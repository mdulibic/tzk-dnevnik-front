import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {ActivityResult} from "@/model/ActivityResult.ts";
import {AddResultDto} from "@/components/features/teacher/students/add-results/AddResults.tsx";

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

export async function fetchResultsByStudentId(studentId: string): Promise<ActivityResult[]> {
    const response = await fetch(`${BASE_API_URL}/api/results/student/${studentId}`, {
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
