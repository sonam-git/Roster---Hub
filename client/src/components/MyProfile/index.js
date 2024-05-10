import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { SAVE_SOCIAL_MEDIA_LINK } from "../../utils/mutations";
import MessageList from "../MessageList";
import ProfilePicUploader from "../ProfilePicUploader";
// import UserInfoForm from "../UserInfoForm";
import ProfileAvatar from "../../assets/images/profile-avatar.png";
import "@fortawesome/fontawesome-free/css/all.css";

// import ProfileSettings from "../ProfileSettings";
import ProfileManagement from "../ProfileManangement";


const MyProfile = ({ isLoggedInUser }) => {
  // Fetch the user's information
  const { loading, data } = useQuery(QUERY_ME);

  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [socialMediaLink, setSocialMediaLink] = useState("");

  // Mutation to save social media link
  const [saveSocialMediaLink] = useMutation(SAVE_SOCIAL_MEDIA_LINK);

  if (loading) return <div>Loading...</div>;

  const me = data?.me;
  
  // Function to save social media link
  const saveLink = async () => {
    try {
      // Call the mutation to save the social media link
      await saveSocialMediaLink({
        variables: {
          userId: me?._id,
          type: selectedSocialMedia,
          link: socialMediaLink,
        },
      });

      // Close modal after saving the link
      setSelectedSocialMedia(null);
      setSocialMediaLink("");
    } catch (error) {
      console.error("Error saving social media link:", error);
    }
  };

  return (
    <>
     <div className="md:flex md:space-x-4 mb-6 md:mb-0">
  {/* Profile Details */}
  <div className="md:w-2/5 mb-4 md:mb-0">
    <div className=" bg-white rounded-lg overflow-hidden shadow-md">
      <div className="w-full h-[200px] bg-blue-300 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-white relative overflow-hidden">
          <img
            src={me?.profilePic || ProfileAvatar}
            alt="Profile"
            className="rounded-full w-40 h-40 mx-auto mb-4"
          />
        </div>
      </div>
      <div className="py-10 px-6 grid grid-cols-1 gap-6">
        <ProfilePicUploader
          profileId={me._id}
          profilePicUrl={me.profilePic}
        />
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-black-700">
            {me?.name[0].toUpperCase() + me?.name.slice(1)}
          </h3>
          {me?.position && (
            <p className=" font-semibold text-gray-700">
              Position: {me?.position}
            </p>
          )}
          {me?.jerseyNumber && (
            <p className="text-gray-700 font-semibold">
              Jersey Number: {me?.jerseyNumber}
            </p>
          )}
        </div>
        {/* Social media icons */}
        <div className="flex items-center justify-center">
          <span
            className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#1DA1F2]"
            onClick={() => setSelectedSocialMedia("twitter")}
          >
            <i className="fa-brands fa-twitter text-white"></i>
          </span>
          <span
            className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#162666]"
            onClick={() => setSelectedSocialMedia("facebook")}
          >
            <i className="fa-brands fa-facebook text-white"></i>
          </span>
          <span
            className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#0077b5]"
            onClick={() => setSelectedSocialMedia("linkedin")}
          >
            <i className="fa-brands fa-linkedin-in text-white"></i>
          </span>
        </div>
        {/* Contact button with phone number */}
        <div className="flex justify-center">
          <a
            href={`tel:${me?.phoneNumber}`}
            className="bg-indigo-600 text-white px-2 py-2 rounded-full font-semibold uppercase text-sm hover:bg-indigo-800"
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
  {/* User Profile Setting*/}
 <ProfileManagement me = {me}/>
</div>

      {/* Message List */}
      <div className="my-4 p-4 border border-dotted border-gray-300 rounded">
        <MessageList
          messages={me?.receivedMessages || []}
          isLoggedInUser={isLoggedInUser}
        />
      </div>
      {/* Social media link modal */}
      {selectedSocialMedia && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="relative bg-white rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold mb-2">
              Insert{" "}
              {selectedSocialMedia.charAt(0).toUpperCase() +
                selectedSocialMedia.slice(1)}{" "}
              Link:
            </label>
            <input
              type="text"
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder={`Enter your ${
                selectedSocialMedia.charAt(0).toUpperCase() +
                selectedSocialMedia.slice(1)
              } link`}
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
