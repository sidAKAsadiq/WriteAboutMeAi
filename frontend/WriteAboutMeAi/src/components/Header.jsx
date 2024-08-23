import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

function Header() {
  return (
          <nav className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                  <Logo />
              </div>
              <div className="flex items-center">
                <Link to={'/'} className="text-white hover:text-blue-300 px-3 py-2">Home</Link>
                <Link className="text-white hover:text-blue-300 px-3 py-2" to={'/logout'} > Logout</Link>
                <a href="#" className="text-white hover:text-blue-300 px-3 py-2">Contact</a>
              </div>
            </div>
          </div>
        </nav>
  )
}

export default Header