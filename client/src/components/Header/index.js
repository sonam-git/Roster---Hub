import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline'; // Import the menu icon from Heroicons
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-info text-dark mb-4 py-3">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Menu Icon */}
        <MenuIcon className="h-8 w-8 lg:hidden" />

        {/* Title and Description */}
        <div className="text-center lg:text-left">
          <Link to="/" className="text-dark">
            <h1 className="text-3xl font-bold">Roster Hub {new Date().getFullYear()}</h1>
          </Link>
          <p className="text-lg font-semibold">Meet your team members.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-primary lg:mr-2 mb-2 lg:mb-0" to="/me">
                View My Profile
              </Link>
              <Link className="btn btn-primary lg:mr-2 mb-2 lg:mb-0" to="/">
                View Roster
              </Link>
              <button className="btn btn-light mb-2 lg:mb-0" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
           
              <Link className="btn btn-primary lg:mr-2 mb-2 lg:mb-0" to="/login">
                Login
              </Link>
              <Link className="btn btn-light mb-2 lg:mb-0" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
