import "../App.css";

export default function About() {
  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <h2>About VoteSmart</h2>

      <p>
        <b>VoteSmart</b> is a secure, transparent and user-friendly online
        voting platform developed using the <b>MERN stack</b>. Our goal is to
        modernize the voting experience by offering a digital solution that is
        fast, reliable and accessible to everyone.
      </p>

      <h3 style={{ marginTop: "25px" }}> Key Features</h3>
      <ul>
        <li>Secure authentication for voters and admins</li>
        <li>Creation and management of multiple elections</li>
        <li>Real-time vote counting with tamper-proof storage</li>
        <li>One-vote-per-person verification</li>
        <li>Instant results with tie-handling logic</li>
        <li>Clean and intuitive dashboard experience</li>
      </ul>

      <h3 style={{ marginTop: "25px" }}> Our Mission</h3>
      <p>
        We aim to make digital voting accessible for educational institutions,
        organizations and small communities. VoteSmart ensures transparency by
        recording each vote securely while keeping the system simple and easy
        to use for all participants.
      </p>
    </div>
  );
}
