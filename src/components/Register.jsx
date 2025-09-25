import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.VITE_APP_BACKEND_URL}/api/users/register`, {
        username,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-[80vh] w-full bg-[#0A0F17] px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-[#0E1522] p-6 shadow-xl outline outline-1 outline-[#8AA0FF1a]">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-[#EAF2FF]">
          Register
        </h2>

        {error && (
          <p className="mb-4 rounded-lg border border-[#FF6A8F]/30 bg-[#FF6A8F]/10 px-3 py-2 text-center text-sm text-[#FF6A8F]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-xl border border-[#8AA0FF33] bg-[#0A0F17] px-3 py-2 text-[#EAF2FF] placeholder:text-[#9BB0C9] shadow-sm outline-none transition focus:border-[#8AA0FF] focus:ring-2 focus:ring-[#8AA0FF]"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border border-[#8AA0FF33] bg-[#0A0F17] px-3 py-2 text-[#EAF2FF] placeholder:text-[#9BB0C9] shadow-sm outline-none transition focus:border-[#8AA0FF] focus:ring-2 focus:ring-[#8AA0FF]"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-[#8AA0FF33] bg-[#0A0F17] px-3 py-2 text-[#EAF2FF] placeholder:text-[#9BB0C9] shadow-sm outline-none transition focus:border-[#8AA0FF] focus:ring-2 focus:ring-[#8AA0FF]"
              required
            />
          </div>
          <button
            className="w-full rounded-xl bg-gradient-to-br from-[#78F5DA] to-[#8AA0FF] py-2 text-sm font-medium text-[#061017] shadow-md ring-1 ring-white/10 transition hover:opacity-90 active:scale-[.99]"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#9BB0C9]">
          Already have an account?{" "}
          <Link className="font-medium text-[#A987FF] hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;