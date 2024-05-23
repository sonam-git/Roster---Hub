// src/components/Welcome.js
import React, { useContext } from 'react';
import SoccerBall from "../../assets/images/soccer-ball-transparent.png";
import { ThemeContext } from '../ThemeContext'; 

const Welcome = ({ username }) => {
  const { isDarkMode } = useContext(ThemeContext); 

  return (
    <div className={`flex flex-col items-center justify-center rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-indigo-800 to-white text-black'} p-8`}>
      <h1 className=" text-center font-bold mb-8 text-sm md:text-6xl lg:text-xl xl:text-2xl">
        Welcome <span className="text-yellow-200 text-sm md:text-md lg:text-lg xl:text-xl">{username}</span> 
      </h1>
      <p className={`text-sm md:text-md text-center ${isDarkMode ? 'text-white' : 'text-black'} mb-8`}>
        Meet Your Team
      </p>
      <div className={`animate-bounce mb-4 rounded-full ${isDarkMode ? 'bg-gray-200 text-white' : ' text-black'}`}>
        <img
          src={SoccerBall}
          alt="Soccer Ball"
          className={`w-28 md:w-28  `}
        />
      </div>
      <div className={`bg-white rounded-lg shadow-md p-1 w-full md:w-2/3 lg:w-3/4 ${isDarkMode ? 'bg-gray-800 text-white' : 'text-dark'}`}>
        <div className={`mb-2 p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'text-dark'}`}>
          <h2 className="text-sm md:text-md lg:text-lg xl:text-xl font-bold mb-2">About the Author</h2>
          <p className='text-sm md:text-md lg:text-lg xl:text-xl '>
            As a fullstack developer, soccer player, and lover, Sonam J Sherpa decided to create this simple app for his soccer team to interact with each other for fun and to get to know new and old players within the team.
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'text-dark'}`}>
          <div>
            <h2 className="text-sm md:text-md lg:text-lg xl:text-xl font-bold mb-2">App Features</h2>
            <ul className='text-sm md:text-md lg:text-lg xl:text-xl '>
              <li>Sign up with user information</li>
              <li>Upload profile picture</li>
              <li>Add information </li>
              <li>Update profile information</li>
              <li>Message between players</li>
              <li>Endorse teammates' skills</li>
              <li>Manage endorsed skills  </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm md:text-md lg:text-lg xl:text-xl font-bold mb-2">Future Features</h3>
            <ul className='text-sm md:text-md lg:text-lg xl:text-xl '>
              <li>Real-time chat</li>
              <li>Game schedule setup</li>
              <li>Notifications</li>
              <li>Like buttons for endorsed skills</li>
              <li>And many more ....</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
