// src/components/ProfileCard.js
import React from 'react';
import ProfileAvatar from '../../assets/images/profile-avatar.png';
import { FaUser } from 'react-icons/fa';
import { RiTShirt2Line } from 'react-icons/ri'; 
import { FaPhone } from 'react-icons/fa';

const ProfileCard = ({ profile, isDarkMode}) => {
  
  // Function to render social media icons with links
  const renderSocialMediaIcons = () => {
    return profile.socialMediaLinks.map((socialMedia) => {
      let iconClassName = '';
      let link = '';

      switch (socialMedia.type) {
        case 'twitter':
          iconClassName = 'fa-brands fa-twitter';
          link = socialMedia.link;
          break;
        case 'facebook':
          iconClassName = 'fa-brands fa-facebook';
          link = socialMedia.link;
          break;
        case 'linkedin':
          iconClassName = 'fa-brands fa-linkedin-in';
          link = socialMedia.link;
          break;
        default:
          break;
      }

      return (
        <a
          key={socialMedia._id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-indigo-800 ${isDarkMode ? 'bg-gray-600' : 'bg-[#1DA1F2]'}`}
        >
          <i className={iconClassName + ' text-white'}></i>
        </a>
      );
    });
  };

  return (
    <div className={` mb-4 md:mb-0 mt-8 rounded-lg  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`w-full rounded-lg overflow-hidden shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className={`w-full h-[200px] flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
          <div className="w-40 h-40 rounded-full bg-white relative overflow-hidden">
            <img
              src={profile?.profilePic || ProfileAvatar}
              alt="Profile"
              className="rounded-full w-40 h-40 mx-auto mb-4"
            />
          </div>
        </div>
        <div className="py-10 px-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <h3 className={`text-sm md:text-md lg:text-lg xl:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black-700'}`}>
              {profile.name[0].toUpperCase() + profile.name.slice(1)}
            </h3>
            <div className={`flex items-center space-x-4 p-4 shadow-lg rounded-md dark:bg-gray-800`}>
  <p className={`font-semibold flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    <FaUser className="mr-2 text-xl inline mb-1" />
    {profile.position}
  </p>
  <p className={`font-semibold flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    <RiTShirt2Line className="mr-2 text-2xl inline" /> {profile.jerseyNumber}
  </p>
</div>

          </div>
          <div className="flex items-center justify-center space-x-4  py-3 px-4 dark:bg-gray-800 shadow-lg rounded-md ">
  <div className="flex space-x-4 ">
    {renderSocialMediaIcons()}
  </div>
   <a
      href={`tel:${profile.phoneNumber}`}
      className="flex items-center justify-center bg-gray-600 text-white px-2 mr-2 py-2 rounded-full font-semibold uppercase text-sm hover:bg-indigo-800 shadow-md"
    >
      <FaPhone className="w-4 h-5" />
    </a>
</div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
