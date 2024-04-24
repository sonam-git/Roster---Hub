import React from "react";


const UserProfile = ({ profile }) => {
  
  return (
    <>
    <h1>Player's Profile</h1>
      <h4>Name: {profile.name}</h4>
      <h4>Jersey Number: {profile.jerseyNumber}</h4>
      <h4>Position: {profile.position}</h4>
      <h4>Contact: {profile.phoneNumber}</h4>
    </>
  );
};

export default UserProfile;
