import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_ME, QUERY_SINGLE_PROFILE } from "../utils/queries";
import MessageList from "../components/MessageList";
import "@fortawesome/fontawesome-free/css/all.css";

const Message = ({ isDarkMode }) => {
  const { profileId } = useParams();
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data, error } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
      pollInterval: profileId ? undefined : 5000, // Only poll for logged-in user's inbox
    }
  );
  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error.message}</div>;
  }
  const profile = data?.me || data?.profile || {};

  return (
    <>
      {/* Message List */}
      <div className="container mt-5">
        <MessageList
          messages={profile?.receivedMessages || []}
          isLoggedInUser={!profileId && true}
          isDarkMode={isDarkMode}
        />
      </div>
    </>
  );
};

export default Message;
