import React from 'react';
import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';
import Hero from '../components/Hero'; // Import your Hero component

import { QUERY_PROFILES } from '../utils/queries';
import Auth from '../utils/auth'; // Import your Auth utility

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];
 
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
            <ProfileList profiles={profiles} title="Here's the current roster..." />
          ) : (
            <Hero />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
