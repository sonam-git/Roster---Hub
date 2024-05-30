import React, { useContext, useState } from 'react';
import SkillsList from '../SkillsList';
import ProfileCard from '../ProfileCard';
import SkillForm from '../SkillForm';
import { ThemeContext } from '../ThemeContext';
import PostsList from '../PostsList'; 
const UserProfile = ({ profile }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [showSkills, setShowSkills] = useState(true);

  const toggleView = () => {
    setShowSkills(!showSkills);
  };

  return (
    <div className={`md:flex md:space-x-2 mb-6 md:mb-0 p-5 rounded-lg ${isDarkMode ? 'bg-gray-500 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`md:w-2/5 md:mb-0 p-2`}>
        <ProfileCard profile={profile} isDarkMode={isDarkMode} />
      </div>
      <div className={`md:w-4/5 md:m-2 mr-2 p-2 rounded-lg shadow-md max-w-2xl relative ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={toggleView} 
            className={`px-4 py-2  rounded-lg font-semibold text-sm ${showSkills ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} hover:bg-gray-800  hover:text-indigo-800`}
          >
            {showSkills ? 'Show Posts' : 'Show Skills'}
          </button>
        </div>
        {showSkills ? (
          <>
            <SkillsList skills={profile.skills || []} isDarkMode={isDarkMode} profile={profile} />
            <div className={`mt-4 ${isDarkMode ? 'bg-gray-500' : 'bg-white'}`}>
              <SkillForm profileId={profile._id} teamMate={profile.name} />
            </div>
          </>
        ) : (
          <PostsList profileId={profile._id} isDarkMode={isDarkMode}  /> 
        )}
      </div>
    </div>
  );
};

export default UserProfile;
