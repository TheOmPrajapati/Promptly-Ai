import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import reset from '../assets/Reset.jpg'

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation(); // Get email from navigation state
    const navigate = useNavigate(); // React Router hook for navigation
    const email = location.state?.email || ''; // Retrieve email passed from Forgot Password page

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/reset-password', {
                email,
                otp,
                password,
            });
            toast.success(response.data.message, {
                position: "top-right",
                duration:1500,
            });
            // After showing success message, redirect to Login page
            setTimeout(() => {
                navigate('/login'); // Redirect to Login page
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred', {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    return (
        <div className="relative md:top-[60px] w-full flex items-center justify-center h-[90vh]">
            <div className=' w-full flex items-center justify-center'>
                <form className="p-6 bg-white " onSubmit={handleResetPassword}>
                    <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
                    <p className="text-sm text-gray-600 mb-4">OTP sent to: {email}</p>
                    <input
                        type="text"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border-2 rounded-md mb-4 outline-none cursor-text"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border-2 rounded-md mb-4 outline-none cursor-text"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-transparent border-2 text-black p-2 rounded-md hover:bg-black hover:text-white hover:border-transparent transition-all ease-in-out duration-200"
                    >
                        Reset Password
                    </button>
                    <Toaster/>
                </form>
            </div>
            <div className='hidden lg:flex items-center justify-center'>
                <img src={reset} alt="Reset Password" className='w-[50%]' />
            </div>
        </div>
    );
};

export default ResetPassword;
