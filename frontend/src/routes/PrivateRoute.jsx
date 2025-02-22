import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const authToken = localStorage.getItem('authToken'); // Check if user is logged in
    return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;