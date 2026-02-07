import { useState } from "react";
import "../vowels/VowelQuiz.css";
import LearningNav from "../../../../components/LearningNav.tsx";

const slides = [
  {
    title: "Time for Consonants!",
    content: "You've mastered the 5 vowels. Now let's learn the 28 consonants! Don't worry — we'll break them into smaller groups.",
  },
  {
    title: "Three Types of Consonants",
    content: "Georgian has regular consonants (like English), aspirated consonants (with a puff of air), and ejective consonants (unique sounds made by compressing air in the throat).",
  },
  {
    title: "Ejective Sounds",
    content: "Ejectives are marked with an apostrophe: კ (k'), პ (p'), ტ (t'), ყ (q'), წ (ts'), ჭ (ch'). These are unique to languages like Georgian — practice by making the sound 'pop' from your throat!",
  },
  {
    title: "Similar Sounds, Different Letters",
    content: "Georgian distinguishes sounds that English doesn't: ტ (t') vs თ (t), პ (p') vs ფ (p), კ (k') vs ქ (k). This takes practice but becomes natural!",
  },
  {
    title: "Learning Strategy",
    content: "We'll learn consonants in 3 groups of about 10 letters each. After each group, you'll take a quiz. Ready to start with Group 1?",
  },
];

interface ConsonantsIntroProps {
  onFinish?: () => void;
}

function ConsonantsIntro({ onFinish }: ConsonantsIntroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="vowel-quiz-page">
      <LearningNav
        jumpLabel="Jump to Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />

      <div className="lesson-progress" style={{ maxWidth: "500px", width: "100%", marginBottom: "2rem" }}>
        <div className="progress-bar" style={{ flex: 1, height: "8px", background: "rgba(200,16,46,0.1)", borderRadius: "4px", overflow: "hidden" }}>
          <div 
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #c8102e, #e94560)",
              transition: "width 0.3s ease"
            }}
          />
        </div>
        <span style={{ color: "#888", marginLeft: "1rem" }}>{currentSlide + 1} / {slides.length}</span>
      </div>

      <div className="intro-card" style={{ maxWidth: "500px", padding: "2rem", background: "#fff6f6", borderRadius: "16px", textAlign: "center" }}>
        <h2 style={{ color: "#c8102e", marginBottom: "1rem" }}>{slides[currentSlide].title}</h2>
        <p style={{ lineHeight: 1.7, color: "#444" }}>{slides[currentSlide].content}</p>
      </div>

      <div className="intro-controls" style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="nav-button"
          style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
        >
          ← Back
        </button>
        {currentSlide < slides.length - 1 ? (
          <button onClick={nextSlide} className="nav-button">
            Next →
          </button>
        ) : (
          <button onClick={onFinish} className="start-button">
            Start Consonants Group 1 →
          </button>
        )}
      </div>
    </div>
  );
}

export default ConsonantsIntro;
