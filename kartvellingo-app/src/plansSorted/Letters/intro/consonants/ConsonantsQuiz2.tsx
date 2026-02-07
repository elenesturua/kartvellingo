import { useState, useMemo } from "react";
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
    letter: "პ",
    question: "What is the Latin equivalent of this letter? (ejective P)",
    options: [{ text: "P'" }, { text: "P" }, { text: "B" }, { text: "T'" }],
    answer: "P'",
  },
  {
    letter: "ჟ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "J" }, { text: "Zh" }, { text: "Sh" }, { text: "Ch" }],
    answer: "Zh",
  },
  {
    letter: "რ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "L" }, { text: "R" }, { text: "N" }, { text: "M" }],
    answer: "R",
  },
  {
    letter: "ს",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "Z" }, { text: "C" }, { text: "S" }, { text: "X" }],
    answer: "S",
  },
  {
    letter: "ტ",
    question: "What is the Latin equivalent of this letter? (ejective T)",
    options: [{ text: "T" }, { text: "D" }, { text: "T'" }, { text: "P'" }],
    answer: "T'",
  },
  {
    letter: "ფ",
    question: "What is the Latin equivalent of this letter? (soft P)",
    options: [{ text: "P'" }, { text: "P" }, { text: "F" }, { text: "Ph" }],
    answer: "P",
  },
  {
    letter: "ქ",
    question: "What is the Latin equivalent of this letter? (soft K)",
    options: [{ text: "K'" }, { text: "K" }, { text: "Q" }, { text: "G" }],
    answer: "K",
  },
  {
    letter: "ღ",
    question: "What is the Latin equivalent of this letter? (French R sound)",
    options: [{ text: "R" }, { text: "Gh" }, { text: "G" }, { text: "Kh" }],
    answer: "Gh",
  },
  {
    letter: "ყ",
    question: "What is the Latin equivalent of this letter? (unique ejective)",
    options: [{ text: "K'" }, { text: "Q'" }, { text: "G" }, { text: "Kh" }],
    answer: "Q'",
  },
  {
    letter: "შ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "S" }, { text: "Sh" }, { text: "Ch" }, { text: "Zh" }],
    answer: "Sh",
  },
  // Reverse - find the Georgian letter
  {
    question: "Which letter makes the 'Sh' sound?",
    options: [
      { text: "ს", pronunciation: "S" },
      { text: "შ", pronunciation: "Sh" },
      { text: "ჟ", pronunciation: "Zh" },
      { text: "ჩ", pronunciation: "Ch" },
    ],
    answer: "შ",
  },
  {
    question: "Which letter is the ejective P (P')?",
    options: [
      { text: "ფ", pronunciation: "P" },
      { text: "პ", pronunciation: "P'" },
      { text: "ბ", pronunciation: "B" },
      { text: "ტ", pronunciation: "T'" },
    ],
    answer: "პ",
  },
  {
    question: "Which letter makes the 'Gh' sound (like French R)?",
    options: [
      { text: "გ", pronunciation: "G" },
      { text: "ღ", pronunciation: "Gh" },
      { text: "ყ", pronunciation: "Q'" },
      { text: "ქ", pronunciation: "K" },
    ],
    answer: "ღ",
  },
  {
    question: "Which letter is the soft K (not ejective)?",
    options: [
      { text: "კ", pronunciation: "K'" },
      { text: "ქ", pronunciation: "K" },
      { text: "გ", pronunciation: "G" },
      { text: "ყ", pronunciation: "Q'" },
    ],
    answer: "ქ",
  },
  // Ejective vs non-ejective distinction
  {
    question: "Which letter pair shows: ejective T vs soft T?",
    options: [
      { text: "ტ vs თ", pronunciation: "T' vs T" },
      { text: "თ vs დ", pronunciation: "T vs D" },
      { text: "პ vs ფ", pronunciation: "P' vs P" },
      { text: "კ vs ქ", pronunciation: "K' vs K" },
    ],
    answer: "ტ vs თ",
  },
];

interface ConsonantsQuiz2Props {
  onFinish?: () => void;
}

function ConsonantsQuiz2({ onFinish }: ConsonantsQuiz2Props) {
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

  const handleContinue = () => {
    if (onFinish) onFinish();
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
        <h2>Group 2 Quiz Complete!</h2>

        <div className="quiz-result">
          <h3 style={{ fontSize: "3rem", margin: "1rem 0" }}>{percentage}%</h3>
          <p>You got {score} out of {questions.length} correct!</p>

          {percentage >= 80 ? (
            <p style={{ color: "#27ae60" }}>შესანიშნავი! (Excellent!) Ready for the final group!</p>
          ) : percentage >= 60 ? (
            <p style={{ color: "#f39c12" }}>Good progress! The ejectives are tricky. Keep going!</p>
          ) : (
            <p style={{ color: "#e74c3c" }}>Practice makes perfect! Review Group 2 again.</p>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
            <button className="restart-button" onClick={() => window.location.reload()}>
              Retry Quiz
            </button>
            <button className="start-button" onClick={handleContinue}>
              Continue to Group 3 →
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
      <h2>Consonants Group 2 Quiz</h2>
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

export default ConsonantsQuiz2;
