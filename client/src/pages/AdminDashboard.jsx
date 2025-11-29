// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const SYMBOL_OPTIONS = [
  { emoji: "🐘", name: "Elephant" },
  { emoji: "✋", name: "Hand" },
  { emoji: "🔥", name: "Fire" },
  { emoji: "🌾", name: "Paddy" },
  { emoji: "🦅", name: "Eagle" },
  { emoji: "⚡", name: "Lightning" },
  { emoji: "🌟", name: "Star" },
  { emoji: "🚀", name: "Rocket" },
];

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [newElection, setNewElection] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [candidateSymbol, setCandidateSymbol] = useState("");
  const [selectedElection, setSelectedElection] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const res = await axios.get("/api/elections");
      setElections(res.data || []);
    } catch (err) {
      console.error("Load elections error:", err);
      setElections([]);
    }
  };

  // Add new election
  const handleAddElection = async (e) => {
    e.preventDefault();
    if (!newElection.trim()) return alert("Enter election name!");

    try {
      await axios.post("/api/elections/create", { name: newElection });
      setNewElection("");
      loadElections();
    } catch (err) {
      console.error("Add election error:", err);
      alert("Could not add election.");
    }
  };

  // End election
  const handleEndElection = async (id) => {
    if (!confirm("Once ended, votes cannot be cast. End this election?")) return;

    try {
      await axios.put(`/api/elections/${id}/end`);
      await loadElections();
      alert("Election ended successfully");
    } catch (err) {
      console.error("End election error:", err);
      alert("Could not end election.");
    }
  };

  // Delete entire election (optional)
  const handleDeleteElection = async (id, isEnded) => {
    if (isEnded) return alert("Cannot delete an ended election!");

    if (!confirm("Delete this election? This also deletes candidates.")) return;

    try {
      await axios.delete(`/api/elections/${id}`);
      await loadElections();
    } catch (err) {
      console.error("Delete election error:", err);
      alert("Could not delete election.");
    }
  };

  // Add candidate
  const handleAddCandidate = async (e) => {
    e.preventDefault();

    if (!selectedElection) return alert("Choose an election!");
    const election = elections.find((el) => el._id === selectedElection);

    if (election?.isEnded) {
      return alert("Cannot add candidate. Election already ended.");
    }

    if (!candidateName.trim()) return alert("Enter candidate name!");
    if (!candidateSymbol) return alert("Select symbol!");

    const [emoji, name] = candidateSymbol.split("|");

    try {
      await axios.post(`/api/elections/${selectedElection}/add-candidate`, {
        name: candidateName,
        party: candidateParty,
        symbolEmoji: emoji,
        symbolName: name,
      });

      setCandidateName("");
      setCandidateParty("");
      setCandidateSymbol("");

      loadElections();
    } catch (err) {
      console.error("Add candidate error:", err);
      alert("Could not add candidate.");
    }
  };

  // Delete single candidate
  const handleDeleteCandidate = async (electionId, candidateId, isEnded) => {
    if (isEnded) return alert("Cannot delete candidate after election ended!");

    if (!confirm("Delete this candidate?")) return;

    try {
      await axios.delete(`/api/elections/${electionId}/candidates/${candidateId}`);
      loadElections();
    } catch (err) {
      console.error("Delete candidate error:", err);
      alert("Could not delete candidate.");
    }
  };

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <p>Manage elections, candidates, symbols, and end elections.</p>

      {/* Add Election */}
      <form className="admin-form" onSubmit={handleAddElection}>
        <input
          type="text"
          value={newElection}
          onChange={(e) => setNewElection(e.target.value)}
          placeholder="Enter new election name"
        />
        <button type="submit">Add Election</button>
      </form>

      {/* Add Candidate */}
      <form className="admin-form" onSubmit={handleAddCandidate}>
        <select
          value={selectedElection}
          onChange={(e) => setSelectedElection(e.target.value)}
        >
          <option value="">Select election</option>
          {elections.map((el) => (
            <option key={el._id} value={el._id} disabled={el.isEnded}>
              {el.name} {el.isEnded ? "(ENDED)" : ""}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          disabled={!selectedElection}
        />

        <input
          type="text"
          placeholder="Party (optional)"
          value={candidateParty}
          onChange={(e) => setCandidateParty(e.target.value)}
          disabled={!selectedElection}
        />

        <select
          value={candidateSymbol}
          onChange={(e) => setCandidateSymbol(e.target.value)}
          disabled={!selectedElection}
        >
          <option value="">Select Symbol</option>
          {SYMBOL_OPTIONS.map((s, i) => (
            <option key={i} value={`${s.emoji}|${s.name}`}>
              {s.emoji} {s.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!selectedElection}>
          Add Candidate
        </button>
      </form>

      {/* Elections list */}
      <div className="election-list">
        {elections.map((el) => (
          <div className="election-card" key={el._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                {el.name} —{" "}
                <span style={{ color: el.isEnded ? "red" : "green" }}>
                  {el.isEnded ? "ENDED" : "ACTIVE"}
                </span>
              </h3>

              <div>
                {!el.isEnded && (
                  <button onClick={() => handleEndElection(el._id)}>
                    End Election
                  </button>
                )}
                <button
                  onClick={() => handleDeleteElection(el._id, el.isEnded)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            </div>

            <p>Total Candidates: {el.candidates.length}</p>
            <ul>
              {el.candidates.map((c) => (
                <li key={c._id}>
                  {c.symbolEmoji} <b>{c.symbolName}</b> — {c.name}
                  <button
                    style={{ marginLeft: "12px" }}
                    onClick={() =>
                      handleDeleteCandidate(el._id, c._id, el.isEnded)
                    }
                  >
                    Delete Candidate
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Done button */}
        <button
          className="done-btn"
          onClick={() => navigate("/")}
          style={{ marginTop: "20px" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
