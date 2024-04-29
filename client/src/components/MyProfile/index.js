import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import MessageList from "../MessageList";

const MyProfile = ({ isLoggedInUser }) => {

  // Fetch the user's information
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;

  const me = data?.me;

  return (
    <>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Your Profile</h1>
          <h4>Name: {me?.name}</h4>
          {me?.jerseyNumber && <h4>Jersey Number: {me.jerseyNumber}</h4>}
          {me?.position && <h4>Position: {me.position}</h4>}
          {me?.phoneNumber && <h4>Contact: {me.phoneNumber}</h4>}
        </div>
        <div className="col-12 col-md-10 my-3">
          {me?.receivedMessages ? (
            <MessageList messages={me.receivedMessages || []} isLoggedInUser={isLoggedInUser} />
          ) : (
            <h4>No messages yet</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
