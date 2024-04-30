import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatBox from '../ChatBox'; // Import the ChatBox component

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

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-span-1">
              <div className="card mb-3 shadow-xl">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.name} <br />
                  <span className="text-white text-sm">
                    Jersey Number: {profile.jerseyNumber}
                  </span>
                  <br />
                  <span className="text-white text-sm">
                    Currently has {profile.skills ? profile.skills.length : 0}{' '}
                    endorsed skill
                    {profile.skills && profile.skills.length === 1 ? '' : 's'}
                  </span>
                </h4>
  
                <div className="card-body flex justify-between items-center">
                  {/* Chat button */}
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => handleChatClick(profile)}
                  >
                    Chat
                  </button>
                  {/* Player info button */}
                  <Link
                    className="btn btn-squared btn-light text-dark"
                    to={`/profiles/${profile._id}`}
                  >
                    Player's Info <span>&#8594;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
  
      {/* Render the chat box if a user is selected */}
      {selectedUser && <ChatBox recipient={selectedUser} onCloseModal={handleModalClose} />}
    </div>
  );
  
};

export default ProfileList;
