import React from "react";
import SkillsList from "../SkillsList";
import  ProfileCard  from "../ProfileCard";


const UserProfile = ({ profile }) => {

  return (
    <div className="md:flex md:space-x-4 mb-6 md:mb-0">
      {/* Image and User Information */}
      <ProfileCard profile={profile}/>
      {/* Skills List */}
      <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6 max-w-2xl"> {/* Adjusted width */}
        <SkillsList skills={profile.skills || []} profile={profile} />
      </div>
    
    </div>
  );
  
};

export default UserProfile;
