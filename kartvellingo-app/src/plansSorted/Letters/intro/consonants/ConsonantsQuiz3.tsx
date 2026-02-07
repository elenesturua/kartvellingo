import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../vowels/VowelQuiz.css";
import LearningNav from "../../../../components/LearningNav.tsx";

interface QuizQuestion {
  letter: string;
  question: string;
  options: string[];
  answer: string;
}

// Phase 1: What is the Latin equivalent?
const equivalenceQuiz: QuizQuestion[] = [
  {
    letter: "ჩ",
    question: "What is the Latin (English) equivalent of letter 'ჩ'?",
    options: ["Ch", "Sh", "Ts", "J"],
    answer: "Ch",
  },
  {
    letter: "ც",
    question: "What is the Latin (English) equivalent of letter 'ც'?",
    options: ["S", "Ts", "Dz", "Ch"],
    answer: "Ts",
  },
  {
    letter: "ძ",
    question: "What is the Latin (English) equivalent of letter 'ძ'?",
    options: ["Z", "Dz", "Ts", "D"],
    answer: "Dz",
  },
  {
    letter: "წ",
    question: "What is the Latin (English) equivalent of letter 'წ'? (ejective)",
    options: ["Ts", "Ts'", "Dz", "S"],
    answer: "Ts'",
  },
  {
    letter: "ჭ",
    question: "What is the Latin (English) equivalent of letter 'ჭ'? (ejective)",
    options: ["Ch", "Ch'", "J", "Sh"],
    answer: "Ch'",
  },
  {
    letter: "ხ",
    question: "What is the Latin (English) equivalent of letter 'ხ'?",
    options: ["H", "Kh", "Gh", "K"],
    answer: "Kh",
  },
  {
    letter: "ჯ",
    question: "What is the Latin (English) equivalent of letter 'ჯ'?",
    options: ["G", "J", "Zh", "Ch"],
    answer: "J",
  },
  {
    letter: "ჰ",
    question: "What is the Latin (English) equivalent of letter 'ჰ'?",
    options: ["Kh", "H", "Gh", "Ch"],
    answer: "H",
  },
];

// Phase 2: What is the pronunciation?
const pronunciationQuiz: QuizQuestion[] = [
  {
    letter: "ჩ",
    question: "What is the pronunciation of letter 'ჩ'?",
    options: ["sh in shoe", "ch in cheese", "j in jam", "ts in cats"],
    answer: "ch in cheese",
  },
  {
    letter: "ც",
    question: "What is the pronunciation of letter 'ც'?",
    options: ["s in sun", "ts in cats", "ch in cheese", "z in zoo"],
    answer: "ts in cats",
  },
  {
    letter: "ძ",
    question: "What is the pronunciation of letter 'ძ'?",
    options: ["z in zoo", "ds in seeds", "ts in cats", "d in dog"],
    answer: "ds in seeds",
  },
  {
    letter: "წ",
    question: "What is the pronunciation of letter 'წ'?",
    options: ["ts in cats", "ejective ts (harder)", "s in sun", "z in zoo"],
    answer: "ejective ts (harder)",
  },
  {
    letter: "ჭ",
    question: "What is the pronunciation of letter 'ჭ'?",
    options: ["ch in cheese", "ejective ch (harder)", "sh in shoe", "j in jam"],
    answer: "ejective ch (harder)",
  },
  {
    letter: "ხ",
    question: "What is the pronunciation of letter 'ხ'?",
    options: ["h in hello", "ch in German Bach", "k in kite", "g in go"],
    answer: "ch in German Bach",
  },
  {
    letter: "ჯ",
    question: "What is the pronunciation of letter 'ჯ'?",
    options: ["g in go", "j in jam", "zh in pleasure", "ch in cheese"],
    answer: "j in jam",
  },
  {
    letter: "ჰ",
    question: "What is the pronunciation of letter 'ჰ'?",
    options: ["ch in Bach", "h in hello", "kh sound", "silent"],
    answer: "h in hello",
  },
];

function ConsonantsQuiz3() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"equivalence" | "pronunciation" | "done">("equivalence");
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
  const [equiv] = useState(() => shuffle(equivalenceQuiz));
  const [pron] = useState(() => shuffle(pronunciationQuiz));

  const questions = phase === "equivalence" ? equiv : pron;
  const question = questions[current];

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      if (phase === "equivalence") {
        setPhase("pronunciation");
        setCurrent(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setPhase("done");
      }
    }
  };

  const restartQuiz = () => {
    setPhase("equivalence");
    setScore(0);
    setCurrent(0);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <div className="vowel-quiz-page">
      <LearningNav
        jumpLabel="Jump to Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />
      <h2>Consonants Group 3 Quiz (Final!)</h2>
      <p>
        {phase === "equivalence" 
          ? "Part 1: Letter Recognition" 
          : phase === "pronunciation" 
            ? "Part 2: Pronunciation" 
            : ""}
      </p>

      {phase !== "done" ? (
        <div className="quiz-card">
          <h3>{question.letter}</h3>
          <p>{question.question}</p>
          {question.options.map((opt, idx) => {
            let className = "quiz-option";
            if (selectedOption) {
              if (opt === question.answer) className += " correct";
              else if (opt === selectedOption) className += " incorrect";
            }

            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </button>
            );
          })}
          {showAnswer && (
            <div>
              {selectedOption !== question.answer && (
                <p className="correct-answer">
                  Correct Answer: {question.answer}
                </p>
              )}
              <button className="next-button" onClick={nextQuestion}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-result">
          <h3>🎉 Alphabet Complete!</h3>
          <p>
            Your score is: {score} out of{" "}
            {equivalenceQuiz.length + pronunciationQuiz.length}
          </p>
          <p style={{ color: "#27ae60", marginTop: "1rem" }}>
            გილოცავ! (Congratulations!) You've completed all Georgian letters!
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <button className="restart-button" onClick={restartQuiz}>
              Restart Quiz
            </button>
            <button className="next-button" onClick={() => navigate("/letters", { state: { jumpToFull: true } })}>
              View Full Alphabet
            </button>
            <button className="start-button" onClick={() => navigate("/daily-lessons")}>
              Start Daily Lessons →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsonantsQuiz3;
