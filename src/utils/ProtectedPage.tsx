import {type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
};

const ProtectedPage = ({ children }: Props) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace  />;
    }

    return <>{children}</>;
};

export default ProtectedPage;
