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
      // add skills
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
    <div>
      <h4>Endorse Your Team Mates</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Endorse Your Team - mates"
              value={skill}
              className="form-input w-100"
              onChange={(event) => setSkill(event.target.value)}
            />
          </div>
          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Endorse Skill
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to add information. Please{" "}
          <Link to="/login">Login</Link> or <Link to="/signup">Signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SkillForm;