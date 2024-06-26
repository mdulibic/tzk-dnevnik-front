import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {Teacher} from "@/model/Teacher.ts";
import {Student} from "@/model/Student.ts";

export async function importUsers(file: File, role: string, schoolId: string, classId: string | undefined) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('role', role);
    if (classId !== undefined) {
        formData.append('classId', classId);
    } else {
        formData.append('classId', '');
    }

    const response = await fetch(`${BASE_API_URL}/api/school/enroll/${schoolId}`, {
        method: 'POST',
        headers: {
            Authorization: authHeader(),
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export async function importSchools(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_API_URL}/api/school`, {
        method: 'POST',
        headers: {
            Authorization: authHeader(),
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export async function getClassesForTeacher(teacherId: string): Promise<SchoolClass[]> {
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

export async function getSchoolClasses(schoolId: string): Promise<SchoolClass[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/school/classes/${schoolId}`,
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

export async function getStudentsBySchool(schoolId: string): Promise<Student[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/students/school/${schoolId}`,
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

export async function getTeachersBySchool(schoolId: string): Promise<Teacher[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/teachers/school/${schoolId}`,
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

export async function getStudent(studentId: string): Promise<Student> {
    const response = await fetch(
        `${BASE_API_URL}/api/students/${studentId}`,
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

export async function getSchoolYearsForStudent(studentId: string): Promise<string[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/students/${studentId}/school-years`,
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
    return data as string[];
}