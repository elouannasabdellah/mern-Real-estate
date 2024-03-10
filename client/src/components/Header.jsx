import React from 'react'
import {FaSearch} from "react-icons/fa"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-300 shadow-md' >
        <div className='flex justify-between p-3 items-center max-w-6xl ' >
          <Link to="/" >
              <h1 className='font-bold text-sm sm:text-xl flex flex-wrap' >
                  <span className='text-slate-500' >ElAbd</span>
                  <span>Estate</span>
              </h1>
            </Link>
            <form className='bg-slate-100 rounded-md flex items-center' >
                <input type="text" className='bg-transparent p-2 focus:outline-none w-24 sm:w-60' placeholder='serach...' />
                <FaSearch className='text-slate-600' />
            </form> 
            <ul className='flex gap-4' >
              <Link to="/" >
                 <li className='hidden text-slate-700 font-medium sm:inline hover:underline' >Home</li>
              </Link>
              <Link to="/about" >
               <li  className='hidden text-slate-700 font-medium sm:inline hover:underline' >About</li>
              </Link>
              <Link  to="/sign-in">
                <li   className=' text-slate-700 font-medium hover:underline'>Sign in</li>
              </Link>
            </ul>

        </div>
        
    </header>
  )
}

export default Header
