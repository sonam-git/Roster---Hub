import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PIC } from "../../utils/mutations";
import Axios from "axios";
import { SyncLoader } from "react-spinners";
import { AiOutlineUpload } from 'react-icons/ai';

const ProfilePicUploader = ({ profileId, profilePicUrl }) => {
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null); // State to store the selected profile picture
  const [uploadProfilePic] = useMutation(UPLOAD_PROFILE_PIC);
  const [buttonText, setButtonText] = useState("Upload");

  useEffect(() => {
    // Determine button text based on whether an image is already uploaded
    if (profilePicUrl) {
      setButtonText("Change Image");
    } else {
      setButtonText("Upload");
    }
  }, [profilePicUrl]);

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
        <AiOutlineUpload size={24} className="text-indigo-800" />
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
          className="bg-transparent hover:bg-indigo-600 text-indigo-700 font-semibold hover:text-white py-2 ml-2 px-4 border border-blue-500 hover:border-transparent rounded"
          disabled={loading}
        >
          {buttonText}
        </button>
        <div className="ml-2">
          <SyncLoader color="#000" loading={loading} size={10} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicUploader;
