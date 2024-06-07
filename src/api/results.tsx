import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {ActivityResult} from "@/model/ActivityResult.ts";

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