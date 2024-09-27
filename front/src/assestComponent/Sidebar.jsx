import React, { useState, useEffect, useRef } from 'react';

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

  return (
    <nav
      ref={sidebarRef}
      className={`transition-all h-screen fixed top-0 left-0 py-4 font-[sans-serif] ${isExpanded ? 'w-[200px] z-50' : 'w-[50px] z-10'} bg-[#ffffff]`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M3 12l18 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3l0 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="space-y-2.5 mt-6">
        <li className="relative group">
          <a
            href="javascript:void(0)"
            className={`text-[#333] text-sm flex items-center ${isExpanded ? 'bg-white hover:bg-white px-3 py-4' : 'px-2 py-2'} transition-all rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 512 512"
            >
              <path d=""/>
            </svg>
            {/* Add transition to the span for smoother appearance */}
            <span
              className={`ml-2 overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}
              style={{ transitionDelay: isExpanded ? '0.2s' : '0s' }} // Optional delay
            >
              Dashboard
            </span>
          </a>
        </li>
        {/* Add more items as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;
