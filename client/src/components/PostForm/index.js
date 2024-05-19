import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_SKILL } from "../../utils/mutations";
import { QUERY_ME, QUERY_SINGLE_PROFILE } from "../../utils/queries";

import Auth from "../../utils/auth";

const PostForm = ({ profileId, teamMate }) => {
  const authProfileId = Auth.getProfile().data._id;

  const [skill, setSkill] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [addSkill] = useMutation(ADD_SKILL, {
    refetchQueries: [
      {
        query: profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        variables: { profileId: profileId },
      },
    ],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add skills
      await addSkill({
        variables: { profileId, skillText: skill },
      });

      // Clear input after successful submission
      setSkill("");
    } catch (err) {
      // Set error message
      setErrorMessage(err.message);

      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <h4 className="text-xl lg:text-xl xl:text-2xl font-bold mb-2 ml-3">
      What's on your mind?
      </h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="What's on your mind?"
              value={skill}
              className="mb-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => setSkill(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3 ">
            <button
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-2.5"
              type="submit"
            >
              Post Now
            </button>
          </div>
          {errorMessage && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {errorMessage}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to add information. Please{" "}
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;
