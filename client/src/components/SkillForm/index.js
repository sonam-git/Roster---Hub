import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_SKILL } from "../../utils/mutations";
import { QUERY_ME, QUERY_SINGLE_PROFILE } from "../../utils/queries";

import Auth from "../../utils/auth";

const SkillForm = ({ profileId }) => {
  const [skill, setSkill] = useState("");
  const [addSkill, { error }] = useMutation(ADD_SKILL, {
    refetchQueries: [{ query: profileId ? QUERY_SINGLE_PROFILE : QUERY_ME, variables: { profileId: profileId } }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add skill
      await addSkill({
        variables: { profileId, skillText: skill },
      });

      // Clear input after successful submission
      setSkill("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-4">
      <h4 className="text-xl font-semibold mb-2">Endorse Your Team Mates</h4>
      
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center">
            <div className="col-12 col-lg-9">
            <input
              placeholder="Endorse Your Teammates"
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            </div>
            
            <button
              className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50"
              type="submit"
            >
              Endorse Skill
            </button>
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
      ) : (
        <p>
          You need to be logged in to add information. Please{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link> or <Link to="/signup" className="text-indigo-600 hover:underline">Signup</Link>.
        </p>
      )}
    </div>
  );
};

export default SkillForm;
