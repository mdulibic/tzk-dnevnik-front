import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {Teacher} from "@/model/Teacher.ts";
import {Student} from "@/model/Student.ts";
import {getUserId} from "@/utils.ts";

export async function importUsers(file: File, role: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('role', role);

    const response = await fetch(`${BASE_API_URL}/api/school/enroll/csv`, {
        method: 'POST',
        headers: {
            Authorization: authHeader(),
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function getClassesById(teacherId: string): Promise<SchoolClass[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/teachers/classes/${teacherId}`,
        {
            method: 'GET',
            headers: {
                Origin: origin,
                Authorization: authHeader(),
            },
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as SchoolClass[];
}

export async function fetchTeacherById(teacherId: number): Promise<Teacher> {
    const response = await fetch(`${BASE_API_URL}/api/teachers/${teacherId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Teacher;
}

export async function getStudentsById(classId: string): Promise<Student[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/students/class/${classId}`,
        {
            method: 'GET',
            headers: {
                Origin: origin,
                Authorization: authHeader(),
            },
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Student[];
}

export async function getStudents(): Promise<Student[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/students/all`,
        {
            method: 'GET',
            headers: {
                Origin: origin,
                Authorization: authHeader(),
            },
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Student[];
}

export async function getTeachers(): Promise<Teacher[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/teachers/all`,
        {
            method: 'GET',
            headers: {
                Origin: origin,
                Authorization: authHeader(),
            },
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Teacher[];
}

export async function getStudent(): Promise<Student> {
    const studentId = getUserId();
    const response = await fetch(
        `${BASE_API_URL}/api/${studentId}`,
        {
            method: 'GET',
            headers: {
                Origin: origin,
                Authorization: authHeader(),
            },
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as Student;
}