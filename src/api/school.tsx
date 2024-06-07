import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {SchoolClass} from "@/model/SchoolClass.ts";
import {School} from "@/model/School.ts";

export async function getClasses(): Promise<SchoolClass[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/school/classes`,
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

export async function getSchools(): Promise<School[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/school/all`,
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
    return data as School[];
}