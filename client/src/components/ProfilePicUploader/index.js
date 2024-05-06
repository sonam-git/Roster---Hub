import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PIC } from "../../utils/mutations";
import Axios from "axios";

const ProfilePicUploader = ({ profileId }) => {
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null); // State to store the selected profile picture
  const [uploadProfilePic] = useMutation(UPLOAD_PROFILE_PIC);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!profilePic) {
        throw new Error("Please select a profile picture.");
      }

      const formData = new FormData();
      formData.append("file", profilePic);
      formData.append("upload_preset", "logging_preset");

      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dey5y9jip/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;

      const { data } = await uploadProfilePic({
        variables: {
          profileId: profileId,
          profilePic: imageUrl,
        },
      });

      console.log("Uploaded profile picture:", data.uploadProfilePic);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <label htmlFor="profilePicInput" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </label>
        <input
          id="profilePicInput"
          type="file"
          name="profilePic"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={handleSubmit}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          Upload
        </button>
        {loading && <p className="ml-2">Uploading...</p>}
      </div>
    </div>
  );
};

export default ProfilePicUploader;
