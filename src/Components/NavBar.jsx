import React from 'react'

const NavBar = () => {
    return (
        <nav className='bg-gray-800 flex justify-around items-center p-2 fixed top-0 w-[100vw] z-10'>
            <div className='logo'>
                <span className='font-bold text-xl'>MyPasswordVault</span>
            </div>
            <ul className='flex justify-center items-center gap-8'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>About</li>
            </ul>
        </nav>
    )
}

export default NavBar
