import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {SchoolClass} from "@/model/SchoolClass.ts";

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