import React from 'react';
import SoccerBall from "../../assets/images/soccer-ball.png";

const Welcome = ({ username }) => {
    
  return (
    <div className="flex flex-col items-center justify-center rounded-lg shadow-xl bg-gradient-to-br from-green-400 to-white">
      <h1 className="text-4xl md:text-6xl text-center font-bold mb-8 text-gray-800 p-5">
        Welcome <span className="text-indigo-600">{username}</span> to the Roster Hub
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-600 mb-8">
        Meet Your Team
      </p>
      <div className="animate-bounce">
        <img
          src={SoccerBall}
          alt="Soccer Ball"
          className="w-28 md:w-28"
        />
      </div>
    </div>
  );
};

export default Welcome;
