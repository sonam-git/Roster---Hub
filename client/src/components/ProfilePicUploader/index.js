import React, { useState } from "react";

const ProfilePicUploader = ({ profileId }) => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("")

  function previewFiles(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(image)
      setImage(reader.result)
    }
  }
  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file);
    previewFiles(file)
  }
  const handleSubmit = (e) => {

  }
  return (
    <div className="flex items-center justify-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="cursor-pointer">
          <input
            type="file"
            id="fileInput"
            onChange={(e) => handleChange(e)}
            required
            accept="image/png,image/jpeg, image/jpg,image/jfif"
          />
          <button>submit</button>
        </label>
      </form>
      < img src={image} alt = ""/>
    </div>
  );
};

export default ProfilePicUploader;

// import React from "react";
// import { useMutation } from "@apollo/client";
// import { UPLOAD_PROFILE_PIC } from "../../utils/mutations";

// const ProfilePicUploader = ({ profileId }) => {
//   const [uploadProfilePic] = useMutation(UPLOAD_PROFILE_PIC);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     try {
//       const { data } = await uploadProfilePic({
//         variables: {
//           profileId: profileId,
//           file: file,
//         },
//       });
//       console.log("Uploaded profile picture:", data.uploadProfilePic);
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <label className="cursor-pointer">
//         <span className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Choose Image</span>
//         <input type="file" className="hidden" onChange={handleFileUpload} />
//       </label>
//     </div>
//   );
// };

// export default ProfilePicUploader;
