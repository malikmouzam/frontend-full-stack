import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setDescription(note ? note.description : "");
    setError("");
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }

      const payload = { title, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (note) {
        const { data } = await axios.put(
          `/api/notes/${note._id}`,
          payload,
          config
        );
        onSave(data);
      } else {
        const { data } = await axios.post("/api/notes", payload, config);
        onSave(data);
      }
      setTitle("");
      setDescription("");
      setError("");
      onClose();
    } catch (err) {
      console.log("Note save error");
      setError("Failed to save error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0E1522] shadow-xl outline outline-1 outline-[#8AA0FF1a] transition-all">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-xl font-semibold tracking-tight text-[#EAF2FF]">
            {note ? "Edit Note" : "Create Note"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#9BB0C9] transition hover:bg-[#0A0F17] hover:text-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8AA0FF]"
            aria-label="Close"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          {error && (
            <p className="mb-4 rounded-lg border border-[#FF6A8F]/30 bg-[#FF6A8F]/10 px-3 py-2 text-sm text-[#FF6A8F]">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full rounded-xl border border-[#8AA0FF33] bg-[#0A0F17] px-3 py-2 text-[#EAF2FF] placeholder:text-[#9BB0C9] shadow-sm outline-none transition focus:border-[#8AA0FF] focus:ring-2 focus:ring-[#8AA0FF]"
                required
              />
            </div>
            <div>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Note description"
                className="w-full rounded-xl border border-[#8AA0FF33] bg-[#0A0F17] px-3 py-2 text-[#EAF2FF] placeholder:text-[#9BB0C9] shadow-sm outline-none transition focus:border-[#8AA0FF] focus:ring-2 focus:ring-[#8AA0FF]"
                rows={4}
                required
              />
            </div>

            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#78F5DA] to-[#8AA0FF] px-4 py-2 text-sm font-medium text-[#061017] shadow-md ring-1 ring-white/10 transition hover:opacity-90 active:scale-[.99]"
              >
                {note ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-[#EAF2FF] ring-1 ring-white/10 transition hover:bg-[#0A0F17] hover:ring-[#8AA0FF33] focus-visible:ring-2 focus-visible:ring-[#8AA0FF] active:scale-[.99]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;