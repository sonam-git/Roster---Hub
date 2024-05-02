import React from "react";
import SkillsList from "../SkillsList";


const UserProfile = ({ profile }) => {

  return (
    <div className="md:flex md:space-x-4 mb-6 md:mb-0">
      {/* Image and User Information */}
      <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6 max-w-md">
        <img
          src={profile.profilePic} // Use the profile picture directly from the profile data
          alt="Profile"
          className="rounded-full w-24 h-24 mx-auto mb-4"
        />
        <div className="md:text-left text-center">
          <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
          <p className="text-gray-700">Jersey Number: {profile.jerseyNumber}</p>
          <p className="text-gray-700">Position: {profile.position}</p>
          <p className="text-gray-700">Contact: {profile.phoneNumber}</p>
        </div> 
      </div>
      {/* Skills List */}
      <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6 max-w-2xl"> {/* Adjusted width */}
        <SkillsList skills={profile.skills || []} profile={profile} />
      </div>
    </div>
  );
  
};

export default UserProfile;
