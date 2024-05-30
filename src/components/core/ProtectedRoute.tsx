import {ReactNode} from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const token = user?.accessToken;

    if (!token) {
        window.location.href = '/login';
        return null;
    } else {
        return children;
    }
};