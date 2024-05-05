import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PIC } from "../../utils/mutations";
import Axios from "axios";

const ProfilePicUploader = ({ profileId }) => {
  console.log(profileId)
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
      formData.append("file", profilePic); // Append the file directly
      formData.append('upload_preset', 'logging_preset'); // Replace 'logging_preset' with your upload preset name
  
      const response = await Axios.post(
        'https://api.cloudinary.com/v1_1/dey5y9jip/image/upload',
        formData
      );
  
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
  
      const { data } = await uploadProfilePic({
        variables: {
          profileId: profileId,
          profilePic: imageUrl,
        },  
      });
  console.log(data)
      console.log("Uploaded profile picture:", data.uploadProfilePic);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="cursor-pointer">
          <span className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Choose Image
          </span>
          <input
            type="file"
            name="profilePic"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          disabled={loading}
        >
          Upload
        </button>
      </form>
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default ProfilePicUploader;
