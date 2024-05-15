import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PROFILE } from '../../utils/mutations';

const RemoveAccount = ({ onRemove }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteProfile] = useMutation(DELETE_PROFILE);

  const handleDelete = async (profileId) => {
    try {
        const { data } = await deleteProfile({ variables: { profileId } });
         console.log(data.deleteProfile);
      // Call parent component's onRemove function
      onRemove();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
<div>
  <button onClick={() => setShowModal(true)} className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 ml-2 rounded-md">
    Delete Account
  </button>
  {showModal && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white p-4">
            <p className="text-lg text-gray-700">Are you sure you want to delete your account?</p>
            <div className="mt-4 flex justify-end">
              <button onClick={handleDelete} className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 mr-2 rounded-md">
                Yes
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default RemoveAccount;
