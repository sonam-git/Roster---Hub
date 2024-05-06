import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {  QUERY_ME } from '../../utils/queries';
import {ADD_INFO} from '../../utils/mutations'
import Auth from '../../utils/auth';

const UserInfoForm = ({ profileId }) => {
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [position, setPosition] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addInfo, { error }] = useMutation(ADD_INFO);

  // Fetch the user's information to determine if it exists
  const { loading: queryLoading, data: queryData } = useQuery(QUERY_ME);

  useEffect(() => {
    if (!queryLoading && queryData) {
      // If user data exists and information is already added, update button text
      if (queryData.me && queryData.me.jerseyNumber && queryData.me.position && queryData.me.phoneNumber) {
        setButtonText("Update Info");
      } else {
        setButtonText("Add Info");
      }
    }
  }, [queryLoading, queryData]);

  const [buttonText, setButtonText] = useState("Add Info"); // Default button text

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add or update information
      await addInfo({
        variables: {
          profileId,
          jerseyNumber: parseInt(jerseyNumber),
          position,
          phoneNumber,
        },
      });

      setJerseyNumber('');
      setPosition('');
      setPhoneNumber('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          className="flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-center"
          onSubmit={handleFormSubmit}
        >
          <div className="lg:w-9/12 lg:mr-4 mb-4 lg:mb-0">
            <input
              placeholder="Jersey Num"
              value={jerseyNumber}
              className="form-input w-full"
              onChange={(event) => setJerseyNumber(event.target.value)}
              required
            />
            <input
              placeholder="Player's Position"
              value={position}
              className="form-input w-full mt-2"
              onChange={(event) => setPosition(event.target.value)}
              required
            />
            <input
              placeholder="Phone Number"
              value={phoneNumber}
              className="form-input w-full mt-2"
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </div>
          <div className="lg:w-3/12">
            <button className="btn bg-blue-500 text-white py-3 w-full rounded" type="submit">
              {buttonText}
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-red-500 text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p className="text-center lg:text-left">
          You need to be logged in to add information. Please{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link> or <Link to="/signup" className="text-blue-500 hover:underline">Signup.</Link>
        </p>
      )}
    </div>
  );
};

export default UserInfoForm;
