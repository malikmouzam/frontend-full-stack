import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0F17]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0E1522] p-6 rounded-2xl shadow-xl w-full max-w-md outline outline-1 outline-[#8AA0FF1a]"
      >
        <h2 className="text-2xl font-bold text-[#EAF2FF] mb-4 text-center">
          Login
        </h2>
        {error && <p className="text-[#FF6A8F] mb-3 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-3 rounded-xl bg-[#0A0F17] text-[#EAF2FF] border border-[#8AA0FF33] focus:outline-none focus:border-[#8AA0FF] placeholder-[#9BB0C9]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-xl bg-[#0A0F17] text-[#EAF2FF] border border-[#8AA0FF33] focus:outline-none focus:border-[#8AA0FF] placeholder-[#9BB0C9]"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-br from-[#78F5DA] to-[#8AA0FF] text-[#061017] font-semibold py-3 rounded-xl hover:opacity-90 transition"
        >
          Login
        </button>
        <p className="text-center text-[#9BB0C9] mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#A987FF] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
