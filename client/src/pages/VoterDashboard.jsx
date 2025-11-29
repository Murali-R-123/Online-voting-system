// src/pages/VoterDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function VoterDashboard() {
  const [elections, setElections] = useState([]);
  const [voted, setVoted] = useState({});
  const navigate = useNavigate();
  const voterId = localStorage.getItem("voterId");

  useEffect(() => {
    loadElections();

    // Load per-voter stored votes
    const stored = JSON.parse(localStorage.getItem("votedElections")) || {};

    if (stored[voterId]) {
      setVoted(stored[voterId]); // use only this voter's votes
    }
  }, []);

  const loadElections = async () => {
    try {
      const res = await axios.get("/api/elections");
      setElections(res.data);
    } catch (err) {
      console.error("Error loading elections", err);
    }
  };

  const handleVote = async (electionId, candidateId) => {
    try {
      await axios.post(`/api/elections/${electionId}/vote`, {
        voterId,
        candidateId,
      });

      const updatedVotes = { ...voted, [electionId]: true };
      setVoted(updatedVotes);

      // Store votes per voter
      const allVotes = JSON.parse(localStorage.getItem("votedElections")) || {};
      allVotes[voterId] = updatedVotes;

      localStorage.setItem("votedElections", JSON.stringify(allVotes));

      loadElections();
      alert("Vote submitted!");
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting vote");
    }
  };

  return (
    <div className="page-container">
      <h2>Voter Dashboard</h2>
      <p>Cast your vote securely</p>

      <div className="election-list">
        {elections.map((election) => (
          <div className="election-card" key={election._id}>
            <h3>
              {election.name} —{" "}
              <span style={{ color: election.isEnded ? "red" : "green" }}>
                {election.isEnded ? "ENDED" : "ACTIVE"}
              </span>
            </h3>

            <ul>
              {election.candidates.map((c) => (
                <li key={c._id} style={{ marginBottom: "10px" }}>
                  {c.symbolEmoji} {c.symbolName} — <b>{c.name}</b>
                  <span style={{ marginLeft: "10px" }}>
                    Votes: {c.votes}
                  </span>

                  {!election.isEnded && (
                    <button
                      style={{ marginLeft: "12px" }}
                      disabled={voted[election._id]}
                      onClick={() => handleVote(election._id, c._id)}
                    >
                      {voted[election._id] ? "Voted" : "Vote"}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {election.isEnded && (
              <button
                style={{ marginTop: "8px" }}
                onClick={() => navigate("/results")}
              >
                View Results
              </button>
            )}
          </div>
        ))}

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
