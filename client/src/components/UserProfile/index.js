import React from "react";
import SkillsList from "../SkillsList";
import  ProfileCard  from "../ProfileCard";
import SkillForm from "../SkillForm";


const UserProfile = ({ profile }) => {

  return (
    <div className="md:flex md:space-x-8 mb-6 md:mb-0">
      {/* Image and User Information */}
      <ProfileCard profile={profile} className="md:w-1/3 " />
      {/* Skills List */}
      <div className="md:w-2/3 bg-white rounded-lg shadow-md p-2 max-w-2xl">
        <SkillsList skills={profile.skills || []} profile={profile} />
        <SkillForm profileId={profile._id}/>
      </div>
    </div>
  );
};

export default UserProfile;
