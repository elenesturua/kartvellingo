import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Day1.css";

interface QuizOption {
  text: string;
  pronunciation?: string; // For Georgian text options
}

interface QuizQuestion {
  question: string;
  questionPronunciation?: string; // For Georgian in question
  georgian?: string;
  georgianPronunciation?: string;
  options: QuizOption[];
  answer: string;
}

const allQuestions: QuizQuestion[] = [
  // Translation questions - Georgian to English
  {
    question: "What does 'გამარჯობა' mean?",
    georgian: "გამარჯობა",
    georgianPronunciation: "gamarjoba",
    options: [
      { text: "Goodbye" },
      { text: "Hello" },
      { text: "Thank you" },
      { text: "Yes" },
    ],
    answer: "Hello",
  },
  {
    question: "What does 'მადლობა' mean?",
    georgian: "მადლობა",
    georgianPronunciation: "madloba",
    options: [
      { text: "Hello" },
      { text: "Goodbye" },
      { text: "Thank you" },
      { text: "Please" },
    ],
    answer: "Thank you",
  },
  {
    question: "What does 'ნახვამდის' mean?",
    georgian: "ნახვამდის",
    georgianPronunciation: "nakhvamdis",
    options: [
      { text: "Hello" },
      { text: "Goodbye" },
      { text: "Good morning" },
      { text: "Good night" },
    ],
    answer: "Goodbye",
  },
  {
    question: "What does 'როგორ ხარ?' mean?",
    georgian: "როგორ ხარ?",
    georgianPronunciation: "rogor khar?",
    options: [
      { text: "What's your name?" },
      { text: "Where are you from?" },
      { text: "How are you?" },
      { text: "How old are you?" },
    ],
    answer: "How are you?",
  },
  {
    question: "What does 'რა გქვია?' mean?",
    georgian: "რა გქვია?",
    georgianPronunciation: "ra gkvia?",
    options: [
      { text: "How are you?" },
      { text: "What's your name?" },
      { text: "Where are you from?" },
      { text: "What's up?" },
    ],
    answer: "What's your name?",
  },
  {
    question: "What does 'საიდან ხარ?' mean?",
    georgian: "საიდან ხარ?",
    georgianPronunciation: "saidan khar?",
    options: [
      { text: "How are you?" },
      { text: "What's your name?" },
      { text: "Where are you from?" },
      { text: "How old are you?" },
    ],
    answer: "Where are you from?",
  },
  // English to Georgian questions - with transliterations
  {
    question: "How do you say 'Yes' informally in Georgian?",
    options: [
      { text: "არა", pronunciation: "ara" },
      { text: "კი", pronunciation: "ki" },
      { text: "დიახ", pronunciation: "diakh" },
      { text: "კარგად", pronunciation: "k'argad" },
    ],
    answer: "კი",
  },
  {
    question: "How do you say 'No' in Georgian?",
    options: [
      { text: "კი", pronunciation: "ki" },
      { text: "დიახ", pronunciation: "diakh" },
      { text: "არა", pronunciation: "ara" },
      { text: "ისე რა", pronunciation: "ise ra" },
    ],
    answer: "არა",
  },
  {
    question: "How do you say 'Good morning' in Georgian?",
    options: [
      { text: "ღამე მშვიდობისა", pronunciation: "ghame mshvidobisa" },
      { text: "დილა მშვიდობისა", pronunciation: "dila mshvidobisa" },
      { text: "ნახვამდის", pronunciation: "nakhvamdis" },
      { text: "გამარჯობა", pronunciation: "gamarjoba" },
    ],
    answer: "დილა მშვიდობისა",
  },
  {
    question: "What's the informal way to say 'Hi' in Georgian?",
    options: [
      { text: "გამარჯობა", pronunciation: "gamarjoba" },
      { text: "სალამი", pronunciation: "salami" },
      { text: "დიახ", pronunciation: "diakh" },
      { text: "მადლობა", pronunciation: "madloba" },
    ],
    answer: "სალამი",
  },
  // Response questions
  {
    question: "Someone asks 'როგორ ხარ?' (rogor khar?) — how would you say 'Good'?",
    options: [
      { text: "ცუდად", pronunciation: "tsudad" },
      { text: "ისე რა", pronunciation: "ise ra" },
      { text: "კარგად", pronunciation: "k'argad" },
      { text: "მადლობა", pronunciation: "madloba" },
    ],
    answer: "კარგად",
  },
  {
    question: "Someone asks 'როგორ ხარ?' (rogor khar?) — how would you say 'So-so'?",
    options: [
      { text: "კარგად", pronunciation: "k'argad" },
      { text: "ცუდად", pronunciation: "tsudad" },
      { text: "ისე რა", pronunciation: "ise ra" },
      { text: "არა", pronunciation: "ara" },
    ],
    answer: "ისე რა",
  },
  {
    question: "What does 'მე' mean?",
    georgian: "მე",
    georgianPronunciation: "me",
    options: [
      { text: "You" },
      { text: "He/She" },
      { text: "I/Me" },
      { text: "They" },
    ],
    answer: "I/Me",
  },
  {
    question: "What does 'შენ' mean?",
    georgian: "შენ",
    georgianPronunciation: "shen",
    options: [
      { text: "I" },
      { text: "You (informal)" },
      { text: "We" },
      { text: "They" },
    ],
    answer: "You (informal)",
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
            <p className="score-message success">გილოცავ! (gilotsav - Congratulations!) Great job!</p>
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
          <div className="quiz-georgian">
            {question.georgian}
            {question.georgianPronunciation && (
              <span className="quiz-pronunciation">({question.georgianPronunciation})</span>
            )}
          </div>
        )}
        <p className="quiz-question">{question.question}</p>

        <div className="quiz-options">
          {question.options.map((option, idx) => {
            let className = "quiz-option";
            if (showResult) {
              if (option.text === question.answer) className += " correct";
              else if (option.text === selected) className += " incorrect";
            } else if (option.text === selected) {
              className += " selected";
            }

            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleSelect(option.text)}
                disabled={showResult}
              >
                <span className="option-text">{option.text}</span>
                {option.pronunciation && (
                  <span className="option-pronunciation">({option.pronunciation})</span>
                )}
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
