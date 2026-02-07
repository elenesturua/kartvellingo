import { useNavigate } from "react-router-dom";
import "./vowels/VowelQuiz.css";
import LearningNav from "../../../components/LearningNav.tsx";

interface AlphabetMenuProps {
  onSelectSection: (section: string) => void;
}

function AlphabetMenu({ onSelectSection }: AlphabetMenuProps) {
  const navigate = useNavigate();

  const sections = [
    {
      id: "intro",
      title: "📖 Introduction",
      description: "Learn about the Georgian alphabet structure",
      letters: "Overview",
    },
    {
      id: "vowels",
      title: "🔴 Vowels",
      description: "The 5 Georgian vowels",
      letters: "ა ე ი ო უ",
    },
    {
      id: "consonants1",
      title: "🔵 Consonants Group 1",
      description: "Common consonants similar to English",
      letters: "ბ გ დ ვ ზ თ კ ლ მ ნ",
    },
    {
      id: "consonants2",
      title: "🟢 Consonants Group 2",
      description: "More consonants including ejectives",
      letters: "პ ჟ რ ს ტ ფ ქ ღ ყ შ",
    },
    {
      id: "consonants3",
      title: "🟡 Consonants Group 3",
      description: "Final consonants with unique sounds",
      letters: "ჩ ც ძ წ ჭ ხ ჯ ჰ",
    },
  ];

  return (
    <div className="vowel-quiz-page">
      <LearningNav
        jumpLabel="Jump to Full Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />

      <h2 style={{ color: "#c8102e", marginBottom: "0.5rem" }}>Georgian Alphabet</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Choose a section to learn and practice</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", width: "100%" }}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            style={{
              background: "#fff6f6",
              border: "1px solid #eee",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#c8102e";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(200,16,46,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#eee";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem", color: "#333" }}>
              {section.title}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
              {section.description}
            </div>
            <div style={{ fontSize: "1.2rem", color: "#c8102e", letterSpacing: "2px" }}>
              {section.letters}
            </div>
          </button>
        ))}
      </div>

      <button
        className="start-button"
        style={{ marginTop: "2rem" }}
        onClick={() => navigate("/letters", { state: { jumpToFull: true } })}
      >
        View Full Alphabet Reference
      </button>
    </div>
  );
}

export default AlphabetMenu;
