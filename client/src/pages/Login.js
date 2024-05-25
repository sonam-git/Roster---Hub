import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({ email: "", password: "" });
  };

  return (
    <main className={`flex justify-center mb-4`}>
      <div className={`w-full max-w-md mt-5`}>
        <div className={`shadow-xl rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800`}>
          <h4 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Login
          </h4>
          {data ? (
            <p className="text-center text-gray-900">
              Success! You may now head{" "}
              <Link to="/me">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className={`space-y-6`}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
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
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 hover:bg-blue-800"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <div className="flex justify-between mt-3">
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-blue-500  dark:text-white dark:hover:text-blue-400 hover:no-underline"
                >
                  New User ?
                </Link>
                <Link
                  to="/forgot-password"
                  className="text-gray-600 hover:text-blue-500  dark:text-white dark:hover:text-blue-400 hover:no-underline"
                >
                  Forgot Password ?
                </Link>
              </div>
            </form>
          )}
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
