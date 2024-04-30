import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import MessageList from "../MessageList";
import profileImage from '../../assets/images/sonamphoto.jpg'; // Import the profile image

const MyProfile = ({ isLoggedInUser }) => {
  // Fetch the user's information
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;

  const me = data?.me;

  return (
    <div className="flex flex-col md:flex-row justify-center">
      {/* Profile Details */}
      <div className="md:w-1/2 md:pr-4 flex items-center justify-center mb-6 md:mb-0">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <img src={profileImage} alt="Profile" className="rounded-full w-24 h-24 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold mb-2 text-center">{me?.name}</h1>
          {me?.jerseyNumber && <p className="text-gray-700 text-center">Jersey Number: {me.jerseyNumber}</p>}
          {me?.position && <p className="text-gray-700 text-center">Position: {me.position}</p>}
          {me?.phoneNumber && <p className="text-gray-700 text-center">Contact: {me.phoneNumber}</p>}
        </div>
      </div>

      {/* Message List */}
      <div className="md:w-1/2 md:pl-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          {me?.receivedMessages ? (
            <MessageList messages={me.receivedMessages || []} isLoggedInUser={isLoggedInUser} />
          ) : (
            <h4>No messages yet</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
