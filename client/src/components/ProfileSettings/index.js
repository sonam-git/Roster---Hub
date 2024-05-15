import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  UPDATE_NAME_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  LOGOUT_USER
} from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
// import Auth from "../../utils/auth";
import RemoveAccount from "../RemoveAccount";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
  const [showFarewell, setShowFarewell] = useState(false);

  const [updateName] = useMutation(UPDATE_NAME_MUTATION);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);
  const [logoutUser] = useMutation(LOGOUT_USER);

// useNavigate hook to navigate to login page
// const navigate = useNavigate();

  const handleNameUpdate = async () => {
    try {
   await updateName({ variables: { name }, refetchQueries: [QUERY_ME] });
      setSuccessMessage("Your name has been changed successfully.");
      setName(""); // Clear input field after successful update
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Remove success message after 3 seconds
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      await updatePassword({ variables: { currentPassword, newPassword } });
      setPasswordSuccessMessage("Your password has been changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPasswordSuccessMessage("");
        setErrorMessage("");
        // if you want the user to be logged out as soon as the password is changed.
        // Auth.logout();
        // navigate("/");
      }, 4000);
    
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Failed to update password. Please try again.");
    }
  };
  const handleRemove = async () => {
    try {
      await logoutUser();
      setShowFarewell(true);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Name</h2>
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter your new name"
        />
        <button
          onClick={handleNameUpdate}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 ml-2 rounded-md"
        >
          Update
        </button>
      </div>
      {/* password update functionality */}
      <h2 className="text-xl font-semibold my-6">Update Password</h2>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {passwordSuccessMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{passwordSuccessMessage}</span>
        </div>
      )}
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
        placeholder="Enter current password"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
        placeholder="Enter new password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
        placeholder="Confirm your new password"
      />
       <div className="flex justify-between items-center mb-4">
      <button
        onClick={handlePasswordChange}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Change Password
      </button>
      <RemoveAccount onRemove={handleRemove} />
      {showFarewell && <p>Sorry to see you leave. We wish you all the best!</p>}
      </div>
    </div>
  );
};

export default ProfileSettings;
