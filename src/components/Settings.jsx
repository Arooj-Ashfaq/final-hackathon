import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export default function Settings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });
  const [originalData, setOriginalData] = useState(null);
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
  }, [token]);

  useEffect(() => {
    if (user) {
      try {
        const initialData = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          id: user.id || "",
        };
        setFormData(initialData);
        setOriginalData(initialData);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const userId = decoded.id
      const { firstName, lastName, email, id } = formData;
      const body = { firstName, lastName, email, id };
      const updateUser = await axios.patch(
        `http://localhost:5000/user/${userId}`,
        body
      );
      if (updateUser) {
      navigate("/profile");

      }
      toast.success('User updated Successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDiscardChanges = () => {
    if (originalData) {
      setFormData(originalData);
      toast.info("Changes discarded.");
    }
  };

  return (
    <>
      <div className="mx-auto my-9 max-w-2xl py-16 sm:py-16 lg:py-30 bg-slate-300 sm:px-20 lg:px-50 rounded-3xl shadow-2xl">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-12">
            <div className="border-b border-gray-400 pb-12">
              <br />
              <h3 className="text-balance text-4xl font-semibold tracking-tight text-gray-800 sm:text-4xl text-center">
                Settings
              </h3>
            </div>

            <div className="border-b border-gray-400 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="text-sm font-semibold text-gray-900"
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </>
  );
}
