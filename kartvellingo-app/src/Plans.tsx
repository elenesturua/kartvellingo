import { useNavigate } from "react-router-dom";
import "./Plans.css";

function Plans() {
  const navigate = useNavigate();
  const handleStartLetters = () => {
    navigate("/letters", { state: { jumpToFull: true } });
  };

  const handleStartGrammar = () => {
    navigate("/basic-grammar");
  };
  const handleStartPhrases = () => {
    navigate("/basic-phrases");
  };
  const handleStartFacts = () => {
    navigate("/language-facts");
  };
  const handleStartDailyLessons = () => {
    navigate("/daily-lessons");
  };
  const handleExploreGeorgia = () => {
    navigate("/explore-georgia");
  };
  return (
    <div className={"plans-container"}>
      <h2>Your Journey Begins Here!! </h2>
      <p>Select a category to start learning:</p>

      {/* Step 1: Georgian Alphabet - Learn this first! */}
      <div className={"plan-card"} onClick={handleStartLetters}>
        <div className="card-badge">Start Here!</div>
        <h3>🔤 The Georgian Alphabet</h3>
        <p>
          Learn the 33 unique letters of the Georgian script — 5 vowels and 28 consonants.
          This is the foundation for everything else!
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            className="start-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/letters/intro-path");
            }}
          >
            Start Guided Intro
          </button>

          <button
            className="start-button outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/letters", { state: { jumpToFull: true } });
            }}
          >
            Jump to Alphabet
          </button>
        </div>
      </div>

      {/* Step 2: Daily Lessons */}
      <div className={"plan-card"} onClick={handleStartDailyLessons}>
        <h3>📚 Daily Lessons</h3>
        <p>
          Follow structured lessons day by day — greetings, numbers, family, and more!
          Each lesson includes guided intro, flashcards, and a quiz.
        </p>
        <div className="day-tags">
          <span className="day-tag">Day 1: Conversations</span>
          <span className="day-tag">Day 2: Numbers</span>
          <span className="day-tag">Day 3: Family</span>
        </div>
        <button className={"start-button"}>Start Lessons</button>
      </div>

      <div className={"plan-card"} onClick={handleStartGrammar}>
        <h3>📖 Basic Grammar</h3>
        <p>
          Understand simple sentence structure and grammar (It's hard but I'll
          do my best)
        </p>
        <button className={"start-button"}>Start Now</button>
      </div>
      <div className={"plan-card"} onClick={handleStartPhrases}>
        <h3>💬 Basic Phrases and Words</h3>
        <p>
          The most important phrases you need to know to get by in Georgia, like
          Gagimarjos and Supra!
        </p>
        <button className={"start-button"}>Start Now</button>
      </div>
      <div className={"plan-card"} onClick={handleStartFacts}>
        <h3>🎯 Fun Facts</h3>
        <p>Learn about the Georgian culture, history and quirks.</p>
        <button className={"start-button"}>Start Now</button>
      </div>

      {/* Explore Georgia - Travel Guide */}
      <div className={"plan-card explore-card"} onClick={handleExploreGeorgia}>
        <h3>🇬🇪 Explore Georgia</h3>
        <p>
          Your insider guide to the best of Georgia — from ancient fortresses to the perfect khinkali spot!
        </p>
        <div className="explore-tags">
          <span className="explore-tag">🏛️ Tbilisi</span>
          <span className="explore-tag">⛰️ Regions</span>
          <span className="explore-tag">🥟 Food</span>
          <span className="explore-tag">🍷 Wine</span>
        </div>
        <button className={"start-button"}>Explore Now</button>
      </div>
    </div>
  );
}

export default Plans;
