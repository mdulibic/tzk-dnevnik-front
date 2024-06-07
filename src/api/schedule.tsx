import {BASE_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {EventInfo} from "@/components/features/teacher/schedule/TeacherEventCalendar.tsx";
import {getUserId} from "@/utils.ts";
import {SchoolEvent, Tag} from "@/model/SchoolEvent.ts";
import {TagInfo} from "@/components/features/teacher/schedule/dialog/AddTagDialog.tsx";

export async function fetchTags(): Promise<Tag[]> {
    const teacherId = getUserId();

    const response = await fetch(
        `${BASE_API_URL}/api/events/tags/${teacherId}`,
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
    return data as Tag[];
}

export async function addTag(newTag: TagInfo) {
    const response = await fetch(`${BASE_API_URL}/api/events/tags/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
        body: JSON.stringify(newTag),
    });

    if (!response.ok) {
        throw new Error('Failed to add tag');
    }
}


export async function fetchEvents(): Promise<SchoolEvent[]> {
    const teacherId = getUserId();
    const response = await fetch(
        `${BASE_API_URL}/api/events/teacher/${teacherId}`,
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
    return data as SchoolEvent[];
}

export async function fetchEventsForStudent(studentId: string): Promise<SchoolEvent[]> {
    const response = await fetch(
        `${BASE_API_URL}/api/events/student/${studentId}`,
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
    return data as SchoolEvent[];
}

export async function addEvent(eventDto: EventInfo): Promise<SchoolEvent[]> {
    const response = await fetch(`${BASE_API_URL}/api/events/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Origin: origin,
            Authorization: authHeader(),
        },
        body: JSON.stringify(eventDto),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data as SchoolEvent[];
}

export async function importSchedule(file: File, teacherId: string, classId: string | undefined) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_API_URL}/api/events/import/${teacherId}/${classId}`, {
        method: 'POST',
        headers: {
            Authorization: authHeader(),
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}
