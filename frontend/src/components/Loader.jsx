import React from 'react';
import '../index.css'

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
                <div className="h-4 w-4 bg-black rounded-full animate-custom-bounce1"></div>
                <div className="h-4 w-4 bg-black rounded-full animate-custom-bounce2"></div>
                <div className="h-4 w-4 bg-black rounded-full animate-custom-bounce3"></div>
            </div>
        </div>
    );
};

export default Loader;