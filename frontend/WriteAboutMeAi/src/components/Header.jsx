import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const is_authenticated = useSelector(state => state.auth.is_authenticated)


  return (
          <nav className="bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                  <Logo />
              </div>
              <div className="flex items-center">
                {is_authenticated && <Link className="text-white hover:text-blue-300 px-3 py-2" to={'/logout'} > Logout</Link>}
                {!is_authenticated && <Link className="text-white hover:text-blue-300 px-3 py-2" to={'/login'} > Authenticate</Link>}                
                <Link to={'/history'} className="text-white hover:text-blue-300 px-3 py-2">My history</Link>
                <Link target='_blank' to={'https://www.linkedin.com/in/muhammad-sadiq-054939219/'} className="text-white hover:text-blue-300 px-3 py-2">Who made this?</Link>
              </div>
            </div>
          </div>
        </nav>
  )
}

export default Header