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
