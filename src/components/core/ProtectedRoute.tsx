import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
    role: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
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

export const AdminRoute = ({ children }: { children: ReactNode }) => (
    <ProtectedRoute role="ROLE_ADMIN">{children}</ProtectedRoute>
);

export const TeacherRoute = ({ children }: { children: ReactNode }) => (
    <ProtectedRoute role="ROLE_TEACHER">{children}</ProtectedRoute>
);

export const StudentRoute = ({ children }: { children: ReactNode }) => (
    <ProtectedRoute role="ROLE_STUDENT">{children}</ProtectedRoute>
);
