import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const authToken = localStorage.getItem('authToken'); // Check if user is logged in
    return authToken ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
