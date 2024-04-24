import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const MyProfile = () => {

  // Fetch the user's information
  const { loading, data} = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;

  const profile = data?.me;

  return (
    <>
      <h1>Player's Profile</h1>
      <h4>Name: {profile.name}</h4>
      {profile.jerseyNumber && <h4>Jersey Number: {profile.jerseyNumber}</h4>}
      {profile.position && <h4>Position: {profile.position}</h4>}
      {profile.phoneNumber && <h4>Contact: {profile.phoneNumber}</h4>}
    </>
  );
};

export default MyProfile;
