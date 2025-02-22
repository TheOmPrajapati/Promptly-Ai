import React from 'react'
import logo from '../assets/LOGO.png'

export default function Navbar() {
    return (
        <div className='bg-white fixed w-full flex items-center border-b py-2 px-4 m-0 z-30 font-plaster'>
            <div className='w-full flex items-center justify-between'>
                <div className='w-full flex items-center justify-center'>
                    <img src={logo} alt="logo" className='w-[50px]' />
                    <h2 className='font-semibold tracking-wider'>Promptly Ai</h2>
                </div>
            </div>
        </div>
    )
}
