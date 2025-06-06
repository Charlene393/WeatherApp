
import React from 'react'
import { IoSunny } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import SearchBar from './SearchBar';
const Navbar = () => {
    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className=' h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                <div className='flex items-center justify-center gap-2'>
                    <h2 className='text-gray-500 text-3xl '>Weather</h2>
                    <IoSunny className='text-yellow-300 text-3xl mt-1' />
                </div>
                <section className='flex gap-2 items-center'>
                    <FaLocationCrosshairs className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'/>
                    <MdLocationOn className='text-3xl'/>
                    <p className='text-slate-900/80 text-sm'> Kenya</p>
                    <div>
                        <SearchBar/>
                    </div>
                </section>
                </div>
                </nav>
    )
}

export default Navbar