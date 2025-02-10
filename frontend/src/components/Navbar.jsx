import React from 'react'
import logo from '../assets/LOGO.png'

export default function Navbar() {
    return (
        <div className='absolute w-[95%] flex items-center border shadow-md py-2 px-4 top-0 left-[50%] translate-x-[-50%] my-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg font-mont'>
            <div className='w-full flex items-center justify-between'>
                <div className='w-full flex items-center justify-start'>
                    <img src={logo} alt="logo" className='w-[50px]' />
                    <h2 className='font-medium'>Promptly Ai</h2>
                </div>
            </div>
            <div>
                <a href='/' className='rounded-full flex items-center justify-center w-[40px] h-[40px] border-2'>
                    <img src={logo} alt="profile-pic" />
                </a>
            </div>
        </div>
    )
}
