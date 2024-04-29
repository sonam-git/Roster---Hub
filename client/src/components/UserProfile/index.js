import React from "react";

const UserProfile = ({ profile }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Player's Profile</h1>
      <div className="mb-4">
        <p className="text-lg font-semibold">Name : {profile.name}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Jersey Number : {profile.jerseyNumber}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Position : {profile.position}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Contact: {profile.phoneNumber}</p>
      </div>
    </div>
  );
};

export default UserProfile;
