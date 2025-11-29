import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const [form, setForm] = useState({
    voterId: "",
    name: "",
    address: "",
    password: "",
    role: "voter",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/register", form);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch {
      alert("User already exists or error occurred");
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", color: "#004aad" }}>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          name="voterId"
          placeholder="Voter ID"
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
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
        <select name="role" onChange={handleChange} required>
          <option value="voter">Voter</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <button
        onClick={() => navigate("/login")}
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
        Already registered? Login
      </button>
    </div>
  );
}
