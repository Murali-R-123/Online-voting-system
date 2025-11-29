import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // admin / voter / null

  const goToDashboard = () => {
    if (role === "admin") navigate("/admin");
    else if (role === "voter") navigate("/voter");
    else navigate("/login");
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="home-hero">
        <h1>Empower Democracy Digitally</h1>
        <p>Secure, transparent, and efficient online voting platform.</p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
          alt="Voting"
        />
      </div>
      
      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={goToDashboard}
          className="home-btn"
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {role === "admin"
            ? "Admin Dashboard"
            : role === "voter"
            ? "Voter Dashboard"
            : "Login"}
        </button>

        <button
          onClick={() => navigate("/results")}
          className="home-btn"
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          View Results
        </button>
      </div>

      {/* EXTRA SECTION 1 – FEATURES */}
      <div className="container" style={{ marginTop: "40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Why Choose VoteSmart?
        </h2>

        <ul
          style={{
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <li>🗳️ Simple and intuitive interface for all users.</li>
          <li>🔐 Highly secure — prevents duplicate or unauthorized votes.</li>
          <li>📊 Instant and transparent result calculation.</li>
          <li>⚡ Fast setup for admins to create and manage elections.</li>
          <li>🌐 Works on any device — fully responsive.</li>
        </ul>
      </div>

      {/* EXTRA SECTION 2 – QUICK INFO */}
      <div
        className="container"
        style={{
          marginTop: "50px",
          background: "#eef5ff",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h2>How It Works</h2>
        <p style={{ fontSize: "17px", marginTop: "10px", lineHeight: "1.6" }}>
          1️⃣ Admin creates an election and adds candidates.<br />
          2️⃣ Voters log in and cast their vote using a secure voter ID.<br />
          3️⃣ System automatically prevents multiple votes.<br />
          4️⃣ Admin ends the election and results are displayed instantly.<br />
        </p>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          padding: "20px",
          opacity: 0.6,
          fontSize: "14px",
        }}
      >
        © 2025 VoteSmart — Smart, Safe & Simple Digital Voting
      </div>
    </div>
  );
}
