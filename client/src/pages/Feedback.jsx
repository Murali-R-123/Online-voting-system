import React, { useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/feedback", form);
    alert("Feedback submitted!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="page-container">
      <h2>Feedback</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <textarea
          name="message"
          placeholder="Your feedback..."
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
