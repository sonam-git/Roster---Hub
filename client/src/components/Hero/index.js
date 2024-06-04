import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const Hero = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access isDarkMode from ThemeContext

  return (
    <div className={`bg-blue-500 sm:py-20 px-4 sm:px-6 lg:px-8 rounded-lg p-4 mt-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'text-black'}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
         Roster Hub
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-white">
          Create your team's hub with us
        </p>
        <div className="mb-8">
          <div className={`bg-blue-200 ${isDarkMode ? 'bg-gray-500 text-white' : 'text-black'} bg-opacity-75 rounded-lg p-6`}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
              Create Your Profile Now
            </h2>
            <p className="text-sm text-justify sm:text-base">
              This is the platform where each player within the team can create their profile, upload their profile picture, 
              update information such as playing position, name, jersey number, photo, password, etc. Each player can endorse 
              their teammates for their skills. It also has messaging features where players can post their thoughts, comments, 
              and send texts to each other.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            className="bg-gray-800 transparent border hover:bg-gray-100 text-gray-300  hover:no-underline font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full mr-4"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="bg-gray-800 border border-gray-300 hover:no-underline  hover:bg-gray-100 text-gray-300 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full "
            to="/signup"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
