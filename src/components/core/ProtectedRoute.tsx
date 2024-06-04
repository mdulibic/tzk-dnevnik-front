import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserRole} from "@/model/UserRole.ts";

interface ProtectedRouteProps {
    children: ReactNode;
    role: UserRole;
}

const ProtectedRoute = ({children, role}: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const token = user?.accessToken;

    if (!token) {
        navigate('/login');
        return null;
    }

    if (user.role !== role) {
        navigate('/unauthorized');
        return null;
    }

    return <>{children}</>;
};

export const AdminRoute = ({children}: { children: ReactNode }) => (
    <ProtectedRoute role={UserRole.ADMIN}>{children}</ProtectedRoute>
);


export const TeacherRoute = ({children}: { children: ReactNode }) => (
    <ProtectedRoute role={UserRole.TEACHER}>{children}</ProtectedRoute>
);

export const StudentRoute = ({children}: { children: ReactNode }) => (
    <ProtectedRoute role={UserRole.STUDENT}>{children}</ProtectedRoute>
);
