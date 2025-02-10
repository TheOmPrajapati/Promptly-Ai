import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="p-6 bg-white rounded-md shadow-md" onSubmit={handleResetPassword}>
                <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Reset Password
                </button>
                {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
