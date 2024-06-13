import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ChatBox from '../ChatBox';
import { AiOutlineMessage, AiFillStar } from 'react-icons/ai'; // Import the chat and star icons
import { RiProfileLine, RiTShirt2Line } from 'react-icons/ri';
import Auth from '../../utils/auth';
import ProfileAvatar from '../../assets/images/profile-avatar.png';
import { ThemeContext } from '../ThemeContext';
import RatingModal from '../RatingModal'; 
import renderStars from "../../utils/renderStars";

const ProfileList = ({ profiles, title }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ratingProfile, setRatingProfile] = useState(null); // State for rating modal
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 6;

  const handleChatClick = (user) => {
    setSelectedUser(user);
  };

  const handleModalClose = () => {
    setSelectedUser(null); // Reset selectedUser state when modal is closed
  };

  const handleRatingClick = (profile) => {
    setRatingProfile(profile);
  };

  const handleRatingModalClose = () => {
    setRatingProfile(null); // Reset ratingProfile state when rating modal is closed
  };

  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  // Get the ID of the logged-in user
  const loggedInUserId = Auth.loggedIn() && Auth.getProfile().data._id;

  // Filter out the logged-in user from the profiles list
  const filteredProfiles = profiles.filter((profile) => profile._id !== loggedInUserId);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  // Get the profiles to display for the current page
  const currentProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );



  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {currentProfiles.map((profile) => (
          <div
            key={profile._id}
            className={`rounded-lg shadow-xl p-6 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-black'}`}
          >
            <div className="grid grid-cols-2 items-center">
              {/* Column 1: Name and Jersey Number */}
              <div>
                <div className="flex items-center">
                  <h4 className="text-sm md:text-md lg:text-lg xl:text-xl">{profile.name}</h4>
                </div>
                <p className="font-bold">
                  <RiTShirt2Line className="mr-2 text-xl inline" /> {profile.jerseyNumber}
                </p>
                {/* Display star rating below jersey number */}
                <div className="mt-2">
                  {renderStars(profile.averageRating)}
                  <p className="text-sm">{profile.averageRating.toFixed(1)} / 5</p>
                </div>
              </div>
              {/* Column 2: Image */}
              <div className="flex justify-end items-center">
                <img
                  src={profile?.profilePic || ProfileAvatar}
                  alt="Profile"
                  className="rounded-full w-24 h-24 sm:w-20 sm:h-20 md:w-16 md:h-16 lg:w-24 lg:h-24"
                />
              </div>
            </div>
            {/* Icons */}
            <div className="flex justify-between mt-4">
              {/* Chat button */}
              <button
                className="flex items-center"
                onClick={() => handleChatClick(profile)}
              >
                <AiOutlineMessage className={`mr-2 text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`} />
                <span className='text-sm md:text-md lg:text-lg xl:text-xl'>{isDarkMode ? 'Chat' : 'Chat'}</span>
              </button>
              {/* Rate button */}
              <button
                className="flex items-center"
                onClick={() => handleRatingClick(profile)}
              >
                <AiFillStar className={`mr-2 text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`} />
                <span className='text-sm md:text-md lg:text-lg xl:text-xl'>{isDarkMode ? 'Rate' : 'Rate'}</span>
              </button>
              {/* Player info button */}
              <Link
                className="flex items-center hover:no-underline"
                to={`/profiles/${profile._id}`}
              >
                <RiProfileLine className={`mr-2 text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`} />
                <span className={`mr-2 text-sm md:text-md lg:text-lg xl:text-xl ${isDarkMode ? 'text-white hover:text-blue-300' : 'text-black hover:text-blue-700'}`}>
                  {isDarkMode ? 'View Profile' : 'View Profile'}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1">{currentPage}</span>
        <button
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* Render the chat box if a user is selected */}
      {selectedUser && (
        <ChatBox recipient={selectedUser} onCloseModal={handleModalClose} />
      )}
      {/* Render the rating modal if a profile is selected for rating */}
      {ratingProfile && (
        <RatingModal profile={ratingProfile} onClose={handleRatingModalClose} />
      )}
    </div>
  );
};

export default ProfileList;
