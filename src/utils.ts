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

export function getMonthFromDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hr-HR', options).format(date);
}


export function getCurrentSchoolYear(): string {
    const today: Date = new Date();
    const currentYear: number = today.getFullYear();
    const currentMonth: number = today.getMonth();

    // School year starts in September and ends in August
    const startYear: number = currentMonth >= 8 ? currentYear : currentYear - 1;
    const endYear: number = startYear + 1;

    return `${startYear}/${endYear}`;
}

export function getSchoolYearFromDate(date: Date): string {
    const providedYear: number = date.getFullYear();
    const providedMonth: number = date.getMonth(); // 0-indexed

    // School year starts in September and ends in August
    const startYear: number = providedMonth >= 8 ? providedYear : providedYear - 1;
    const endYear: number = startYear + 1;

    return `${startYear}/${endYear}`;
}