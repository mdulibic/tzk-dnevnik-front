import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";

export async function fetchResultsByClassId(classId: string) {
    const response = await fetch(`${BASE_API_URL}/class/${classId}`, {
        method: 'GET',
        headers: {
            Origin: origin,
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}