import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Book, Settings, Mail, ArrowRight, ChevronLeft, FileText } from 'lucide-react'; // إضافة الأيقونة FileText
import { Link } from 'react-router-dom';
import logo from './Colorful Abstract Brain Illustrative Technology Ai Logo.png';

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
    { icon: Home, text: 'Dashboard', path: '/AddPricingPlanForm' },
    { icon: User, text: 'Profile', path: '/TeacherProfileInfo' },
    { icon: Book, text: 'Appointment For Consultant', path: '/AppointmentForConsultant' },
    { icon: Mail, text: 'Consultant Requests', path: '/Response' },
    { icon: Settings, text: 'Teacher Profile', path: '/TeacherProfile' },
    { icon: FileText, text: 'Teacher Responses', path: '/TeacherResponses' }, // إضافة المسار الجديد
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen bg-[#75B9EA] text-[#070927] transition-all duration-300 z-50 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo section */}
      <div className="flex items-center justify-center p-4">
      <Link to="/" >

        <img 
          src={logo} 
          alt="Logo" 
          className="h-10 w-auto transition-all duration-200"
        /> </Link>
      </div>

      <button
        onClick={toggleSidebar}
        className="w-full p-4 flex justify-end items-center text-[#0c043e] hover:text-yellow-100"
      >
        {isExpanded ? (
          <ChevronLeft size={24} />
        ) : (
          <ArrowRight size={24} />
        )}
      </button>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center p-4 transition-colors duration-200 hover:bg-[#9bafbe63] hover:text-[#430a28] ${
                  isExpanded ? 'justify-start' : 'justify-center'
                }`}
              >
                <item.icon size={24} className={`${isExpanded ? 'mr-4' : ''} text-[#0b0531] hover:text-black`} />
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
