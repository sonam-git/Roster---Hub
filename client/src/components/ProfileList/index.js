import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../ChatBox"; // Import the ChatBox component
import { AiOutlineMessage } from "react-icons/ai"; // Import the chat icon
import { RiProfileLine } from "react-icons/ri"; // Import the profile icon
import Auth from "../../utils/auth";
import ProfileAvatar from "../../assets/images/profile-avatar.png";

const ProfileList = ({ profiles, title }) => {
  console.log(profiles)
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
  const loggedInUserId = Auth.loggedIn() && Auth.getProfile().data._id;

  // Filter out the logged-in user from the profiles list
  const filteredProfiles = profiles.filter(
    (profile) => profile._id !== loggedInUserId
  );

  return (
    <div>
      <h3 className="text-3xl font-bold text-center">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {filteredProfiles.map((profile) => (
          <div key={profile._id} className="bg-white rounded-lg shadow-xl p-6">
            <div className="grid grid-cols-2 items-center">
              {/* Column 1: Name and Jersey Number */}
              <div>
                <h4 className="font-bold">{profile.name}</h4>
                <p className="text-gray-600 font-bold">
                  Jersey Number: {profile.jerseyNumber}
                </p>
              </div>
              {/* Column 2: Image */}
              <div className="flex justify-center items-center">
                <img
                  src={profile?.profilePic || ProfileAvatar}
                  alt="Profile"
                  className="rounded-full w-24 h-24"
                />
              </div>
            </div>
            {/* Icons */}
            <div className="flex justify-between mt-4">
              {/* Chat button */}
              <button
                className=" flex items-center"
                onClick={() => handleChatClick(profile)}
              >
                <AiOutlineMessage className="mr-2 text-2xl" />
                <span>Chat</span>
              </button>
              {/* Player info button */}
              <Link
                className=" flex items-center hover:no-underline"
                to={`/profiles/${profile._id}`}
              >
                <RiProfileLine className="mr-2 text-2xl" />
                <span className="text-dark ">View Profile</span>
              </Link>
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