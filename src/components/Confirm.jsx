import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Confirm() {
  const navigate = useNavigate();
  const [userSave, setUserSave] = useState("");
  const getData = async () => {
    const token = localStorage.getItem("token");
    try {
      const userData = await axios.get("http://localhost:5000/user", {
        headers: {
          token: token,
        },
      });
      setUserSave(userData?.data?.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(userSave.length);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const deleteUser = await axios.delete(
        `http://localhost:5000/user/${userId}`
      );
      if (deleteUser) {
        navigate("/register");
        localStorage.clear();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="mx-auto mt-9 max-w-2xl py-16 sm:py-16 lg:py-30 bg-slate-300 sm:px-20 lg:px-50 rounded-3xl shadow-2xl">
        <h3 className="text-balance text-4xl font-semibold tracking-tight text-gray-800 sm:text-4xl text-center">
          Are you sure?
        </h3>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            onClick={() => handleDelete()}
            className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus:ring-indigo-500"
          >
            Yes
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="text-sm font-semibold text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Confirm;
