import { useState } from "react";
import "./VowelQuiz.css";
import LearningNav from "../../../../components/LearningNav.tsx";

interface QuizQuestion {
  letter: string;
  question: string;
  options: string[];
  answer: string;
}

const equivalenceQuiz: QuizQuestion[] = [
  {
    letter: "ა",
    question: "What is the Latin (English) equivalent of letter 'ა'?",
    options: ["a", "e", "i", "o"],
    answer: "a",
  },
  {
    letter: "ე",
    question: "What is the Latin (English) equivalent of letter 'ე'?",
    options: ["u", "e", "i", "o"],
    answer: "e",
  },
  {
    letter: "ი",
    question: "What is the Latin (English) equivalent of letter 'ი'?",
    options: ["a", "e", "i", "o"],
    answer: "i",
  },
  {
    letter: "ო",
    question: "What is the Latin (English) equivalent of letter 'ო'?",
    options: ["u", "e", "i", "o"],
    answer: "o",
  },
  {
    letter: "უ",
    question: "What is the Latin (English) equivalent of letter 'უ'?",
    options: ["a", "u", "i", "o"],
    answer: "u",
  },
];

const pronunciationQuiz: QuizQuestion[] = [
  {
    letter: "ა",
    question: "What is the pronunciation of letter 'ა'?",
    options: ["a in name", "a in salt", "a in scar", "a in main"],
    answer: "a in scar",
  },
  {
    letter: "ე",
    question: "What is the pronunciation of letter 'ე'?",
    options: ["e in name", "e in street", "e in end", "e in shield"],
    answer: "e in end",
  },
  {
    letter: "ი",
    question: "What is the pronunciation of letter 'ი'?",
    options: ["i in miss", "i in blind", "i in triangle", "i in mile"],
    answer: "i in miss",
  },
  {
    letter: "ო",
    question: "What is the pronunciation of letter 'ო'?",
    options: ["o in boat", "o in cool", "o in brother", "o in shoe"],
    answer: "o in boat",
  },
  {
    letter: "უ",
    question: "What is the pronunciation of letter 'უ'?",
    options: ["u in under", "u in trust", "u in mule", "oo in spoon"],
    answer: "oo in spoon",
  },
];

function VowelQuiz({
  onFinish,
  onExit: _onExit,
}: {
  onFinish?: () => void;
  onExit?: () => void;
} = {}) {
  void _onExit; // Available for future use
  const [phase, setPhase] = useState<"equivalence" | "pronunciation" | "done">(
    "equivalence",
  );
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
      <h2>Vowel Quiz</h2>
      <p>Test your knowledge of the Georgian vowels!</p>

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
          <h3>You have completed the Vowel Quiz!</h3>
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
                Continue to Consonants →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VowelQuiz;
