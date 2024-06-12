import React from "react";
import { useQuery } from "@apollo/client";

import Hero from "../components/Hero"; // Import your Hero component
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth"; // Import your Auth utility
import Welcome from "../components/Welcome";
import PostsList from "../components/PostsList";
import RecentSkillsList from "../components/RecentSkillsList";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const profile = data?.me || [];
  
  // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        {/* Welcome component taking full width */}
        {isLoggedIn ? (
          <>
            <div className="w-full mb-4">
              <Welcome username={profile.name} />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:space-x-4">
              {/* PostsList component taking full width on small screens and 3/4 on larger screens */}
              <div className="w-full lg:w-3/4 mb-4 lg:mb-0">
                <PostsList />
              </div>
              {/* RecentSkillsList component taking full width on small screens and 1/4 on larger screens */}
              <div className="w-full lg:w-1/4">
                <RecentSkillsList />
              </div>
            </div>
          </>
        ) : (
          <Hero />
        )}
      </div>
    </main>
  );
};

export default Home;
