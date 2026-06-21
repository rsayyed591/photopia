import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-purple-600 text-white'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Camera size={24} />
            <span>Photopia</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && <Link to="/" className="hover:text-purple-200">Home</Link>}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="hover:text-purple-200">Login</Link>
                <Link to="/register" className="hover:text-purple-200">Register</Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            )}
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-purple-500">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-purple-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn && <Link to="/" className="block px-3 py-2 rounded-md hover:bg-purple-500">Home</Link>}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-purple-500">Login</Link>
                <Link to="/register" className="block px-3 py-2 rounded-md hover:bg-purple-500">Register</Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md bg-red-500 hover:bg-red-600">
                Logout
              </button>
            )}
            <button onClick={toggleDarkMode} className="flex items-center w-full px-3 py-2 rounded-md hover:bg-purple-500">
              {darkMode ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
