import React, { useEffect } from 'react';
import { useNavigate,  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import Navbar from './components/Navbar';
import "./index.css"
import Login from './pages/Login';

const App = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const token = queryParams.get('token');

    //     if (token) {
    //         localStorage.setItem('authToken', token); // Save token for future requests
    //         navigate('/');
    //     }
    // }, [navigate]); 

    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
            </Router>
            {/* <Navbar/> */}
        </>
    );
};

export default App;