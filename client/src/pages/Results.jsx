import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const res = await axios.get("/api/elections/results");
      setResults(res.data || []);
    } catch (err) {
      console.error("Results fetch error:", err);
    }
  };

  return (
    <div className="page-container">
      <h2>Election Results</h2>
      <p>Completed elections and their winners</p>

      {results.length === 0 && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          No completed elections yet.
        </p>
      )}

      {results.map((election) => (
        <div
          key={election.electionId}
          className="election-card"
          style={{
            background: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>
            {election.electionName} —{" "}
            <span style={{ color: "green" }}>Completed</span>
          </h3>

          <h4 style={{ marginTop: "10px" }}>
            🏆 Winner: <span style={{ color: "blue" }}>{election.winner}</span>
          </h4>

          <ul style={{ marginTop: "10px" }}>
            {election.candidates.map((c) => (
              <li key={c._id} style={{ marginBottom: "6px" }}>
                {c.symbolEmoji} {c.symbolName} — <b>{c.name}</b> :{" "}
                <b>{c.votes}</b> votes
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
