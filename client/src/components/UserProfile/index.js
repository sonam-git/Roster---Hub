import React from "react";
import profileImage from "../../assets/images/sonamphoto.jpg";

const UserProfile = ({ profile }) => {
  return (
    <div className="md:w-2/3 md:pr-4 flex items-center justify-center mb-6 md:mb-0">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4 mx-auto"
        />
        <h1 className="text-2xl font-bold mb-2 text-center">
         {profile.name}
        </h1>
        <p className="text-gray-700 text-center">
          Jersey Number : {profile.jerseyNumber}
        </p>
        <p className="text-gray-700 text-center">
          Position : {profile.position}
        </p>
        <p className="text-gray-700 text-center">
          Contact: {profile.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
