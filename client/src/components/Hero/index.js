import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Your Team's Roster Hub
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Experience the thrill of the game with us
        </p>
        <div className="flex justify-center">
          <Link
            className="bg-blue-500 transparent border hover:bg-blue-800 text-white hover:no-underline font-bold py-3 px-6 rounded-full mr-4"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="bg-transparent border border-gray-300 hover:no-underline  hover:bg-gray-100 text-gray-300 font-bold py-3 px-6 rounded-full"
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
