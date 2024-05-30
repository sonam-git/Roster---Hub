import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { SAVE_SOCIAL_MEDIA_LINK } from "../../utils/mutations";
import { RiTShirt2Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import ProfilePicUploader from "../ProfilePicUploader";
import ProfileManagement from "../ProfileManangement";
import ProfileAvatar from "../../assets/images/profile-avatar.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { ThemeContext } from "../ThemeContext";
import { FaPhone } from "react-icons/fa";
import PostForm from "../PostForm";

const MyProfile = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { loading, data } = useQuery(QUERY_ME);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [saveSocialMediaLink] = useMutation(SAVE_SOCIAL_MEDIA_LINK);
  const [selectedView, setSelectedView] = useState("posts"); // New state for selected view

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
      <div
        className={`md:flex md:space-x-2 mb-6 md:mb-0 rounded-lg ${
          isDarkMode ? "bg-gray-500 text-white" : "bg-blue-100 text-black"
        }`}
      >
        <div className={`md:w-2/5 md:mb-0 p-2 `}>
          <div
            className={`wd-full rounded-lg overflow-hidden shadow-md ${
              isDarkMode ? "bg-gray-700" : "bg-blue-50"
            }`}
          >
            <div
              className={`w-full h-[200px] flex items-center justify-center ${
                isDarkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <div className="w-40 h-40 rounded-full bg-white relative overflow-hidden">
                <img
                  src={me?.profilePic || ProfileAvatar}
                  alt="Profile"
                  className="rounded-full w-40 h-40 mx-auto mb-4"
                />
              </div>
            </div>
            <div className="py-10 px-6 grid grid-cols-1 gap-6 ">
              <ProfilePicUploader
                profileId={me._id}
                profilePicUrl={me.profilePic}
                isDarkMode={isDarkMode}
              />
              <div className="flex flex-col items-center ">
                <h3
                  className={`text-sm md:text-md lg:text-lg xl:text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-black-700"
                  }`}
                >
                  {me?.name[0].toUpperCase() + me?.name.slice(1)}
                </h3>
                <div
                  className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 shadow-lg rounded-md ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  {me?.position && (
                    <div className="flex items-center">
                      <FaUser
                        className={`mr-2 mb-4 text-xl ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      />
                      <p
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {me?.position}
                      </p>
                    </div>
                  )}
                  {me?.jerseyNumber && (
                    <div className="flex items-center">
                      <RiTShirt2Line
                        className={`mr-2 mb-3 text-2xl ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      />
                      <p
                        className={`font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {me?.jerseyNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center p-4 dark:bg-gray-800 shadow-lg rounded-md">
                <div className="grid grid-cols-2 gap-4 sm:flex sm:space-x-4">
                  <span
                    className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-600" : "bg-[#1DA1F2]"
                    }`}
                    onClick={() => setSelectedSocialMedia("twitter")}
                  >
                    <i className="fa-brands fa-twitter text-white"></i>
                  </span>
                  <span
                    className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-600" : "bg-[#162666]"
                    }`}
                    onClick={() => setSelectedSocialMedia("facebook")}
                  >
                    <i className="fa-brands fa-facebook text-white"></i>
                  </span>
                  <span
                    className={`mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-600" : "bg-[#0077b5]"
                    }`}
                    onClick={() => setSelectedSocialMedia("linkedin")}
                  >
                    <i className="fa-brands fa-linkedin-in text-white"></i>
                  </span>
                  <a
                    href={`tel:${me?.phoneNumber}`}
                    className={`flex items-center justify-center bg-indigo-600 text-white px-3 py-2 rounded-full font-semibold uppercase text-sm hover:bg-indigo-800 shadow-md ${
                      isDarkMode ? "bg-indigo-800" : "bg-indigo-600"
                    }`}
                  >
                    <FaPhone className="w-3 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="navbar flex justify-center mb-4">
              <button
                className={`px-4 py-2 rounded-l-lg ${
                  selectedView === "settings"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700"
                } transition duration-300 ease-in-out`}
                onClick={() => setSelectedView("settings")}
              >
                Setting
              </button>
              <button
                className={`px-4 py-2 rounded-r-lg ${
                  selectedView === "posts"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700"
                } transition duration-300 ease-in-out`}
                onClick={() => setSelectedView("posts")}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <div className={`md:w-3/5 md:mb-0 p-2`}>
          {selectedView === "posts" ? (
            <PostForm />
          ) : (
            <ProfileManagement me={me} isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
      {selectedSocialMedia && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="relative bg-white  rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold mb-2 dark:text-gray-800">
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
