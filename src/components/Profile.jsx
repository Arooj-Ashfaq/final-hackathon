import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const response = await axios.get(
          `http://localhost:5000/user/${userId}`,
          {
            headers: {
              token: token,
            },
          }
        );
        setUser(response?.data?.user || null);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    getData();
  }, [token]); // Only depends on `token`.

  return (
    <>
      <div className="border-b border-gray-400 m-auto max-w-96">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-800 sm:text-4xl text-center pt-10">
          Your Profile
        </h1>
      </div>

      <div className="text-center py-10">
        <h1 className="text-balance text-2xl text-black font-semibold tracking-tight text-gray-00 sm:text-5xl">
          {user ? `Welcome, ${user.firstName} ${user.lastName}!` : "Loading..."}
        </h1>
        <p className="mt-8 text-center text-pretty text-md font-medium text-black sm:text-xl/6">
          {user ? `Your Email: ${user.email}` : ""}
        </p>
      </div>

      <div className="gap-1">
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Want to make any changes?{" "}
          <Link
            to="/settings"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Go to Settings
          </Link>
        </p>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          or Want to delete your account?{" "}
          <button
          onClick={()=> navigate('/confirm')}
              className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-gray-700 hover:bg-red-800 focus:ring-indigo-500"
          >Delete Account</button>
        </p>
      </div>
    </>
  );
}

export default Profile;
