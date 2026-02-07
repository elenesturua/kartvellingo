import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Day1.css";

interface QuizQuestion {
  question: string;
  georgian?: string;
  options: string[];
  answer: string;
  type: "translate" | "meaning" | "response";
}

const allQuestions: QuizQuestion[] = [
  // Translation questions
  {
    question: "What does 'გამარჯობა' mean?",
    georgian: "გამარჯობა",
    options: ["Goodbye", "Hello", "Thank you", "Yes"],
    answer: "Hello",
    type: "translate",
  },
  {
    question: "What does 'მადლობა' mean?",
    georgian: "მადლობა",
    options: ["Hello", "Goodbye", "Thank you", "Please"],
    answer: "Thank you",
    type: "translate",
  },
  {
    question: "What does 'ნახვამდის' mean?",
    georgian: "ნახვამდის",
    options: ["Hello", "Goodbye", "Good morning", "Good night"],
    answer: "Goodbye",
    type: "translate",
  },
  {
    question: "What does 'როგორ ხარ?' mean?",
    georgian: "როგორ ხარ?",
    options: ["What's your name?", "Where are you from?", "How are you?", "How old are you?"],
    answer: "How are you?",
    type: "translate",
  },
  {
    question: "What does 'რა გქვია?' mean?",
    georgian: "რა გქვია?",
    options: ["How are you?", "What's your name?", "Where are you from?", "What's up?"],
    answer: "What's your name?",
    type: "translate",
  },
  {
    question: "What does 'საიდან ხარ?' mean?",
    georgian: "საიდან ხარ?",
    options: ["How are you?", "What's your name?", "Where are you from?", "How old are you?"],
    answer: "Where are you from?",
    type: "translate",
  },
  // Meaning questions
  {
    question: "How do you say 'Yes' informally in Georgian?",
    options: ["არა", "კი", "დიახ", "კარგად"],
    answer: "კი",
    type: "meaning",
  },
  {
    question: "How do you say 'No' in Georgian?",
    options: ["კი", "დიახ", "არა", "ისე რა"],
    answer: "არა",
    type: "meaning",
  },
  {
    question: "How do you say 'Good morning' in Georgian?",
    options: ["ღამე მშვიდობისა", "დილა მშვიდობისა", "ნახვამდის", "გამარჯობა"],
    answer: "დილა მშვიდობისა",
    type: "meaning",
  },
  {
    question: "What's the informal way to say 'Hi' in Georgian?",
    options: ["გამარჯობა", "სალამი", "დიახ", "მადლობა"],
    answer: "სალამი",
    type: "meaning",
  },
  // Response questions
  {
    question: "Someone asks 'როგორ ხარ?' — how would you say 'Good'?",
    options: ["ცუდად", "ისე რა", "კარგად", "მადლობა"],
    answer: "კარგად",
    type: "response",
  },
  {
    question: "Someone asks 'როგორ ხარ?' — how would you say 'So-so'?",
    options: ["კარგად", "ცუდად", "ისე რა", "არა"],
    answer: "ისე რა",
    type: "response",
  },
  {
    question: "What does 'მე' mean?",
    options: ["You", "He/She", "I/Me", "They"],
    answer: "I/Me",
    type: "translate",
  },
  {
    question: "What does 'შენ' mean?",
    options: ["I", "You (informal)", "We", "They"],
    answer: "You (informal)",
    type: "translate",
  },
];

function Day1Quiz() {
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
          <h2>🎉 Day 1 Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <p>You got {score} out of {questions.length} correct!</p>
          </div>
          
          {percentage >= 80 ? (
            <p className="score-message success">გილოცავ! (Congratulations!) Great job!</p>
          ) : percentage >= 60 ? (
            <p className="score-message okay">Good effort! Review the vocabulary and try again.</p>
          ) : (
            <p className="score-message retry">Keep practicing! Review the vocabulary cards.</p>
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
        <h2>Day 1 Quiz</h2>
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

export default Day1Quiz;
