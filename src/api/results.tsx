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

export const downloadExcel = async (studentId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/report/student/excel/results/${studentId}`, {
            method: 'GET',
            headers: {
                Authorization: authHeader(),
            },
        });

        if (!response.ok) {
            alert('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.download = 'rezultati.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error fetching Excel file:', error);
    }
};
