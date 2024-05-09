import React, { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

const NameUpdate = ({ profileId, userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(userData.name);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call your mutation to update the name here
    // Make sure to close the modal after updating the name
    setShowModal(false);
  };

  return (
    <div>
      {/* User's Name */}
      <div className="flex items-center">
        <p className="mr-2">{userData.name}</p>
        {/* Edit Icon */}
        <FaUserEdit className="text-blue-500 cursor-pointer" onClick={handleModalToggle} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-md p-5 mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex justify-end pt-4 pr-4">
                {/* Close Button */}
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleModalToggle}
                >
                  <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      className="heroicon-ui"
                      d="M6.7 6.7l-1.4 1.4L10.6 12l-5.3 5.3 1.4 1.4L12 13.4l5.3 5.3 1.4-1.4L13.4 12l5.3-5.3-1.4-1.4L12 10.6 6.7 5.3z"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal Content */}
              <form onSubmit={handleFormSubmit}>
                <div className="px-10 py-6">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      New Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Enter your new name"
                      value={newName}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update Name
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameUpdate;
