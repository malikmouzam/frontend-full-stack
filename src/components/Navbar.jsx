import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#8AA0FF1a] bg-[#0A0F17]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0A0F17]/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="text-base font-semibold tracking-tight text-[#EAF2FF] transition hover:opacity-90"
        >
          NOTES
        </Link>

        {user && (
          <>
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="w-full rounded-xl border border-[#8AA0FF33] bg-[#0A0F17] px-3 py-2 text-[#EAF2FF] placeholder:text-[#9BB0C9] shadow-sm outline-none transition focus:border-[#8AA0FF] focus:ring-2 focus:ring-[#8AA0FF]"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-[#9BB0C9] sm:inline">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl bg-transparent px-3 py-2 text-sm font-medium text-[#EAF2FF] ring-1 ring-white/10 outline-none transition hover:bg-[#0E1522] hover:ring-[#8AA0FF33] focus-visible:ring-2 focus-visible:ring-[#8AA0FF] active:scale-[.99]"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;