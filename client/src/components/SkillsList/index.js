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
    <div>
      <div className="flex-row justify-space-between my-4">
        {skills.map((skill) => (
          <div key={skill._id} className="col-12 col-xl-6">
            <div className="card mb-3">
              <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                <span>{skill.skillText}</span>
                <span className='author-name'> By: {skill.skillAuthor}</span>
                {isLoggedInUser && (
                  <button
                    className="btn btn-sm btn-danger ml-auto"
                    onClick={() => handleRemoveSkill(skill._id)} // Pass skillId to handleRemoveSkill
                  >
                    X
                  </button>
                )}
              </h4>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default SkillsList;
