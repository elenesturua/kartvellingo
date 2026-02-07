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
    letter: "ბ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "B" }, { text: "D" }, { text: "G" }, { text: "V" }],
    answer: "B",
  },
  {
    letter: "გ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "D" }, { text: "G" }, { text: "B" }, { text: "Z" }],
    answer: "G",
  },
  {
    letter: "დ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "B" }, { text: "G" }, { text: "D" }, { text: "T" }],
    answer: "D",
  },
  {
    letter: "ვ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "W" }, { text: "V" }, { text: "U" }, { text: "F" }],
    answer: "V",
  },
  {
    letter: "ზ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "S" }, { text: "Z" }, { text: "X" }, { text: "C" }],
    answer: "Z",
  },
  {
    letter: "თ",
    question: "What is the Latin equivalent of this letter? (aspirated T)",
    options: [{ text: "T" }, { text: "D" }, { text: "P" }, { text: "K" }],
    answer: "T",
  },
  {
    letter: "კ",
    question: "What is the Latin equivalent of this letter? (ejective K)",
    options: [{ text: "K'" }, { text: "K" }, { text: "G" }, { text: "Q" }],
    answer: "K'",
  },
  {
    letter: "ლ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "L" }, { text: "R" }, { text: "I" }, { text: "J" }],
    answer: "L",
  },
  {
    letter: "მ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "N" }, { text: "W" }, { text: "M" }, { text: "H" }],
    answer: "M",
  },
  {
    letter: "ნ",
    question: "What is the Latin equivalent of this letter?",
    options: [{ text: "M" }, { text: "N" }, { text: "H" }, { text: "U" }],
    answer: "N",
  },
  // Reverse - find the Georgian letter
  {
    question: "Which letter makes the 'B' sound?",
    options: [
      { text: "ბ", pronunciation: "B" },
      { text: "დ", pronunciation: "D" },
      { text: "გ", pronunciation: "G" },
      { text: "ვ", pronunciation: "V" },
    ],
    answer: "ბ",
  },
  {
    question: "Which letter makes the 'M' sound?",
    options: [
      { text: "ნ", pronunciation: "N" },
      { text: "მ", pronunciation: "M" },
      { text: "ლ", pronunciation: "L" },
      { text: "კ", pronunciation: "K'" },
    ],
    answer: "მ",
  },
  {
    question: "Which letter is the ejective 'K' sound (K')?",
    options: [
      { text: "თ", pronunciation: "T" },
      { text: "ვ", pronunciation: "V" },
      { text: "კ", pronunciation: "K'" },
      { text: "ლ", pronunciation: "L" },
    ],
    answer: "კ",
  },
  {
    question: "Which letter makes the 'L' sound?",
    options: [
      { text: "ლ", pronunciation: "L" },
      { text: "ნ", pronunciation: "N" },
      { text: "მ", pronunciation: "M" },
      { text: "ზ", pronunciation: "Z" },
    ],
    answer: "ლ",
  },
];

interface ConsonantsQuiz1Props {
  onFinish?: () => void;
}

function ConsonantsQuiz1({ onFinish }: ConsonantsQuiz1Props) {
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
        <h2>Group 1 Quiz Complete!</h2>

        <div className="quiz-result">
          <h3 style={{ fontSize: "3rem", margin: "1rem 0" }}>{percentage}%</h3>
          <p>You got {score} out of {questions.length} correct!</p>

          {percentage >= 80 ? (
            <p style={{ color: "#27ae60" }}>შესანიშნავი! (Excellent!) Ready for Group 2!</p>
          ) : percentage >= 60 ? (
            <p style={{ color: "#f39c12" }}>Good progress! Review and continue.</p>
          ) : (
            <p style={{ color: "#e74c3c" }}>Keep practicing Group 1 before moving on.</p>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center" }}>
            <button className="restart-button" onClick={() => window.location.reload()}>
              Retry Quiz
            </button>
            <button className="start-button" onClick={handleContinue}>
              Continue to Group 2 →
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
      <h2>Consonants Group 1 Quiz</h2>
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

export default ConsonantsQuiz1;
