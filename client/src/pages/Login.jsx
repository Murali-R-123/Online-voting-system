import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({ voterId: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", form);
      const user = res.data;

      // Clear any old session
      localStorage.clear();

      // Store details
      localStorage.setItem("userId", user._id);
      localStorage.setItem("voterId", user.voterId);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "voter") {
        navigate("/voter");
      } else {
        alert("Unknown user role!");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", color: "#004aad" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          name="voterId"
          placeholder="Voter ID"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button
    onClick={() => navigate("/signup")}
    style={{
    marginTop: "15px",
    display: "block",
    margin: "15px auto",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    color: "#004aad",
    cursor: "pointer",
    textDecoration: "underline"
  }}
  >
  New user? Signup
    </button>
    </div>
  );
}
