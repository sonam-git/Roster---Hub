import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../ChatBox"; // Import the ChatBox component
import Auth from "../../utils/auth";

const ProfileList = ({ profiles, title }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChatClick = (user) => {
    setSelectedUser(user);
  };

  const handleModalClose = () => {
    setSelectedUser(null); // Reset selectedUser state when modal is closed
  };

  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  // Get the ID of the logged-in user
  const loggedInUserId = Auth.loggedIn() && Auth.getProfile().data._id
  

  // Filter out the logged-in user from the profiles list
  const filteredProfiles = profiles.filter(profile => profile._id !== loggedInUserId);

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 my-4">
        {filteredProfiles.map((profile) => (
          <div key={profile._id} className="col-span-1">
            <div className="card mb-3 shadow-xl">
              <h4 className="card-header bg-dark text-light p-2 m-0">
                {profile.name} <br />
                <span className="text-white text-sm">
                  Jersey Number: {profile.jerseyNumber}
                </span>
                <br />
              </h4>
              <div className="card-body flex justify-between items-center">
                {/* Chat button */}
                <button
                  className="btn btn-info mr-2"
                  onClick={() => handleChatClick(profile)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Player info button */}
                <Link
                  className="btn btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  <span className="text-black text-sm">
                    Currently has {profile.skills ? profile.skills.length : 0}{" "}
                    endorsed skill
                    {profile.skills && profile.skills.length === 1 ? "" : "s"}
                  </span>
                </Link>
                {/* Player info button */}
                <Link
                  className="btn btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Render the chat box if a user is selected */}
      {selectedUser && (
        <ChatBox recipient={selectedUser} onCloseModal={handleModalClose} />
      )}
    </div>
  );
};

export default ProfileList;
