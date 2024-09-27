import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

const NavBar = ({ isSignedIn = false, profilePicture = "/api/placeholder/40/40" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#3B82F6] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-lg font-semibold">Logo</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Services</a>
                <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isSignedIn ? (
                <img className="h-8 w-8 rounded-full" src={profilePicture} alt="Profile" />
              ) : (
                <User className="h-6 w-6 text-white" />
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
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
            <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;