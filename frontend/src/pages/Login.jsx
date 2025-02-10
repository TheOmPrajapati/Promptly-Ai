import React, { useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../assets/LOGO.png';
import GoogleLoginButton from './../components/GoogleLoginButton';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Signup forms
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);

    // Toggle Forms with Animation
    const toggleForm = () => setIsLogin(!isLogin);

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Handle Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Form Submit (Login/Signup)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // Login API call
                const response = await axios.post('http://localhost:5000/api/users/login', {
                    email: formData.email,
                    password: formData.password,
                });
                toast.success('Login Successful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                console.log(response.data); // Handle token or user data
            } else {
                // Signup API call
                if (formData.password !== formData.confirmPassword) {
                    toast.warn('Passwords do not match', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                    return;
                }
                const response = await axios.post('http://localhost:5000/api/users/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                toast.success('Signup Successful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                console.log(response.data);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            console.error(error);
        }
    };

    // Forgot Password Handler
    const handleForgotPassword = async () => {
        if (!formData.email) {
            toast.warn('Please enter your email to reset your password.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
    };

    return (
        <div className="w-full flex items-center justify-center h-screen font-sans">
            {/* Left Side with Logo and Info */}
            <div className="hidden md:flex flex-col items-center justify-center p-6 border h-screen rounded-xl w-1/2 bg-white">
                <img src={logo} alt="LOGO" className="w-[30%]" />
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-extrabold mb-1">Promptly AI</h1>
                    <h3 className="text-xl font-semibold">Talk Smart, Think Smarter.</h3>
                    <p className="p-3 text-center text-lg tracking-wide">
                        An AI-powered platform delivering smarter, faster, and secure conversational experiences for all your needs.
                    </p>
                </div>
            </div>

            {/* Right Side with Forms */}
            <div
                className="w-full md:w-1/2 flex items-center justify-center h-screen bg-white p-6 rounded-md shadow-lg">

                <form className="flex flex-col w-[80%]" onSubmit={handleSubmit}>
                    <h1 className="text-4xl text-center font-extrabold mb-6 py-2">{isLogin ? 'Login' : 'Signup'}</h1>
                    {!isLogin && (
                        <>
                            <label htmlFor="name" className="mt-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="border-2 outline-none text-gray-600 p-2 rounded-md my-2"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </>
                    )}

                    <label htmlFor="email" className="mt-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="border-2 outline-none text-gray-600 p-2 rounded-md my-2"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="password" className="mt-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className="border-2 outline-none text-gray-600 p-2 rounded-md my-2 w-full"
                            placeholder="••••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <div
                            className="absolute right-3 top-5 text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Forgot Password Section */}
                    {isLogin && (
                        <Link to={'/forgot-password'}
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-500 cursor-pointer hover:underline mt-1"
                        >
                            Forgot Password?
                        </Link>
                    )}

                    {/* Confirm Password Field for Signup */}
                    {!isLogin && (
                        <>
                            <label htmlFor="confirmPassword" className="mt-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="border-2 outline-none text-gray-600 p-2 rounded-md my-2"
                                placeholder="••••••••••"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="text-gray-700 hover:text-white font-semibold border-2 p-2 rounded-md hover:bg-gray-700 transition duration-200 mt-4">
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
                    <ToastContainer />

                    {/* Toggle Button */}
                    <p className="mt-4 text-center text-gray-600 flex items-center">
                        {isLogin ? (
                            <>
                                Don't have an account?{' '}
                                <span
                                    onClick={toggleForm}
                                    className="text-gray-600 cursor-pointer hover:text-black ml-2">
                                    Sign up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <span
                                    onClick={toggleForm}
                                    className="text-gray-600 cursor-pointer hover:text-black ml-2">
                                    Login
                                </span>
                            </>
                        )}
                    </p>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
                        <p className="text-gray-500">or</p>
                        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
                    </div>

                    {/* Google Login */}
                    <GoogleLoginButton />
                </form>
            </div>
        </div>
    );
}
