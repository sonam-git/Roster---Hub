import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import controlImage from '../../assets/images/control.png';
import logoImage from "../../assets/images/logo.png";
import chartFillImage from "../../assets/images/Chart_fill.png";
import chatImage from "../../assets/images/Chat.png";
import userImage from "../../assets/images/User.png";
import rosterImage from "../../assets/images/Setting.png";
import logoutImage from '../../assets/images/Setting.png';
import loginImage from "../../assets/images/Setting.png";
import signupImage from "../../assets/images/Setting.png";

const Header = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Auth.logout();
    navigate('/');
  };

  const Menus = Auth.loggedIn()
    ? [
        { title: "Home", src: chartFillImage, path: "/" },
        { title: "View My Profile", src: userImage, path: "/me" },
        { title: "View Roster", src: rosterImage, path: "/roster" },
        { title: "Skill", src: chatImage, path: "/skill" },
        { title: "Message", src: chatImage, path: "/message" },
        { title: "Logout", src: logoutImage, action: handleLogout },
      ]
    : [
        { title: "Login", src: loginImage, path: "/login" },
        { title: "Signup", src: signupImage, path: "/signup" },
      ];

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`${
          open ? "w-72" : "w-28"
        } bg-gray-900 h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full transform ${open ? "" : "rotate-180"}`}
          onClick={toggleMenu}
          alt="account pic"
        />
        <div className="flex items-center">
          <img
            src={logoImage}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt="logo"
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-200 ml-4 ${
              !open && "scale-0"
            }`}
          >
            Roster-Hub
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer items-center gap-x-4 mt-2 hover:border-b-2 hover:border-indigo-600 text-light-800 ${
                location.pathname === Menu.path ? "bg-gray-700 text-dark" : ""
              }`}
            >
              <Link to={Menu.path} onClick={Menu.action}>
                <div className="flex items-center">
                  <img src={Menu.src} alt="ph" className="w-10 mr-2" />
                  <span className={`${!open && "hidden"} origin-left duration-200 text-xl`}>
                    {Menu.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
