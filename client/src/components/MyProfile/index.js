import React, { useState } from "react";
import UserInfoForm from "../UserInfoForm";
import Auth from "../../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const MyProfile = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Fetch the user's information
  const { loading, data, refetch } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;

  const profile = data?.me;

  return (
    <>
      <h1>Player's Profile</h1>
      <h4>Name: {profile.name}</h4>
      {profile.jerseyNumber && <h4>Jersey Number: {profile.jerseyNumber}</h4>}
      {profile.position && <h4>Position: {profile.position}</h4>}
      {profile.phoneNumber && <h4>Contact: {profile.phoneNumber}</h4>}
      {Auth.loggedIn() && Auth.getProfile().data._id === profile._id && (
        <div>
          <button onClick={toggleForm}>Add More Information</button>
          {showForm && <UserInfoForm refetch={refetch} />}
        </div>
      )}
    </>
  );
};

export default MyProfile;
