import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
                email,
            }); // Ensure this matches the backend route
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
            console.error('Error:', error);
            toast.error('User Not Found', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    };   

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="p-6 bg-white rounded-md shadow-md" onSubmit={handleForgotPassword}>
                <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
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
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Send Reset Link
                </button>
                <ToastContainer/>
                {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
