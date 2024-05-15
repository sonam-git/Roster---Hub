import React, { useState } from 'react';
import UserInfoForm from '../UserInfoForm';
import ProfileSettings from '../ProfileSettings';
import { FaEdit } from "react-icons/fa";

const ProfileManagement = ({me}) => {

  const [activeComponent, setActiveComponent] = useState('userInfo'); // Default to 'userInfo'




  return (
    <div className="md:w-3/5">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <button
            className={`px-4 py-2 rounded-md ${activeComponent === 'userInfo' ? 'bg-dark text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveComponent('userInfo')}
          >
            User Info Form <FaEdit className="inline ml-2" />
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeComponent === 'profileSettings' ? 'bg-dark text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveComponent('profileSettings')}
          >
            Profile Setting <FaEdit className="inline ml-2" />
          </button>
        </div>
        <div className="my-9 p-4 border border-dotted border-gray-300 rounded">
          {activeComponent === 'userInfo' && <UserInfoForm profileId={me._id} />}
          {activeComponent === 'profileSettings' && <ProfileSettings user={me} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
