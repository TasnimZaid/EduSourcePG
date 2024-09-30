import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

const NavBar = ({ isSignedIn = false, profilePicture = "/api/placeholder/40/40", onLogout = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated to `text-lg` for larger font size
  const linkClass = `hover:text-blue-700 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
    isScrolled ? 'text-black' : 'text-black'
  }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white bg-opacity-80 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Updated to `text-2xl` for a larger logo text */}
              <span className={`text-2xl font-semibold ${isScrolled ? 'text-black' : 'text-black'}`}>EduSource</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className={linkClass}>Home</a>
                <a href="#" className={linkClass}>About</a>
                <a href="#" className={linkClass}>Services</a>
                <a href="#" className={linkClass}>Contact</a>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <img className="h-8 w-8 rounded-full" src={profilePicture} alt="Profile" />
                <button onClick={onLogout} className={`flex items-center ${linkClass}`}>
                  <LogOut className="h-5 w-5 mr-1 bg-black" />
                  Logout
                </button>
              </>
            ) : (
              <User className={`h-6 w-6 ${isScrolled ? 'text-black' : 'text-black'}`} />
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white ${
                isScrolled ? 'text-black' : 'text-black'
              }`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className={linkClass}>Home</a>
            <a href="#" className={linkClass}>About</a>
            <a href="#" className={linkClass}>Services</a>
            <a href="#" className={linkClass}>Contact</a>
            {isSignedIn && (
              <button onClick={onLogout} className={`flex items-center w-full ${linkClass}`}>
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
