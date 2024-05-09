import ProfileAvatar from "../../assets/images/profile-avatar.png";

const ProfileCard = ({ profile }) => {
  // Function to render social media icons with links
  const renderSocialMediaIcons = () => {
    return profile.socialMediaLinks.map((socialMedia) => {
      // Map each social media link to its corresponding icon and link
      let iconClassName = "";
      let link = "";

      // Determine the icon class name and link based on the social media type
      switch (socialMedia.type) {
        case "twitter":
          iconClassName = "fa-brands fa-twitter";
          link = socialMedia.link;
          break;
        case "facebook":
          iconClassName = "fa-brands fa-facebook";
          link = socialMedia.link;
          break;
        case "linkedin":
          iconClassName = "fa-brands fa-linkedin-in";
          link = socialMedia.link;
          break;
        // Add cases for other social media types if needed
        default:
          break;
      }

      // Render the social media icon with a clickable link
      return (
        <a
          key={socialMedia._id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#1DA1F2]"
        >
          <i className={iconClassName + " text-white"}></i>
        </a>
      );
    });
  };

  return (
    <>
      <div className=" bg-white rounded-lg overflow-hidden shadow-md">
        <div className="w-full h-[200px] bg-red-500  flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white relative overflow-hidden">
            <img
              src={profile?.profilePic || ProfileAvatar}
              alt="Profile"
              className="rounded-full  mx-auto mb-4"
            />
          </div>
        </div>
        <div className="py-10 px-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-black-700">
              {profile.name[0].toUpperCase() + profile.name.slice(1)}
            </h3>
            <p className="font-semibold text-gray-700">{profile.position}</p>
          </div>

          <div className="flex items-center justify-center">
            {/* Render social media icons */}
            {renderSocialMediaIcons()}
          </div>
          <div className="flex justify-center">
            <a
              href={`tel:${profile.phoneNumber}`}
              className="bg-indigo-600 text-white px-2 py-2  rounded-full font-semibold uppercase text-sm  hover:bg-indigo-800"
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
    </>
  );
};

export default ProfileCard;
