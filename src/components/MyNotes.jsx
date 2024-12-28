import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function MyNotes() {
  const navigate = useNavigate();
  const [myNotes, setMyNotes] = useState(null);
  const [state, setState] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [id, setId] = useState("");
  const [notes, setNotes] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/note/${userId}`
        );
        setMyNotes(response?.data?.notes || null);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    getData();
  }, [token, userId]);

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/note");
      setNotes(response?.data?.note || null);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  const handleUpdate = (note) => {
    setState(true);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setId(note._id);
  };
  const handleSubmit = async (id) => {
    console.log(id);
    const body = {
      title: title,
      subject: subject,
      content: content,
    };
    try {
      const updateNotes = await axios.patch(
        `http://localhost:5000/note/${id}`,
        body
      );
      if (updateNotes) {
        toast.success("Notes Updated successfully");
        getNotes(); 
        setState(false);
      }
    } catch (err) {
      toast.error("An error occurred! Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/note/${id}`);
      if (response.status === 200) {
        toast.success("Note deleted successfully");
        // Remove from local state first for instant UI update
      setMyNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      // Re-fetch the notes to get the updated list
      getNotes();
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the note. Please try again.");
    }
  };
  

  return (
    <>
      {state && (
        <>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
        </>
      )}
      {/* Main Content */}
      <div className={state ? "filter blur-sm" : ""}>
        <h1 className="text-4xl font-semibold text-gray-800 text-center py-5">
          My Notes
        </h1>
        <div className="flex align-middle justify-end p-3 mr-10 gap-9">
          <p className="text-gray-900">Create notes:</p>
          <button
            onClick={() => {
              navigate("/create");
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 transition duration-150 ease-in-out"
          >
            +
          </button>
        </div>
        <div className="m-auto flex flex-col space-y-6 px-12">
          {myNotes?.map((note, key) => (
            <div
              key={key}
              className="bg-slate-300 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Title: {note.title}
                  </h2>
                  <h3 className="text-xl text-gray-600 mb-4">
                    Subject: {note.subject}
                  </h3>
                  <p className="text-gray-700 text-base">
                    Content: {note.content}
                  </p>
                  <p className="text-gray-700 text-base">
                    Created at: {note.createdAt}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleUpdate(note)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Form */}
      {state && (
        <>
          <form className="fixed inset-0 flex items-center justify-center mx-auto my-9 max-w-3xl py-16 bg-slate-300 px-10 sm:px-16 rounded-3xl shadow-2xl z-50">
            <div className="w-full space-y-5">
              <div className="border-b border-gray-400 pb-5">
                <h3 className="text-4xl font-semibold tracking-tight text-gray-800 text-center">
                  Edit Notes
                </h3>
              </div>

              <div className="pb-5">
                <div className="grid grid-cols-1 gap-y-8">
                  {/* Title Input */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-900"
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
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="subject"
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
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Content Input */}
                  <div>
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
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 sm:text-sm"
                        rows="5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    handleSubmit(id);
                  }}
                  className="rounded-md bg-gray-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus:ring-2 focus:ring-gray-800"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setState(false);
                  }}
                  className="rounded-md bg-gray-300 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {notes}
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
    </>
  );
}

export default MyNotes;
