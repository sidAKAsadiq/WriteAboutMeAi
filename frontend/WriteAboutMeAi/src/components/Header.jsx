import React, {useState} from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const is_authenticated = useSelector(state => state.auth.is_authenticated)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {is_authenticated && (
              <Link
                className="text-white hover:text-blue-300 px-3 py-2"
                to={'/logout'}
              >
                Logout
              </Link>
            )}
            {!is_authenticated && (
              <Link
                className="text-white hover:text-blue-300 px-3 py-2"
                to={'/login'}
              >
                Authenticate
              </Link>
            )}
            <Link
              to={'/history'}
              className="text-white hover:text-blue-300 px-3 py-2"
            >
              My history
            </Link>
            <Link
              target="_blank"
              to={'https://www.linkedin.com/in/muhammad-sadiq-054939219/'}
              className="text-white hover:text-blue-300 px-3 py-2"
            >
              Who made this?
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {is_authenticated && (
              <Link
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300"
                to={'/logout'}
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </Link>
            )}
            {!is_authenticated && (
              <Link
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300"
                to={'/login'}
                onClick={() => setIsMenuOpen(false)}
              >
                Authenticate
              </Link>
            )}
            <Link
              to={'/history'}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              My history
            </Link>
            <Link
              target="_blank"
              to={'https://www.linkedin.com/in/muhammad-sadiq-054939219/'}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Who made this?
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header