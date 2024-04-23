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
      <h2>Name: {profile.name}</h2>
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
