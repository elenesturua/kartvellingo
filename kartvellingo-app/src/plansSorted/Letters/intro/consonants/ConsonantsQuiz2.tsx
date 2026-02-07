import { useState } from "react";
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
    letter: "პ",
    question: "What is the Latin (English) equivalent of letter 'პ'? (ejective)",
    options: ["P'", "P", "B", "F"],
    answer: "P'",
  },
  {
    letter: "ჟ",
    question: "What is the Latin (English) equivalent of letter 'ჟ'?",
    options: ["J", "Zh", "Sh", "Z"],
    answer: "Zh",
  },
  {
    letter: "რ",
    question: "What is the Latin (English) equivalent of letter 'რ'?",
    options: ["L", "R", "N", "M"],
    answer: "R",
  },
  {
    letter: "ს",
    question: "What is the Latin (English) equivalent of letter 'ს'?",
    options: ["Z", "Sh", "S", "Ts"],
    answer: "S",
  },
  {
    letter: "ტ",
    question: "What is the Latin (English) equivalent of letter 'ტ'? (ejective)",
    options: ["T", "T'", "D", "Th"],
    answer: "T'",
  },
  {
    letter: "ფ",
    question: "What is the Latin (English) equivalent of letter 'ფ'?",
    options: ["F", "P", "Ph", "V"],
    answer: "P",
  },
  {
    letter: "ქ",
    question: "What is the Latin (English) equivalent of letter 'ქ'?",
    options: ["Q", "K", "G", "Kh"],
    answer: "K",
  },
  {
    letter: "ღ",
    question: "What is the Latin (English) equivalent of letter 'ღ'?",
    options: ["G", "Kh", "Gh", "R"],
    answer: "Gh",
  },
  {
    letter: "ყ",
    question: "What is the Latin (English) equivalent of letter 'ყ'? (ejective)",
    options: ["K'", "Q'", "G", "Kh"],
    answer: "Q'",
  },
  {
    letter: "შ",
    question: "What is the Latin (English) equivalent of letter 'შ'?",
    options: ["S", "Zh", "Sh", "Ch"],
    answer: "Sh",
  },
];

// Phase 2: What is the pronunciation?
const pronunciationQuiz: QuizQuestion[] = [
  {
    letter: "პ",
    question: "What is the pronunciation of letter 'პ'?",
    options: ["p in pen (soft)", "ejective p (harder, from throat)", "b in bat", "f in fan"],
    answer: "ejective p (harder, from throat)",
  },
  {
    letter: "ჟ",
    question: "What is the pronunciation of letter 'ჟ'?",
    options: ["j in jam", "s in pleasure", "sh in shoe", "z in zoo"],
    answer: "s in pleasure",
  },
  {
    letter: "რ",
    question: "What is the pronunciation of letter 'რ'?",
    options: ["r in run (English)", "rolled/tapped r (like Spanish)", "l in love", "w in water"],
    answer: "rolled/tapped r (like Spanish)",
  },
  {
    letter: "ს",
    question: "What is the pronunciation of letter 'ს'?",
    options: ["z in zoo", "s in sun", "sh in shoe", "th in think"],
    answer: "s in sun",
  },
  {
    letter: "ტ",
    question: "What is the pronunciation of letter 'ტ'?",
    options: ["t in top", "ejective t (harder, from throat)", "d in dog", "th in think"],
    answer: "ejective t (harder, from throat)",
  },
  {
    letter: "ფ",
    question: "What is the pronunciation of letter 'ფ'?",
    options: ["f in fan", "p in pen (soft)", "b in bat", "v in vase"],
    answer: "p in pen (soft)",
  },
  {
    letter: "ქ",
    question: "What is the pronunciation of letter 'ქ'?",
    options: ["g in go", "k in kite (soft)", "ejective k", "ch in cheese"],
    answer: "k in kite (soft)",
  },
  {
    letter: "ღ",
    question: "What is the pronunciation of letter 'ღ'?",
    options: ["g in go", "like French r in rouge", "h in hello", "r rolled"],
    answer: "like French r in rouge",
  },
  {
    letter: "ყ",
    question: "What is the pronunciation of letter 'ყ'?",
    options: ["k in kite", "g in go", "ejective q (unique Georgian)", "ch in Bach"],
    answer: "ejective q (unique Georgian)",
  },
  {
    letter: "შ",
    question: "What is the pronunciation of letter 'შ'?",
    options: ["s in sun", "sh in shoe", "ch in cheese", "zh in pleasure"],
    answer: "sh in shoe",
  },
];

interface ConsonantsQuiz2Props {
  onFinish?: () => void;
}

function ConsonantsQuiz2({ onFinish }: ConsonantsQuiz2Props) {
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
      <h2>Consonants Group 2 Quiz</h2>
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
          <h3>Group 2 Quiz Complete!</h3>
          <p>
            Your score is: {score} out of{" "}
            {equivalenceQuiz.length + pronunciationQuiz.length}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <button className="restart-button" onClick={restartQuiz}>
              Restart Quiz
            </button>
            {onFinish && (
              <button className="next-button" onClick={onFinish}>
                Continue to Group 3 →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsonantsQuiz2;
