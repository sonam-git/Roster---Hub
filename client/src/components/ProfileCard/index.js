import ProfileAvatar from "../../assets/images/profile-avatar.png";

const ProfileCard = ({ profile }) => {
  return (
    <>
      <div className="w-[400px] bg-white rounded-lg overflow-hidden shadow-md">
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
            <h3 className="text-3xl font-semibold text-black-700">
              {profile.name[0].toUpperCase() + profile.name.slice(1)}
            </h3>
            <p className="font-semibold text-gray-700">{profile.position}</p>
          </div>

          <div className="flex items-center justify-center">
            <span className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#1DA1F2]">
              <i className="fa-brands fa-twitter text-white"></i>
            </span>
            <span className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#131418]">
              <i className="fa-brands fa-behance text-white"></i>
            </span>
            <span className="mx-2 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#0077b5]">
              <i className="fa-brands fa-linkedin-in text-white"></i>
            </span>
          </div>
          <div className="flex justify-center">
            <a
              href={`tel:${profile.phoneNumber}`}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold uppercase text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
