import React from "react";
import Auth from "../../utils/auth"

const UserListModal = ({ show, onClose, profiles, onSelectUser, isDarkMode }) => {
  if (!show) return null;

  const loggedInUserId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
  const filteredProfiles = profiles.filter((user) => user._id !== loggedInUserId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`max-w-md w-full rounded-lg shadow-lg p-6 relative ${
          isDarkMode ? "bg-gray-600 text-white" : "bg-white text-black"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Select a user to message:</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {filteredProfiles.map((user) => (
            <li key={user._id}>
              <button
                onClick={() => onSelectUser(user)}
                className={`w-full px-4 py-2 text-left rounded hover:bg-indigo-600 hover:text-white ${
                  isDarkMode ? "bg-gray-700 text-white hover:text-white" : "bg-gray-100"
                }`}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserListModal;
