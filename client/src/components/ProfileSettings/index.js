import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_NAME_MUTATION, UPDATE_PASSWORD_MUTATION } from '../../utils/mutations'; 
import { QUERY_ME } from '../../utils/queries';

const ProfileSettings = ({user}) => {
  const [name, setName] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

  const [updateName] = useMutation(UPDATE_NAME_MUTATION,);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);

  const handleNameUpdate = async () => {
    try {
      await updateName({ variables: { name }, refetchQueries:[QUERY_ME]});
      setSuccessMessage('Your name has been changed successfully.');
      setName(''); // Clear input field after successful update
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Remove success message after 3 seconds
    } catch (error) {
      console.error('Error updating name:', error);
      // Handle error
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      await updatePassword({ variables: { oldPassword, newPassword } });
      setSuccessMessage('Your password has been changed successfully.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto ">
      <h2 className="text-xl font-semibold mb-4">Update Name</h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        placeholder="Enter your new name"
      />
      <button
        onClick={handleNameUpdate}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Update Name
      </button>

{/* password update functionality */}
      <h2 className="text-xl font-semibold my-6">Update Password</h2>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        placeholder="Enter old password"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        placeholder="Enter new password"
      />
       <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        placeholder="Confirm your new password"
      />
      <button
        onClick={handlePasswordChange}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Change Password
      </button>
    </div>
  );
};

export default ProfileSettings;
