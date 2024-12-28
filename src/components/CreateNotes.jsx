import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";

export default function CreateNotes() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [createdBy, setCreatedBy] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  setCreatedBy(decoded.id)
  setCreatedAt(Date.now())

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const body = { title, subject, content , createdBy, createdAt};
   

    try {
      const response = await axios.post("http://localhost:5000/note", body);
      if (response.status === 200) {
        toast.success("Notes Created Successfully!");
        navigate("/mynotes");

      }
    } catch (err) {
      console.error(err.response?.data);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };


  return (
    <>
      <form
        className="mx-auto my-9 max-w-2xl py-16 sm:py-16 lg:py-30 bg-slate-300 sm:px-20 lg:px-50 rounded-3xl shadow-2xl"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-400 pb-12">
            <br />
            <h3 className="text-balance text-4xl font-semibold tracking-tight text-gray-800 sm:text-4xl text-center">
              Create Notes 
            </h3>
          </div>

          <div className="border-b border-gray-400 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-900"
                >
                    Subject
                </label>
                <div className="mt-2">
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-900"
                >
                  Content
                </label>
                <div className="mt-2">
                <textarea
                  id="content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="block w-full row-span-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
                />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              onClick={()=>{navigate('/mynotes')}}
              className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

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
