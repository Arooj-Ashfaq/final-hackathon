import React from "react";
import {jwtDecode} from 'jwt-decode'; // Corrected the import for jwt-decode
import { Link } from "react-router-dom";

function Profile() {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  // Initialize user data
  let firstName = '';
  let lastName = '';
  let email = '';

  // Decode the token if available
  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode the token using jwt-decode
      firstName = decoded.firstName;
      lastName = decoded.lastName;
      email = decoded.email;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return (
    <>
      <div className="border-b border-gray-400 m-auto max-w-96">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-800 sm:text-4xl text-center pt-10">
          Your Profile
        </h1>
      </div>

      <div className="text-center py-10">
        <h1 className="text-balance text-2xl text-black font-semibold tracking-tight text-gray-00 sm:text-5xl">
          Welcome, {firstName} {lastName}!
        </h1>
        <p className="mt-8 text-center text-pretty text-md font-medium text-black sm:text-xl/6">
          Your Email: {email}
        </p>
      </div>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Want to make any changes?{" "}
        <Link
          to="/settings"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Go to Settings
        </Link>
      </p>
    </>
  );
}

export default Profile;
