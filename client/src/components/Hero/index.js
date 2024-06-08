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
          <div className={`bg-blue-200 rounded-lg shadow-md p-1 w-full md:w-2/3 lg:w-3/4 mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'text-dark'}`}>
        <div className={`mb-2 p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'text-dark'}`}>
          <h2 className="text-sm md:text-md lg:text-lg xl:text-lg font-bold mb-2">About the Author</h2>
          <p className='text-sm md:text-md lg:text-lg xl:text-lg'>
            As a fullstack developer, soccer player, and lover, Sonam J Sherpa decided to create this simple app for his soccer team to interact with each other for fun and to get to know new and old players within the team.
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'text-dark'}`}>
          <div>
            <h2 className="text-sm md:text-md lg:text-lg xl:text-lg font-bold mb-2">App Features</h2>
            <ul className="list-disc list-inside text-sm md:text-md lg:text-lg xl:text-lg">
              <li>Sign up with user information</li>
              <li>Upload profile picture</li>
              <li>Add information</li>
              <li>Update profile information</li>
              <li>Add post and comment</li>
              <li>Message between players</li>
              <li>Endorse teammates' skills</li>
              <li>Manage endorsed skills</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm md:text-md lg:text-lg xl:text-lg font-bold mb-2">Future Features</h3>
            <ul className="list-disc list-inside text-sm md:text-md lg:text-lg xl:text-lg">
              <li>Real-time chat</li>
              <li>Game schedule setup</li>
              <li>Notifications</li>
              <li>Like buttons for skills</li>
              <li>And many more ....</li>
            </ul>
          </div>
        </div>
      </div>
        <div className="flex justify-center mt-4">
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
