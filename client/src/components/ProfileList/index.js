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
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    Jersey Number: {profile.jerseyNumber}
                  </span>
                  <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has {profile.skills ? profile.skills.length : 0}{' '}
                    endorsed skill
                    {profile.skills && profile.skills.length === 1 ? '' : 's'}
                  </span>
                </h4>

                <div className="card-body">
                  {/* Add a chat button for each profile */}
                  <button
                    className="btn btn-block btn-info"
                    onClick={() => handleChatClick(profile)}
                  >
                    Chat
                  </button>
                </div>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  Player's Info <span>&#8594;</span>
                </Link>
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
