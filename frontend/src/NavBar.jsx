import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useAuth } from './AuthContext'

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <div className='w-full flex justify-around h-16 items-center border-2 border-black '>
        <h1 className='text-sm md:text-xl font-bold '>BlogVerse</h1>
        <Link to="/home" className='text-gray-700 hover:bg-blue-200 px-5 py-2 rounded-lg cursor-pointer'>Home</Link>
          {user ? (
          <div className='flex gap-4 items-center'>
            <Link to="/profile" title={`${user.email} (${user.role})`}
              className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer'>
              {user.fullName?.charAt(0).toUpperCase()}
            </Link>
            <span className='text-xs text-gray-500 hidden md:inline'>{user.role}</span>
            <button onClick={handleLogout} className='text-sm text-gray-700 cursor-pointer'>Logout</button>
          </div>
        ) : (
          <div className='flex gap-5'>
              <Link to="/signin" className='font-semibold text-gray-700 cursor-pointer'>Sign In</Link>
              <Link to="/signup" className='bg-blue-600 text-white text-xs md:text-md px-3 py-2 md:px-5 md:py-2 rounded-xl cursor-pointer'>Sign Up</Link>
          </div>
        )}
    </div>
  )
}

export default NavBar