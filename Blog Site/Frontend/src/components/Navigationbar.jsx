import React from 'react'
import {NavLink} from 'react-router-dom'

const Navigationbar = () => {
  return (
    <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="Blog.svg" alt="Blog Logo" className="h-8 w-8" />
        <span className="font-bold text-xl">Shumail's Blogs</span>
      </div>
      <ul className="flex gap-6">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : "text-white" }>Home</NavLink>
        </li>
        <li>
          <NavLink to="/posts" className={({ isActive }) => isActive ? "text-red-500" : "text-white" }>Posts</NavLink>
        </li>
        <li>
          <NavLink to="/new" className={({ isActive }) => isActive ? "text-red-500" : "text-white" }>New</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-red-500" : "text-white" }>About</NavLink>          
        </li>
      </ul>
    </div>
  )
}

export default Navigationbar
