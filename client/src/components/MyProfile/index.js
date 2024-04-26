import React from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const MyProfile = () => {

  // Fetch the user's information
  const { loading, data} = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;

  const me = data?.me;
  
  
  return (
    <>
      <h1>Your Profile</h1>
      <h4>Name: {me.name}</h4>
      {me.jerseyNumber && <h4>Jersey Number: {me.jerseyNumber}</h4>}
      {me.position && <h4>Position: {me.position}</h4>}
      {me.phoneNumber && <h4>Contact: {me.phoneNumber}</h4>}
    </>
  );
};

export default MyProfile;
