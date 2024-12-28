import React, { useState, useEffect } from "react";
import axios from "axios";

function AllNotes() {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Function to fetch all notes
  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/note");
      const notesData = response?.data?.notes || [];
      setNotes(notesData);
      setFilteredNotes(notesData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/note/data/search?subject=${searchQuery}`
        );
        setFilteredNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };
  console.log(notes)

  return (
    <>
      <div>
        <div className="max-w-lg mx-auto mt-8">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for notes..."
            className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <>
          <div>
            <div className="flex flex-col max-w-2xl m-auto space-y-6 p-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, key) => (
                  <div
                    key={key}
                    className="bg-slate-300 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex justify-between items-center">
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
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p className="text-center text-gray-600">No notes found</p>
                </>
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default AllNotes;
