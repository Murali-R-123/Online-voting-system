import { Link } from "react-router-dom";
import "./App.css";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">🗳️ VoteSmart</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/results">Results</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}
