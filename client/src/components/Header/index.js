import React, { useContext } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import { ThemeContext } from '../ThemeContext';
import controlImage from '../../assets/images/iconizer-arrow-left.png';
import logoImage from '../../assets/images/logo.png';
import chartFillImage from '../../assets/images/iconizer-home.png';
import chatImage from '../../assets/images/iconizer-message.png';
import skillImage from '../../assets/images/iconizer-skill.png';
import userImage from '../../assets/images/iconizer-account.png';
import rosterImage from '../../assets/images/iconizer-roster.png';
import logoutImage from '../../assets/images/iconizer-logout.png';
import loginImage from '../../assets/images/iconizer-login.png';
import signupImage from '../../assets/images/iconizer-signup.png';

const Header = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    Auth.logout();
    navigate('/');
  };

  const Menus = Auth.loggedIn()
    ? [
        { title: 'Home', src: chartFillImage, path: '/' },
        { title: 'My Profile', src: userImage, path: '/me' },
        { title: 'Roster', src: rosterImage, path: '/roster' },
        { title: 'Skill - List', src: skillImage, path: '/skill' },
        { title: 'Message', src: chatImage, path: '/message' },
        { title: 'Logout', src: logoutImage, action: handleLogout },
      ]
    : [
        { title: 'Login', src: loginImage, path: '/login' },
        { title: 'Signup', src: signupImage, path: '/signup' },
      ];

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div
        className={`${
          open ? 'w-72' : 'w-28'
        } h-full p-5 pt-8 transition-all duration-300 z-50 lg:static fixed`}
        style={{ top: '0', left: '0', backgroundColor: isDarkMode ? '#1f2937' : '#f3f6f4' }}
      >
        <img
          src={controlImage}
          className={`absolute cursor-pointer right-3 top-9 w-8 border-dark-blue border-2 rounded-full bg-white transform ${
            open ? '' : 'rotate-180'
          } `}
          onClick={toggleMenu}
          alt="toggle menu"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoImage}
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]'
              }`}
              alt="logo"
            />
            <h1
              className={`dark:text-white origin-left font-medium text-2xl duration-200 ml-4  ${
                !open && 'scale-0'
              }`}
            >
              RosterHub
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="text-white p-2 rounded-full bg-gray-700 dark:bg-gray-500"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer items-center gap-x-4 mt-2 ${
                location.pathname === Menu.path
                  ? 'bg-gray-300 dark:bg-gray-100'
                  : 'text-gray-400 dark:text-gray-300'
              }`}
            >
              <Link
                to={Menu.path}
                onClick={Menu.action}
                className="flex items-center w-full no-underline"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-center">
                <img src={Menu.src} alt={Menu.title} className="w-10 mr-2 p-1 hover:bg-red-400 rounded-full" />

                  <span
                    className={`${
                      !open && 'hidden'
                    } origin-left duration-200 text-lg md:text-sm lg:text-xl hover:text-red-500`}
                  >
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
      <div className="md:hidden bottom-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="bg-gray-900 text-white p-3 border-dark rounded-full shadow-lg focus:outline-none"
        >
          <img
            src={controlImage}
            className={`w-6 h-6 ${open ? 'rotate-180' : ''}`}
            alt="toggle menu"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
