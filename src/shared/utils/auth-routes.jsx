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
    const { token } = useContext(AuthContext);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

