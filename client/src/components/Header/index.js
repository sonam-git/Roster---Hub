import { Link, Navigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    return <Navigate to="/" />;
  };

  return (
    <header className="bg-dark text-white mb-4 py-3">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Title and Description */}
        <div className="text-center lg:text-left">
          <Link to="/" className="text-white mt-4">
            <h1 className="text-3xl font-bold">Roster Hub {new Date().getFullYear()}</h1>
          </Link>
          <p className="text-lg font-semibold">Meet your team members.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          {Auth.loggedIn() ? (
         <>
         <Link className="btn bg-blue-500 text-white mb-2 lg:mb-0 py-2 px-4 mr-2 rounded hover:bg-blue-600 transition duration-300 no-underline" to="/me">
           View My Profile
         </Link>
         <Link className="btn bg-blue-500 text-white mb-2 lg:mb-0 py-2 px-4 mr-2 rounded hover:bg-blue-600 transition duration-300 no-underline" to="/roster">
           View Roster
         </Link>
         <button className="btn bg-blue-500 text-white mb-2 lg:mb-0 py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={logout}>
           Logout
         </button>
       </>
          ) : (
            <>
              <Link className="btn bg-white text-blue-500 lg:mr-2 mb-2 lg:mb-0 py-2 px-4 rounded" to="/login">
                Login
              </Link>
              <Link className="btn bg-blue-500 text-white mb-2 lg:mb-0 py-2 px-4 rounded" to="/signup">
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
