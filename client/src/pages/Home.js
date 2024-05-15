import React from 'react';
import { useQuery } from '@apollo/client';

import Hero from '../components/Hero'; // Import your Hero component

import { QUERY_ME} from '../utils/queries';
import Auth from '../utils/auth'; // Import your Auth utility
import Welcome from '../components/Welcome';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const profile = data?.me || [];
  
  // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();
if(loading){
  <div>loading...</div>
}
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {/* Conditional rendering based on authentication status */}
          {isLoggedIn ? (
           <Welcome username ={profile.name} />
          ) : (
            <Hero />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
