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
    letter: "ბ",
    question: "What is the Latin (English) equivalent of letter 'ბ'?",
    options: ["B", "D", "G", "V"],
    answer: "B",
  },
  {
    letter: "გ",
    question: "What is the Latin (English) equivalent of letter 'გ'?",
    options: ["D", "G", "B", "Z"],
    answer: "G",
  },
  {
    letter: "დ",
    question: "What is the Latin (English) equivalent of letter 'დ'?",
    options: ["B", "G", "D", "T"],
    answer: "D",
  },
  {
    letter: "ვ",
    question: "What is the Latin (English) equivalent of letter 'ვ'?",
    options: ["W", "V", "U", "F"],
    answer: "V",
  },
  {
    letter: "ზ",
    question: "What is the Latin (English) equivalent of letter 'ზ'?",
    options: ["S", "Z", "X", "C"],
    answer: "Z",
  },
  {
    letter: "თ",
    question: "What is the Latin (English) equivalent of letter 'თ'?",
    options: ["T", "D", "P", "K"],
    answer: "T",
  },
  {
    letter: "კ",
    question: "What is the Latin (English) equivalent of letter 'კ'? (ejective)",
    options: ["K'", "K", "G", "Q"],
    answer: "K'",
  },
  {
    letter: "ლ",
    question: "What is the Latin (English) equivalent of letter 'ლ'?",
    options: ["L", "R", "I", "J"],
    answer: "L",
  },
  {
    letter: "მ",
    question: "What is the Latin (English) equivalent of letter 'მ'?",
    options: ["N", "W", "M", "H"],
    answer: "M",
  },
  {
    letter: "ნ",
    question: "What is the Latin (English) equivalent of letter 'ნ'?",
    options: ["M", "N", "H", "U"],
    answer: "N",
  },
];

// Phase 2: What is the pronunciation?
const pronunciationQuiz: QuizQuestion[] = [
  {
    letter: "ბ",
    question: "What is the pronunciation of letter 'ბ'?",
    options: ["b in bat", "p in pat", "d in dog", "v in vase"],
    answer: "b in bat",
  },
  {
    letter: "გ",
    question: "What is the pronunciation of letter 'გ'?",
    options: ["g in girl", "k in kite", "j in jam", "d in dog"],
    answer: "g in girl",
  },
  {
    letter: "დ",
    question: "What is the pronunciation of letter 'დ'?",
    options: ["t in top", "d in drums", "b in bat", "g in go"],
    answer: "d in drums",
  },
  {
    letter: "ვ",
    question: "What is the pronunciation of letter 'ვ'?",
    options: ["w in water", "v in vase", "f in fan", "b in bat"],
    answer: "v in vase",
  },
  {
    letter: "ზ",
    question: "What is the pronunciation of letter 'ზ'?",
    options: ["s in sun", "z in zoo", "sh in ship", "th in this"],
    answer: "z in zoo",
  },
  {
    letter: "თ",
    question: "What is the pronunciation of letter 'თ'?",
    options: ["t in top (aspirated)", "d in dog", "th in think", "k in kite"],
    answer: "t in top (aspirated)",
  },
  {
    letter: "კ",
    question: "What is the pronunciation of letter 'კ'?",
    options: ["k in kite", "ejective k (harder, from throat)", "g in go", "c in cat"],
    answer: "ejective k (harder, from throat)",
  },
  {
    letter: "ლ",
    question: "What is the pronunciation of letter 'ლ'?",
    options: ["r in run", "l in love", "n in no", "y in yes"],
    answer: "l in love",
  },
  {
    letter: "მ",
    question: "What is the pronunciation of letter 'მ'?",
    options: ["n in no", "m in mother", "b in bat", "w in water"],
    answer: "m in mother",
  },
  {
    letter: "ნ",
    question: "What is the pronunciation of letter 'ნ'?",
    options: ["m in mother", "n in nice", "l in love", "r in run"],
    answer: "n in nice",
  },
];

interface ConsonantsQuiz1Props {
  onFinish?: () => void;
}

function ConsonantsQuiz1({ onFinish }: ConsonantsQuiz1Props) {
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
      <h2>Consonants Group 1 Quiz</h2>
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
          <h3>Group 1 Quiz Complete!</h3>
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
                Continue to Group 2 →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsonantsQuiz1;
