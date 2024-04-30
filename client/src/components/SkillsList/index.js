import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_SKILL } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const SkillsList = ({ skills, isLoggedInUser = false }) => {
  const [removeSkill, { error }] = useMutation(REMOVE_SKILL, {
    update(cache, { data: { removeSkill } }) {
      try {
        // Remove the deleted skill from the cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        const updatedSkills = me.skills.filter(
          (skill) => skill._id !== removeSkill._id
        );
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, skills: updatedSkills } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveSkill = async (skillId) => {
    try {
      // Call the removeSkill mutation with skillId
      await removeSkill({
        variables: { skillId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!skills.length) {
    return <h3>No Skills Yet</h3>;
  }

  return (
    <>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
    {skills.map((skill) => (
      <div key={skill._id} className="col-span-1">
        <div className="card mb-3 shadow-xl rounded-md">
          <div className="card-header text-light p-2">
            {/* Skill text */}
            <div className="mb-2">
              <span>{skill.skillText}</span>
            </div>
            {/* By and date */}
            <div className="flex justify-between text-gray-500">
              <div>
                <span className="mr-1">By: {skill.skillAuthor} on {skill.createdAt}</span>
              </div>
              {/* Delete button (if logged in user) */}
              {isLoggedInUser && (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveSkill(skill._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

{error && (
  <div className="my-3 p-3 bg-red-500 text-white">{error.message}</div>
)}
    </>
  );
  
  
};

export default SkillsList;
