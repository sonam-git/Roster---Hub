import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SEND_RESET_PASSWORD_EMAIL } from "../utils/mutations";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendEmail, { data, error }] = useMutation(SEND_RESET_PASSWORD_EMAIL);

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendEmail({ variables: { email } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex justify-center mb-4 px-2">
      <div className="w-full max-w-md mt-5">
        <div className="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
          <h4 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Forgot Password
          </h4>
          {data ? (
           <div className="p-4 bg-gray-100 dark:bg-gray-600 shadow-lg rounded-md">
           <p className="text-center p-5 dark:bg-gray-600 dark:text-white">
             {data.sendResetPasswordEmail.message}
           </p>
         </div>
         
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
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
                  required="true"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-4">
  <button
    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 hover:bg-blue-800"
    style={{ cursor: "pointer" }}
    type="submit"
  >
    Submit
  </button>

  <Link 
    to="/login" 
    className="bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded  hover:bg-gray-100 no-underline"
    style={{ cursor: "pointer", textDecoration:'none' }}
  >
    Cancel
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

export default ForgotPassword;
