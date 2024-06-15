import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {ActivityStatistics} from "@/model/ActivityStatistics.ts";
import {ClassStatistics} from "@/model/ClassStatistics.ts";

export async function getActivityStatisticsForStudent(studentId: string, schoolYear: string): Promise<ActivityStatistics[]> {
    const response = await fetch(`${BASE_API_URL}/api/statistics/${studentId}${schoolYear ? `?schoolYear=${schoolYear}` : ''}`, {
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

    return data as ActivityStatistics[];
}

export async function getClassStatisticsForStudent(studentId: string, activityId: string | undefined, subactivityId: string | undefined, schoolYear: string): Promise<ClassStatistics> {
    const response = await fetch(`${BASE_API_URL}/api/statistics/${studentId}/class${activityId ? `?activityId=${activityId}` : ''}${schoolYear ? `&schoolYear=${schoolYear}` : ''}${subactivityId ? `&subactivityId=${subactivityId}` : ''}`, {
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

    return data as ClassStatistics;
}

export async function getClassStatistics(classId: string, activityId: string | undefined, subactivityId: string | undefined): Promise<ClassStatistics> {
    const response = await fetch(`${BASE_API_URL}/api/statistics/class/${classId}${activityId ? `?activityId=${activityId}` : ''}${subactivityId ? `&subactivityId=${subactivityId}` : ''}`, {
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

    return data as ClassStatistics;
}

export async function getStudentResultsByClass(classId: string, activityId: string | undefined, subactivityId: string | undefined): Promise<StudentResult[]> {
    const response = await fetch(`${BASE_API_URL}/api/statistics/class/${classId}/students${activityId ? `?activityId=${activityId}` : ''}${subactivityId ? `&subactivityId=${subactivityId}` : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
    }

    const data = await response.json();

    return data as StudentResult[];
}
