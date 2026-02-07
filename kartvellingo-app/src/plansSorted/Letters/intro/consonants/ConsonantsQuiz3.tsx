import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../vowels/VowelQuiz.css";
import LearningNav from "../../../../components/LearningNav.tsx";

interface QuizOption {
  text: string;
  pronunciation?: string;
}

interface QuizQuestion {
  letter?: string;
  question: string;
  options: QuizOption[];
  answer: string;
}

const allQuestions: QuizQuestion[] = [
  // Letter recognition
  {
    letter: "ჩ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "Ch" }, { text: "Sh" }, { text: "Ts" }, { text: "J" }],
    answer: "Ch",
  },
  {
    letter: "ც",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "Ts" }, { text: "Dz" }, { text: "Ch" }, { text: "S" }],
    answer: "Ts",
  },
  {
    letter: "ძ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "Ts" }, { text: "Z" }, { text: "Dz" }, { text: "D" }],
    answer: "Dz",
  },
  {
    letter: "წ",
    question: "What is the Latin equivalent of this letter? (ejective Ts)",
    options: [{ text: "Ts" }, { text: "Ts'" }, { text: "Ch'" }, { text: "Dz" }],
    answer: "Ts'",
  },
  {
    letter: "ჭ",
    question: "What is the Latin equivalent of this letter? (ejective Ch)",
    options: [{ text: "Ch" }, { text: "Ch'" }, { text: "Ts'" }, { text: "J" }],
    answer: "Ch'",
  },
  {
    letter: "ხ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "H" }, { text: "Kh" }, { text: "Gh" }, { text: "K" }],
    answer: "Kh",
  },
  {
    letter: "ჯ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "J" }, { text: "G" }, { text: "Zh" }, { text: "Ch" }],
    answer: "J",
  },
  {
    letter: "ჰ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "Kh" }, { text: "Gh" }, { text: "H" }, { text: "X" }],
    answer: "H",
  },
  // Reverse - find the Georgian letter
  {
    question: "Which letter makes the 'Ch' sound (like in cheese)?",
    options: [
      { text: "ც", pronunciation: "Ts" },
      { text: "ჩ", pronunciation: "Ch" },
      { text: "ჭ", pronunciation: "Ch'" },
      { text: "შ", pronunciation: "Sh" },
    ],
    answer: "ჩ",
  },
  {
    question: "Which letter makes the 'J' sound (like in jam)?",
    options: [
      { text: "ჟ", pronunciation: "Zh" },
      { text: "ჯ", pronunciation: "J" },
      { text: "გ", pronunciation: "G" },
      { text: "ძ", pronunciation: "Dz" },
    ],
    answer: "ჯ",
  },
  {
    question: "Which letter is the ejective Ch (Ch')?",
    options: [
      { text: "ჩ", pronunciation: "Ch" },
      { text: "ჭ", pronunciation: "Ch'" },
      { text: "წ", pronunciation: "Ts'" },
      { text: "ც", pronunciation: "Ts" },
    ],
    answer: "ჭ",
  },
  {
    question: "Which letter makes the 'Dz' sound (like in seeds)?",
    options: [
      { text: "ძ", pronunciation: "Dz" },
      { text: "ც", pronunciation: "Ts" },
      { text: "ზ", pronunciation: "Z" },
      { text: "წ", pronunciation: "Ts'" },
    ],
    answer: "ძ",
  },
  {
    question: "Which letter is the ejective Ts (Ts')?",
    options: [
      { text: "ც", pronunciation: "Ts" },
      { text: "წ", pronunciation: "Ts'" },
      { text: "ძ", pronunciation: "Dz" },
      { text: "ჭ", pronunciation: "Ch'" },
    ],
    answer: "წ",
  },
  {
    question: "Which letter makes the 'Kh' sound (like German Bach)?",
    options: [
      { text: "ქ", pronunciation: "K" },
      { text: "ღ", pronunciation: "Gh" },
      { text: "ხ", pronunciation: "Kh" },
      { text: "ჰ", pronunciation: "H" },
    ],
    answer: "ხ",
  },
];

function ConsonantsQuiz3() {
  const navigate = useNavigate();
  const questions = useMemo(
    () => [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10),
    []
  );

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[current];

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    setShowResult(true);
    if (option === question.answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="vowel-quiz-page">
        <LearningNav
          jumpLabel="Jump to Alphabet"
          jumpPath="/letters"
          jumpState={{ jumpToFull: true }}
        />
        <h2>🎉 Alphabet Complete!</h2>

        <div className="quiz-result">
          <h3 style={{ fontSize: "3rem", margin: "1rem 0" }}>{percentage}%</h3>
          <p>You got {score} out of {questions.length} correct!</p>

          {percentage >= 80 ? (
            <p style={{ color: "#27ae60" }}>გილოცავ! (Congratulations!) You've learned all 33 Georgian letters!</p>
          ) : percentage >= 60 ? (
            <p style={{ color: "#f39c12" }}>Great effort! You know the alphabet. Keep practicing!</p>
          ) : (
            <p style={{ color: "#e74c3c" }}>Review the consonants and try again — you're almost there!</p>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="restart-button" onClick={() => window.location.reload()}>
              Retry Quiz
            </button>
            <button className="start-button" onClick={() => navigate("/letters", { state: { jumpToFull: true } })}>
              View Full Alphabet
            </button>
            <button className="start-button" onClick={() => navigate("/daily-lessons")}>
              Start Daily Lessons →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vowel-quiz-page">
      <LearningNav
        jumpLabel="Jump to Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />
      <h2>Consonants Group 3 Quiz (Final!)</h2>
      <p>Question {current + 1} of {questions.length}</p>

      <div className="quiz-card">
        {question.letter && <h3 style={{ fontSize: "4rem", margin: "0.5rem 0" }}>{question.letter}</h3>}
        <p>{question.question}</p>

        {question.options.map((opt, idx) => {
          let className = "quiz-option";
          if (showResult) {
            if (opt.text === question.answer) className += " correct";
            else if (opt.text === selected) className += " incorrect";
          }

          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleSelect(opt.text)}
              disabled={showResult}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            >
              <span>{opt.text}</span>
              {opt.pronunciation && (
                <span style={{ fontSize: "0.85rem", color: "#888" }}>({opt.pronunciation})</span>
              )}
            </button>
          );
        })}

        {showResult && (
          <div style={{ marginTop: "1.5rem" }}>
            {selected === question.answer ? (
              <p style={{ color: "#27ae60" }}>✓ Correct!</p>
            ) : (
              <p style={{ color: "#e74c3c" }}>✗ Incorrect. The answer is: {question.answer}</p>
            )}
            <button className="next-button" onClick={nextQuestion}>
              {current + 1 < questions.length ? "Next Question" : "See Results"}
            </button>
          </div>
        )}
      </div>

      <p style={{ marginTop: "1rem", color: "#888" }}>Score: {score} / {current + (showResult ? 1 : 0)}</p>
    </div>
  );
}

export default ConsonantsQuiz3;
