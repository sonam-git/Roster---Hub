// src/components/UserProfile.js
import React, { useContext } from 'react';
import SkillsList from '../SkillsList';
import ProfileCard from '../ProfileCard';
import SkillForm from '../SkillForm';
import { ThemeContext } from '../ThemeContext';

const UserProfile = ({ profile }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
<div className={`md:flex md:space-x-2 mb-6 md:mb-0 rounded-lg ${isDarkMode ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}>
  <div className={`md:w-2/5 md:mb-0 p-2`}>
    <ProfileCard profile={profile} isDarkMode={isDarkMode} />
  </div>
  <div className={`md:w-4/5 md:m-2 mr-2 p-2 rounded-lg shadow-md max-w-2xl relative ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
    <SkillsList skills={profile.skills || []} isDarkMode={isDarkMode} profile={profile} />
    <div className={`absolute bottom-0 left-0 right-0 p-2 ${isDarkMode ? 'bg-gray-500' : 'bg-white'}`}>
      <SkillForm profileId={profile._id} teamMate={profile.name} />
    </div>
  </div>
</div>

  );
};

export default UserProfile;
