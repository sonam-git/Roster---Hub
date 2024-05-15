import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className={`w-full p-2 bg-gray-900 text-white ${className}`}>
      <div className="container text-center">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <p>&copy; {new Date().getFullYear()} - Roster Hub</p>
      </div>
    </footer>
  );
};

export default Footer;
