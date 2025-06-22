import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center absolute inset-0 bg-gradient-to-br from-teal-50 to-indigo-500 dark:from-gray-900 dark:to-indigo-900">
      <div className="bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-sm">
        <form
          onSubmit={handleLogin}
          className="p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-yellow-50">
            Admin Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;
