import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../Day1/Day1.css";

interface QuizQuestion {
  question: string;
  georgian?: string;
  options: string[];
  answer: string;
}

const allQuestions: QuizQuestion[] = [
  // Number recognition
  {
    question: "What number is 'ერთი'?",
    georgian: "ერთი",
    options: ["1", "2", "3", "4"],
    answer: "1",
  },
  {
    question: "What number is 'ხუთი'?",
    georgian: "ხუთი",
    options: ["4", "5", "6", "7"],
    answer: "5",
  },
  {
    question: "What number is 'ათი'?",
    georgian: "ათი",
    options: ["8", "9", "10", "11"],
    answer: "10",
  },
  {
    question: "What number is 'ოცი'?",
    georgian: "ოცი",
    options: ["12", "15", "18", "20"],
    answer: "20",
  },
  {
    question: "What number is 'თხუთმეტი'?",
    georgian: "თხუთმეტი",
    options: ["13", "14", "15", "16"],
    answer: "15",
  },
  // Reverse - Georgian for number
  {
    question: "How do you say '3' in Georgian?",
    options: ["ორი", "სამი", "ოთხი", "ხუთი"],
    answer: "სამი",
  },
  {
    question: "How do you say '7' in Georgian?",
    options: ["ექვსი", "შვიდი", "რვა", "ცხრა"],
    answer: "შვიდი",
  },
  {
    question: "How do you say '9' in Georgian?",
    options: ["რვა", "ცხრა", "ათი", "თერთმეტი"],
    answer: "ცხრა",
  },
  // Number system understanding
  {
    question: "What does 'ოცდაერთი' (otsdaerti) mean?",
    georgian: "ოცდაერთი",
    options: ["11", "12", "20", "21"],
    answer: "21",
  },
  {
    question: "How would you say 21 in Georgian? (twenty-and-one)",
    options: ["ოცდაერთი", "ერთოცი", "ოციერთ", "ოცერთი"],
    answer: "ოცდაერთი",
  },
  {
    question: "What is 'ორმოცი' (two-twenties)?",
    georgian: "ორმოცი",
    options: ["22", "30", "40", "42"],
    answer: "40",
  },
  // Age questions
  {
    question: "How do you ask 'How old are you?' in Georgian?",
    options: ["როგორ ხარ?", "რამდენი წლის ხარ?", "რა გქვია?", "საიდან ხარ?"],
    answer: "რამდენი წლის ხარ?",
  },
  {
    question: "What does 'მე ვარ ოცი წლის' mean?",
    georgian: "მე ვარ ოცი წლის",
    options: ["I am 12 years old", "I am 20 years old", "I am 21 years old", "I am 30 years old"],
    answer: "I am 20 years old",
  },
  // Time questions
  {
    question: "How do you ask 'What time is it?' in Georgian?",
    options: ["რამდენი საათია?", "რომელი საათია?", "რა დღეა?", "როდის?"],
    answer: "რომელი საათია?",
  },
  {
    question: "What does 'ოთხი საათია' mean?",
    georgian: "ოთხი საათია",
    options: ["It's three o'clock", "It's four o'clock", "It's five o'clock", "It's half past four"],
    answer: "It's four o'clock",
  },
];

function Day2Quiz() {
  const navigate = useNavigate();
  const questions = useMemo(() => 
    [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10), 
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

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="day-lesson-page">
        <div className="quiz-complete">
          <h2>🎉 Day 2 Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <p>You got {score} out of {questions.length} correct!</p>
          </div>
          
          {percentage >= 80 ? (
            <p className="score-message success">შესანიშნავი! (Excellent!) You've mastered the numbers!</p>
          ) : percentage >= 60 ? (
            <p className="score-message okay">Good progress! Review the numbers and try again.</p>
          ) : (
            <p className="score-message retry">Keep practicing! Numbers take time to memorize.</p>
          )}

          <div className="complete-actions">
            <button onClick={restartQuiz} className="nav-btn">
              Retry Quiz
            </button>
            <button onClick={() => navigate("/daily-lessons")} className="nav-btn primary">
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="day-lesson-page">
      <div className="quiz-header">
        <h2>Day 2 Quiz</h2>
        <div className="quiz-progress">
          Question {current + 1} of {questions.length}
        </div>
      </div>

      <div className="quiz-card">
        {question.georgian && (
          <div className="quiz-georgian">{question.georgian}</div>
        )}
        <p className="quiz-question">{question.question}</p>

        <div className="quiz-options">
          {question.options.map((option, idx) => {
            let className = "quiz-option";
            if (showResult) {
              if (option === question.answer) className += " correct";
              else if (option === selected) className += " incorrect";
            } else if (option === selected) {
              className += " selected";
            }

            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleSelect(option)}
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="quiz-feedback">
            {selected === question.answer ? (
              <p className="feedback correct">✓ Correct!</p>
            ) : (
              <p className="feedback incorrect">
                ✗ Incorrect. The answer is: {question.answer}
              </p>
            )}
            <button onClick={nextQuestion} className="nav-btn primary">
              {current + 1 < questions.length ? "Next Question →" : "See Results →"}
            </button>
          </div>
        )}
      </div>

      <div className="quiz-score">
        Score: {score} / {current + (showResult ? 1 : 0)}
      </div>
    </div>
  );
}

export default Day2Quiz;
