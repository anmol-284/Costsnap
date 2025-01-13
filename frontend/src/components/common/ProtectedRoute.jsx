import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils';

const ProtectedRoute = ({ children }) => {
    const token = getCookie('token');

    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
