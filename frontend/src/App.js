import React, { useEffect, lazy } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import "./index.css";

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const App = () => {
    const navigate = useNavigate();
    const location = useLocation(); // To get the current route

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken && !['/login', '/forgot-password', '/reset-password'].includes(location.pathname)) {
            navigate('/login');
        } else if (authToken && ['/login', '/forgot-password', '/reset-password'].includes(location.pathname)) {
            navigate('/home');
        }
    }, [location.pathname, navigate]);


    return (
        <>
            <Navbar />

                    <Routes element={<PublicRoute />}>

                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        
                    </Routes>

                    {/* Private Routes */}
                    <Routes element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                    </Routes>
        </>
    );
};

export default App;
