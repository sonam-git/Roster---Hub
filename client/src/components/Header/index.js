import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    return <Navigate to="/" />;
  };

  return (
    <header className="bg-dark text-white  ">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Title and Description */}
        <div className="text-center lg:text-left mt-5">
          <Link to="/" className="text-white mt-1">
            <h1 className="text-2xl font-bold">Roster Hub {new Date().getFullYear()}</h1>
          </Link>
          <p className="text-lg font-semibold">Meet your team members.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Show dropdown menu on small screens */}
          <div className="lg:hidden relative">
            <button className="btn bg-blue-500 text-white mb-1 lg:mb-0 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300" onClick={toggleMenu}>
              {menuOpen ? 'Close' : 'Menu'}
            </button>
            {menuOpen && (
              <div className="flex flex-col">
                {Auth.loggedIn() ? (
                  <>
                    <Link className="btn bg-blue-500 text-white mb-1 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300" to="/me">
                      View My Profile
                    </Link>
                    <Link className="btn bg-blue-500 text-white mb-1 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300" to="/roster">
                      View Roster
                    </Link>
                    <button className="btn bg-blue-500 text-white mb-1 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="btn bg-white text-blue-500 mb-1 py-1 px-3 mr-2 rounded hover:bg-blue-200 transition duration-300" to="/login">
                      Login
                    </Link>
                    <Link className="btn bg-blue-500 text-white mb-1 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300" to="/signup">
                      Signup
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Show regular buttons on larger screens */}
          <div className="hidden lg:flex flex-col lg:flex-row lg:items-center">
            {Auth.loggedIn() ? (
              <>
                <Link className="btn bg-blue-500 text-white mb-1 lg:mb-0 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300 no-underline" to="/me">
                  View My Profile
                </Link>
                <Link className="btn bg-blue-500 text-white mb-1 lg:mb-0 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300 no-underline" to="/roster">
                  View Roster
                </Link>
                <button className="btn bg-blue-500 text-white mb-1 lg:mb-0 py-1 px-3 mr-2 rounded hover:bg-blue-600 transition duration-300" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn bg-white text-blue-500 lg:mr-2 mb-1 lg:mb-0 py-1 px-3 rounded hover:bg-blue-200 transition duration-300" to="/login">
                  Login
                </Link>
                <Link className="btn bg-blue-500 text-white mb-1 lg:mb-0 py-1 px-3 rounded hover:bg-blue-600 transition duration-300" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;




// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import Auth from "../../utils/auth";

// const Header = () => {
//   let Links = [
//     { name: "HOME", link: "/" },
//     { name: "PROFILE", link: "/me" },
//     { name: "ROSTER", link: "/roster" },
//   ];
//   const [open, setOpen] = useState(false);

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//     return <Navigate to="/" />;
//   };

//   return (
//     <>
//       <div className="shadow-md w-full fixed top-0 left-0">
//         <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
//           <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
//             <span className="text-3xl text-indigo-600 mr-1 pt-2">
//               <ion-icon name="logo-ionic"></ion-icon>
//             </span>
//             <Link to="/" className="text-white mt-1">
//               <h1 className="text-2xl text-dark font-bold">
//                 Roster Hub {new Date().getFullYear()}
//               </h1>
//             </Link>
//           </div>

//           <div
//             onClick={toggleMenu}
//             className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
//           >
//             <ion-icon name={open ? "close" : "menu"}></ion-icon>
//           </div>
//           <ul
//             className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
//               open ? "top-20 " : "top-[-490px]"
//             }`}
//           >
//             {Links.map((link) => (
//               <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
//                 <Link
//                   to={link.link}
//                   className="text-gray-800 hover:text-gray-400 duration-500"
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//             {Auth.loggedIn() ? (
//               <>
//                 <button
//                   className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500"
//                   onClick={logout}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500"
//                 >
//                   Signup
//                 </Link>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Header;
