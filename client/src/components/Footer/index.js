import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className={`w-full p-2 bg-gray-800 text-white ${className}`}>
 <div className="container text-center">
      {location.pathname !== '/' && (
        <div className="flex justify-center items-center mb-3">
          <button
            className="btn btn-dark mr-3 "
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
          <p className="inline-block mt-3">&copy; {new Date().getFullYear()} - Roster Hub</p>
        </div>
      )}
      {location.pathname === '/' && (
        <p >&copy; {new Date().getFullYear()} - Roster Hub</p>
      )}
    </div>
    </footer>
  );
};

export default Footer;
