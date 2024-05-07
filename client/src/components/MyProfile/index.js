import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import MessageList from "../MessageList";
import ProfilePicUploader from "../ProfilePicUploader";
import UserInfoForm from "../UserInfoForm";
import ProfileAvatar from "../../assets/images/profile-avatar.png"
import '@fortawesome/fontawesome-free/css/all.css';

const MyProfile = ({ isLoggedInUser }) => {
  // Fetch the user's information
  const { loading, data } = useQuery(QUERY_ME);

  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [socialMediaLink, setSocialMediaLink] = useState('');

  if (loading) return <div>Loading...</div>;

  const me = data?.me;

  // Function to save social media link
  const saveLink = () => {
    // Implement your logic to save the link
    console.log("Social Media Link:", socialMediaLink);
    // Close modal after saving the link
    setSelectedSocialMedia(null);
  };

  return (
    <>
      <div className="md:flex md:space-x-4 mb-6 md:mb-0">
        {/* Profile Details */}
        <div className="w-[400px] bg-white rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-[200px] bg-red-500 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-white relative overflow-hidden">
              <img
                src={me?.profilePic || ProfileAvatar}
                alt="Profile"
                className="rounded-full w-40 h-40 mx-auto mb-4"
              />
            </div>
          </div>
          <div className="py-10 px-6 grid grid-cols-1 gap-6">
            <ProfilePicUploader profileId={me._id} profilePicUrl={me.profilePic}/>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-semibold text-black-700">
                {me?.name[0].toUpperCase() + me?.name.slice(1)}
              </h3>
              {me?.position && <p className=" font-semibold text-gray-700">Position: {me.position}</p>}
              {me?.jerseyNumber && <p className="text-gray-700 font-semibold">Jersey Number: {me.jerseyNumber}</p>}
            </div>
            {/* Social media icons */}
            <div className="flex items-center justify-center">
              <span
                className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#1DA1F2]"
                onClick={() => setSelectedSocialMedia('twitter')}
              >
                <i className="fa-brands fa-twitter text-white"></i>
              </span>
              <span
                className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#131418]"
                onClick={() => setSelectedSocialMedia('behance')}
              >
                <i className="fa-brands fa-behance text-white"></i>
              </span>
              <span
                className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#0077b5]"
                onClick={() => setSelectedSocialMedia('linkedin')}
              >
                <i className="fa-brands fa-linkedin-in text-white"></i>
              </span>
            </div>
            {/* Contact button with phone number */}
            <div className="flex justify-center">
              <a
                href={`tel:${me.phoneNumber}`}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold uppercase text-sm"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        {/* User Info Form */}
        <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6 max-w-2xl mt-2">
          <div className="my-4 p-4 border border-dotted border-gray-300 rounded">
            <UserInfoForm profileId={me._id} />
          </div>
        </div>
      </div>
      {/* Message List */}
      <div className="my-4 p-4 border border-dotted border-gray-300 rounded">
        <MessageList messages={me.receivedMessages || []} isLoggedInUser={isLoggedInUser} />
      </div>
      {/* Social media link modal */}
      {selectedSocialMedia && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="relative bg-white rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold mb-2">Insert {selectedSocialMedia.charAt(0).toUpperCase() + selectedSocialMedia.slice(1)} Link:</label>
            <input
              type="text"
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder={`Enter your ${selectedSocialMedia.charAt(0).toUpperCase() + selectedSocialMedia.slice(1)} link`}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
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
