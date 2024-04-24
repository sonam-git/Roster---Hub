import React, { useState } from "react";
import UserInfoForm from "../UserInfoForm";
import Auth from "../../utils/auth";

const UserProfile = ({ profile }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
    <h1>Player's Profile</h1>
      <h4>Name: {profile.name}</h4>
      <h4>Jersey Number: {profile.jerseyNumber}</h4>
      <h4>Position: {profile.position}</h4>
      <h4>Contact: {profile.phoneNumber}</h4>
      {Auth.loggedIn() && Auth.getProfile().data._id === profile._id && (
        <div>
          <button onClick={toggleForm}>Add More Information</button>
          {showForm && <UserInfoForm />}
        </div>
      )}
    </>
  );
};

export default UserProfile;
