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
  // Family
  {
    question: "What does 'დედა' mean?",
    georgian: "დედა",
    options: ["father", "mother", "sister", "brother"],
    answer: "mother",
  },
  {
    question: "What does 'მამა' mean? (Careful!)",
    georgian: "მამა",
    options: ["mother", "father", "grandmother", "grandfather"],
    answer: "father",
  },
  {
    question: "What does 'ძმა' mean?",
    georgian: "ძმა",
    options: ["sister", "brother", "child", "parent"],
    answer: "brother",
  },
  {
    question: "How do you say 'grandmother' in Georgian?",
    options: ["დედა", "მამა", "ბებია", "დეიდა"],
    answer: "ბებია",
  },
  {
    question: "What does 'დეიდა' mean?",
    georgian: "დეიდა",
    options: ["aunt (mother's sister)", "aunt (father's sister)", "uncle", "cousin"],
    answer: "aunt (mother's sister)",
  },
  // Possessives
  {
    question: "What does 'ჩემი' mean?",
    georgian: "ჩემი",
    options: ["your", "my/mine", "his/her", "their"],
    answer: "my/mine",
  },
  {
    question: "How do you say 'your' (informal) in Georgian?",
    options: ["ჩემი", "შენი", "მისი", "მათი"],
    answer: "შენი",
  },
  {
    question: "What does 'მისი' mean?",
    georgian: "მისი",
    options: ["my", "your", "his/her/its", "their"],
    answer: "his/her/its",
  },
  // Days
  {
    question: "What day is 'ორშაბათი'?",
    georgian: "ორშაბათი",
    options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    answer: "Monday",
  },
  {
    question: "What day is 'პარასკევი'?",
    georgian: "პარასკევი",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: "Friday",
  },
  {
    question: "How do you say 'Sunday' in Georgian?",
    options: ["შაბათი", "კვირა", "პარასკევი", "ორშაბათი"],
    answer: "კვირა",
  },
  // Months
  {
    question: "What month is 'იანვარი'?",
    georgian: "იანვარი",
    options: ["January", "February", "June", "July"],
    answer: "January",
  },
  {
    question: "How do you say 'December' in Georgian?",
    options: ["ნოემბერი", "დეკემბერი", "სექტემბერი", "ოქტომბერი"],
    answer: "დეკემბერი",
  },
  // When
  {
    question: "What does 'დღეს' mean?",
    georgian: "დღეს",
    options: ["tomorrow", "yesterday", "today", "tonight"],
    answer: "today",
  },
  {
    question: "What does 'ხვალ' mean?",
    georgian: "ხვალ",
    options: ["today", "tomorrow", "yesterday", "morning"],
    answer: "tomorrow",
  },
  // To be
  {
    question: "How do you say 'I am' in Georgian?",
    options: ["შენ ხარ", "მე ვარ", "ის არის", "ჩვენ ვართ"],
    answer: "მე ვარ",
  },
  {
    question: "What does 'შენ ხარ' mean?",
    georgian: "შენ ხარ",
    options: ["I am", "you are", "he/she is", "we are"],
    answer: "you are",
  },
  {
    question: "How do you say 'they are' in Georgian?",
    options: ["ის არის", "ჩვენ ვართ", "თქვენ ხართ", "ისინი არიან"],
    answer: "ისინი არიან",
  },
];

function Day3Quiz() {
  const navigate = useNavigate();
  const questions = useMemo(() => 
    [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 12), 
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
          <h2>🎉 Day 3 Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <p>You got {score} out of {questions.length} correct!</p>
          </div>
          
          {percentage >= 80 ? (
            <p className="score-message success">ბრავო! (Bravo!) You've completed all 3 days!</p>
          ) : percentage >= 60 ? (
            <p className="score-message okay">Good work! Review the vocabulary to improve.</p>
          ) : (
            <p className="score-message retry">This was a big lesson! Review and try again.</p>
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
        <h2>Day 3 Quiz</h2>
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

export default Day3Quiz;
