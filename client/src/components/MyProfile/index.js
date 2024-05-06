import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import MessageList from "../MessageList";
import ProfilePicUploader from "../ProfilePicUploader";
import ProfileAvatar from "../../assets/images/profile-avatar.png"

const MyProfile = ({ isLoggedInUser }) => {
  // Fetch the user's information
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) return <div>Loading...</div>;

  const me = data?.me;

  return (
    <div className="md:flex md:space-x-4 mb-6 md:mb-0">
      {/* Profile Details */}
      <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6 max-w-md">
       
        {/* Profile Picture */}
        <img
          src={me?.profilePic || ProfileAvatar } // Use the profile picture directly from the profile data or a placeholder image URL
          alt="Profile"
          className="rounded-full w-28 h-28 mx-auto mb-4"
        />
        {/* Always display ProfilePicUploader */}
        <ProfilePicUploader profileId={me._id}/>
        <br></br>
        {/* Profile Information */}
        <div className="md:text-left text-center">
          <h1 className="text-2xl font-bold text-center">{me?.name}</h1>
          {me?.jerseyNumber && <p className="text-gray-700 text-center">Jersey Number: {me.jerseyNumber}</p>}
          {me?.position && <p className="text-gray-700 text-center">Position: {me.position}</p>}
          {me?.phoneNumber && <p className="text-gray-700 text-center">Contact: {me.phoneNumber}</p>}
        </div>
      </div>
      {/* Message List */}
      <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl">
          {/* Conditional rendering of MessageList */}
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
