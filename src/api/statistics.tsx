import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {Statistics} from "@/model/Statistics.ts";

export async function getStatisticsForStudent(studentId: string, schoolYear: string): Promise<Statistics[]> {
    const response = await fetch(`${BASE_API_URL}/api/statistics/${studentId}/statistics${schoolYear ? `?schoolYear=${schoolYear}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok ${response.body}`);
    }

    const data = await response.json();

    return data as Statistics[];
}