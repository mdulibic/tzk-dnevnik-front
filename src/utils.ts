import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {UserRole} from "@/model/UserRole.ts";
import {School} from "@/model/School.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getUserId() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user.id;
}

export function isTeacher() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user?.role === UserRole.TEACHER;
}

export function getUserRole(): UserRole | null {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user?.role || null;
}

export function getUserSchool(): School | null {
    const schoolString = localStorage.getItem('school');
    const school = schoolString ? JSON.parse(schoolString) : null;
    return school || null;
}

export function formatDateTime(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(date);
    const [datePart, timePart] = formattedDate.split(', ');

    const timePartWithH = timePart.replace(':', ':') + 'h';

    return `${datePart}, ${timePartWithH}`;
}