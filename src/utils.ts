import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {UserRole} from "@/model/UserRole.ts";

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
