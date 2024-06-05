import {BASE_API_URL} from "@/constants";
import {User} from "@/model/User.ts";

export async function registerUser(userData: User) {
    const response = await fetch(`${BASE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function loginUser(username: string, password: string) {
    const response = await fetch(`${BASE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export const getGoogleLogin = () => {
    window.location.href = `${BASE_API_URL}/oauth2/authorization/google`;
};


