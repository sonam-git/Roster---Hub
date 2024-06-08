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
    <main className="container">
      <div className="flex flex-col items-center">
        {/* Welcome component taking full width */}
        {isLoggedIn ? (
          <>
            <div className="w-full">
              <Welcome username={profile.name} />
            </div>
            <div className="w-full flex mt-4 mb-4">
              {/* PostsList component taking 3/4 width */}
              <div className="w-3/4 mr-4">
                <PostsList />
              </div>
              {/* RecentSkillsList component taking 1/4 width */}
              <div className="w-1/4">
                <RecentSkillsList skills={profile.skills} />
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
