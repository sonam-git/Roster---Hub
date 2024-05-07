import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });
      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex justify-center mb-4">
      <div className="w-full max-w-md mt-5">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h4 className="text-center text-2xl font-bold text-gray-900 mb-6">Sign Up</h4>
          {data ? (
            <p className="text-center text-gray-900">
              Success! You may now head <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <label htmlFor="Username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your username"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
              </label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 hover:bg-blue-600"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
                <Link to="/login" className="text-gray-600 hover:text-blue-500 mt-3 font-bold">Already Have An Account ?</Link>
              </div>
            </form>
          )}
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default Signup;
