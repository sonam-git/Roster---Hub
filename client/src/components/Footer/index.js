import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className={`w-full p-2 bg-gray-800 text-white ${className}`}>
      <div className="container text-center mt-2">
        {location.pathname !== '/' && (
          <div className="flex flex-col sm:flex-row justify-center items-center mb-3">
            <button
              className="btn btn-light mb-2 sm:mb-0 sm:mr-3"
              onClick={() => navigate(-1)}
            >
              &larr; Home
            </button>
            <p className="inline-block">&copy; {new Date().getFullYear()} - Roster Hub</p>
          </div>
        )}
        {location.pathname === '/' && (
          <p>&copy; {new Date().getFullYear()} - Roster Hub / Sonam J Sherpa</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
