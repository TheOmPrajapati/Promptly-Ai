import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import forgot from '../assets/Forgot.jpg'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // React Router hook for navigation

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
                email,
            }); // Ensure this matches the backend route
            toast.success(response.data.message, {
                position: "top-right",
                duration: 1500,
            });
            // After showing success message, redirect to Reset Password page
            setTimeout(() => {
                navigate('/reset-password', { state: { email } }); // Pass email to Reset Password page
            },1500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred', {
                position: "top-right",
                duration: 2000,
            });

            console.error('Error:', error);

            toast.error('User Not Found', {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    return (
        <div className="relative md:top-[60px] flex items-center justify-center h-screen border">
            <div className='hidden md:flex flex-col items-center justify-center h-full rounded-r-3xl p-6 w-full border shadow-lg'>
                <img src={forgot} alt="Forgot Password" className='w-[80%]' />
            </div>
            <div className='w-full px-8 '>
                <form className="p-6" onSubmit={handleForgotPassword}>
                    <h1 className="text-4xl font-bold mb-6">Forgot Password</h1>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border-2 rounded-md mb-4 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-transparent border-2 text-black p-2 rounded-md hover:bg-black hover:text-white hover:border-transparent transition-all ease-in-out duration-200"
                    >
                        Send OTP
                    </button>
                    <Toaster />
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
