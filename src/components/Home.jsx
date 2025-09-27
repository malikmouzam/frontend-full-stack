import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteModal from "./NoteModal";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const location = useLocation();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";

      const { data } = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredNotes = search
        ? data.filter((note) => {
            const t = (note.title ?? "").toLowerCase();
            const d = (note.description ?? "").toLowerCase();
            const q = search.toLowerCase();
            return t.includes(q) || d.includes(q);
          })
        : data;

      setNotes(filteredNotes);
    } catch (err) {
      setError("Failed to fetch notes");
    }
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchNotes();
  }, [location.search]);

  const handleSaveNote = (newNote) => {
    if (editNote) {
      setNotes((prev) =>
        prev.map((note) => (note._id === newNote._id ? newNote : note))
      );
    } else {
      setNotes((prev) => [...prev, newNote]);
    }
    setEditNote(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#0A0F17]">
      {error && <p className="text-[#FF6A8F] mb-4">{error}</p>}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditNote(null);
        }}
        note={editNote}
        onSave={handleSaveNote}
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#78F5DA] to-[#8AA0FF] text-[#061017] text-3xl rounded-full shadow-lg hover:opacity-90 ring-1 ring-white/10 flex items-center justify-center"
      >
        <span className="flex items-center justify-center h-full w-full pb-1">+</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="
              relative overflow-hidden
              bg-[#0E1522] p-4 rounded-2xl shadow-xl
              outline outline-1 outline-[#8AA0FF1a]
              transition-transform duration-200
              hover:-translate-y-0.5 hover:outline-[#8AA0FF33]
              before:content-[''] before:absolute before:-top-3 before:left-3 before:w-10 before:h-10 before:rounded-full before:bg-[#0A0F17]
              after:content-[''] after:absolute after:-bottom-3 after:right-3 after:w-10 after:h-10 after:rounded-full after:bg-[#0A0F17]
            "
          >
            <h3 className="text-lg font-medium text-[#EAF2FF] mb-2">
              {note.title}
            </h3>
            <p className="text-[#9BB0C9] mb-4">{note.description}</p>
            <p className="text-sm text-[#9BB0C9] mb-4">
              {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : ""}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="bg-[#A987FF] text-[#0A0F17] px-3 py-1 rounded-md hover:bg-[#9A78FF] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-[#FF6A8F] text-white px-3 py-1 rounded-md hover:bg-[#E6557B] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
