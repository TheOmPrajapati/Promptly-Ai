import React from 'react';
import GLogo from '../assets/Google.png';

const GoogleLoginButton = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google'; // Backend route
    };

    return (
        <button onClick={handleLogin} className="relative google-login-btn border-2 p-2 my-4 w-full rounded-md flex items-center justify-center">
            <img src={GLogo} alt="Google Logo" className='w-[30px]' />
            <p className='w-full mr-4'>Login with Google</p>
        </button>
    );
};

export default GoogleLoginButton;