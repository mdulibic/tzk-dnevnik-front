import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getUserId() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    return user.id;
}
