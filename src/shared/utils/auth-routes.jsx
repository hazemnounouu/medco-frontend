import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export const SignedInProtectedRoute = ({ children }) => {
    const { token, role } = useContext(AuthContext);

    if (role === 'admin') {
        return <Navigate to="/dashboard" replace />;
    } else if (role == 'doctor') {
        return <Navigate to="/appointments" replace />;
    }
    return children;
};


export const AdminProtectedRoute = ({ children }) => {
    const { role } = useContext(AuthContext);

    if (role !== 'admin') {
        return <Navigate to="/appointments" replace />;
    }
    return children;
};

