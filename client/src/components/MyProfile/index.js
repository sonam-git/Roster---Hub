// src/components/MyProfile.js
import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { SAVE_SOCIAL_MEDIA_LINK } from '../../utils/mutations';
import { RiTShirt2Line } from 'react-icons/ri'; 
import { FaUser } from 'react-icons/fa';
import ProfilePicUploader from '../ProfilePicUploader';
import ProfileManagement from '../ProfileManangement';
import ProfileAvatar from '../../assets/images/profile-avatar.png';
import '@fortawesome/fontawesome-free/css/all.css';
import { ThemeContext } from '../ThemeContext';

const MyProfile = ({ isLoggedInUser }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { loading, data } = useQuery(QUERY_ME);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [saveSocialMediaLink] = useMutation(SAVE_SOCIAL_MEDIA_LINK);

  if (loading) return <div>Loading...</div>;

  const me = data?.me;

  const saveLink = async () => {
    try {
      await saveSocialMediaLink({
        variables: {
          userId: me?._id,
          type: selectedSocialMedia,
          link: socialMediaLink,
        },
      });
      setSelectedSocialMedia(null);
      setSocialMediaLink("");
    } catch (error) {
      console.error("Error saving social media link:", error);
    }
  };

  return (
    <>
<div className={`md:flex md:space-x-2 mb-6 md:mb-0 rounded-lg ${isDarkMode ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}>
  <div className={`md:w-2/5  md:mb-0 p-2 `}>
    <div className={`wd-full rounded-lg overflow-hidden shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <div className={`w-full h-[200px] flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-blue-300'}`}>
        <div className="w-40 h-40 rounded-full bg-white relative overflow-hidden">
          <img
            src={me?.profilePic || ProfileAvatar}
            alt="Profile"
            className="rounded-full w-40 h-40 mx-auto mb-4"
          />
        </div>
      </div>
      <div className="py-10 px-6 grid grid-cols-1 gap-6">
        <ProfilePicUploader profileId={me._id} profilePicUrl={me.profilePic} isDarkMode={isDarkMode} />
        <div className="flex flex-col items-center">
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black-700'}`}>
            {me?.name[0].toUpperCase() + me?.name.slice(1)}
          </h3>
          {me?.position && (
            <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <FaUser className="mr-2 text-xl inline mb-1" />
              {me?.position}
            </p>
          )}
          {me?.jerseyNumber && (
            <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <RiTShirt2Line className="mr-2 text-2xl inline" />= {me?.jerseyNumber}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <span
            className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-[#1DA1F2]'}`}
            onClick={() => setSelectedSocialMedia("twitter")}
          >
            <i className="fa-brands fa-twitter text-white"></i>
          </span>
          <span
            className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-[#162666]'}`}
            onClick={() => setSelectedSocialMedia("facebook")}
          >
            <i className="fa-brands fa-facebook text-white"></i>
          </span>
          <span
            className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-[#0077b5]'}`}
            onClick={() => setSelectedSocialMedia("linkedin")}
          >
            <i className="fa-brands fa-linkedin-in text-white"></i>
          </span>
        </div>
        <div className="flex justify-center">
          <a
            href={`tel:${me?.phoneNumber}`}
            className={`px-2 py-2 rounded-full font-semibold uppercase text-sm ${isDarkMode ? 'bg-indigo-800' : 'bg-indigo-600'} text-white hover:bg-indigo-800`}
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
                d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className={`md:w-3/5  md:mb-0 p-2 `}>
  <ProfileManagement me={me} isDarkMode={isDarkMode} />
  </div>
</div>

      {selectedSocialMedia && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="relative bg-white rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold mb-2">
              Insert {selectedSocialMedia.charAt(0).toUpperCase() + selectedSocialMedia.slice(1)} Link:
            </label>
            <input
              type="text"
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder={`Enter your ${selectedSocialMedia.charAt(0).toUpperCase() + selectedSocialMedia.slice(1)} link`}
            />
            <div className="flex justify-end">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800 mr-2"
                onClick={saveLink}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setSelectedSocialMedia(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
