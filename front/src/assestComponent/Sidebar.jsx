import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Book, Settings, Mail, Menu, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const menuItems = [
    { icon: Home, text: 'Dashboard', path: '/' },
    { icon: User, text: 'Profile', path: '/TeacherProfileInfo' },
    { icon: Book, text: 'AppointmentForConsultant', path: '/AppointmentForConsultant' },
    { icon: Mail, text: 'ConsultantRequests', path: '/ConsultantRequests' },
    { icon: Settings, text: 'TeacherProfile', path: '/TeacherProfile' },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen bg-[#0e1b30] text-white transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="w-full p-4 flex justify-end items-center text-white hover:text-yellow-100"
      >
        {isExpanded ? (
          <ChevronLeft size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path} // Use Link to navigate
                className={`flex items-center p-4 transition-colors duration-200 hover:bg-[#9bafbe63] hover:text-white ${
                  isExpanded ? 'justify-start' : 'justify-center'
                }`}
              >
                <item.icon size={24} className={`${isExpanded ? 'mr-4' : ''} text-white hover:text-black`} />
                {isExpanded && (
                  <span className="transition-opacity duration-200 opacity-100">
                    {item.text}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
