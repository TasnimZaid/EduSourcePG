import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import welcome from "./assets/139107b3e3c7fcecd44f262243c9bb-unscreen.gif"

const WelcomePopup = ({ imageSrc }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#000] bg-opacity-50">
      <div className="bg-gradient-to-br bg-[#fff] rounded-lg p-8 max-w-md w-full m-4 relative overflow-hidden shadow-lg">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white hover:text-[#FFCC70] transition-colors duration-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-4 text-center text-white animate-pulse">
          Welcome to EduSource!
        </h2>
        <div className="mb-6 overflow-hidden rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
          <img
            src={welcome}
            alt="Welcome"
            className="w-full h-auto"
          />
        </div>
        <p className="text-center text-white text-lg font-semibold animate-bounce">
          We're excited to have you here!
        </p>
        <p className="text-center text-[#ff1fdd] mt-2 animate-pulse">
          Explore and learn with us!
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsVisible(false)}
            className="bg-white text-[#fff] px-6 py-2 rounded-full font-bold bg-[#a070ff] hover:text-white transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;