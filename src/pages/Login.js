import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "FARMER",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(form.email.trim(), form.password);
        navigate("/dashboard");
      } else {
        await API.post("/users/register", {
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          phoneNumber: form.phoneNumber,
        });

        alert("Account created successfully. Please login.");
        setMode("login");
      }
    } catch (err) {
      console.error("AUTH ERROR:", err);

      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 403) {
        setError("Access denied");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-200 to-green-300 relative">
      <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center">🌾 FarmXChain</h1>
        <p className="text-center text-gray-600 mb-6">
          {mode === "login" ? "Login to continue" : "Create your account"}
        </p>

        <div className="flex mb-6 rounded-full bg-white/60 p-1">
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setError("");
                setMode(m);
              }}
              className={`w-1/2 py-2 rounded-full font-semibold transition ${
                mode === m ? "bg-green-600 text-white" : "text-gray-700"
              }`}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center font-semibold">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {mode === "register" && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80"
            >
              <option value="FARMER">🌾 Farmer</option>
              <option value="DISTRIBUTOR">🚚 Distributor</option>
              <option value="CUSTOMER">🛒 Customer</option>
            </select>
          )}

          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/80"
          />

          {mode === "register" && (
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              placeholder="Mobile Number"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80"
            />
          )}

          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/80"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold shadow-lg disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
