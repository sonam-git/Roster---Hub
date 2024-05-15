import React from 'react';
import SoccerBall from "../../assets/images/soccer-ball.png";

const Welcome = ({ username }) => {
    
  return (
    <div className="flex flex-col items-center justify-center rounded-lg shadow-xl bg-gradient-to-br from-indigo-800 to-white p-8">
      <h1 className="text-4xl md:text-6xl text-center font-bold mb-8 text-yellow-200">
        Welcome <span className="text-light">{username}</span> 
      </h1>
      <p className="text-lg md:text-xl text-center text-white mb-8">
        Meet Your Team
      </p>
      <div className="animate-bounce mb-8">
        <img
          src={SoccerBall}
          alt="Soccer Ball"
          className="w-28 md:w-28"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/3 lg:w-3/4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Author</h2>
          <p className="text-gray-700">
            As a fullstack developer, soccer player, and lover, Sonam J Sherpa decided to create this simple app for his soccer team to interact with each other for fun and to get to know new and old players within the team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Features</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Sign up with name, email, & password</li>
              <li>Upload profile picture</li>
              <li>Add information </li>
              <li>Update profile information & password</li>
              <li>Message between players</li>
              <li>Endorse teammates' skills</li>
              <li>Filter skills endorsed by teammates</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Future Features</h3>
            <ul className="list-disc list-inside text-gray-700">
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
