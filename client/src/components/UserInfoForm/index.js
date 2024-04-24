import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_INFO} from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const UserInfoForm = () => {
    const [jerseyNumber, setJerseyNumber] = useState('');
    const [position, setPosition] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [addInfo, { error }] = useMutation(ADD_INFO, {
      refetchQueries: [{ query: QUERY_ME }],
    });
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add information
     await addInfo({
        variables: {
          jerseyNumber: parseInt(jerseyNumber),
          position,
          phoneNumber,
        },
      });
    
    setJerseyNumber('')
    setPosition('')
    setPhoneNumber('')
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Jersey Num"
              value={jerseyNumber}
              className="form-input w-100"
              onChange={(event) => setJerseyNumber(event.target.value)}
              required
            />
            <input
              placeholder="Player's Position"
              value={position}
              className="form-input w-100"
              onChange={(event) => setPosition(event.target.value)}
              required
            />
            <input
              placeholder="Phone Number"
              value={phoneNumber}
              className="form-input w-100"
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
        
          </div>
          <div className="col-12 col-lg-9">
            <button className="btn btn-info btn-block py-3" type="submit">
             Add Info
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
          You need to be logged in to add information. Please{' '}
          <Link to="/login">Login</Link> or <Link to="/signup">Signup.</Link>
        </p>
      )}
    </div>
  );
};

export default UserInfoForm ;
