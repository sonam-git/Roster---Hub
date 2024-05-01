import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import SkillsList from "../components/SkillsList";
import SkillForm from "../components/SkillForm";
import UserInfoForm from "../components/UserInfoForm";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import UserProfile from "../components/UserProfile";
import MyProfile from "../components/MyProfile";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data, error } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};
  
  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error.message}</div>;
  }

  if (!profile?.name) {
    return (
      <div className="text-center mt-4">
        <h4>
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </h4>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="my-4 p-4 border border-dotted border-gray-300 rounded">
        {profileId ? (
          <UserProfile profile={profile} />
        ) : (
          <MyProfile isLoggedInUser={!profileId && true} />
        )}
      </div>

      <h2 className="text-center mt-4 mb-2 font-bold text-lg">
        {profileId ? `${profile.name}'s` : "Your"} friends have endorsed these
        skills...
      </h2>

      {profile.skills?.length > 0 && (
        <SkillsList
          skills={profile.skills || []}
          isLoggedInUser={!profileId && true}
        />
      )}

      <div className="my-4 p-4 border border-dotted border-gray-300 rounded">
        <SkillForm profileId={profile._id} />
      </div>

      {/* Render UserInfoForm only for the logged-in user's profile */}
      {Auth.loggedIn() && Auth.getProfile().data._id === profile._id && (
        <div className="my-4 p-4 border border-dotted border-gray-300 rounded">
          <UserInfoForm profileId={profile._id} />
        </div>
      )}
    </div>
  );
};

export default Profile;
