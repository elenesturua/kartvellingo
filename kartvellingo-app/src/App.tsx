import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/plans");
  };
  return (
    <div className="app-container">
      <h1>KartvelLingo</h1>
      <img
        src="/georgianFlag.webp"
        alt="Georgian flag"
        className="flag-image"
      />
      <div className="card">
        <p className="subtitle">Learn Georgian with flashcards!</p>

        <p className="description">
          Here’s a fun fact! There’s a small country called Georgia, and no, not
          the U.S. state. We’ve got our own alphabet, culture, and a super
          unique language that’s not related to any other! Want to pick up a new
          party trick or surprise your Georgian friends? Start your journey
          here, and while you are at it, check out the beautiful flag of Georgia
          above!
        </p>
        <button className="start-button" onClick={handleClick}>
          Start Learning{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
