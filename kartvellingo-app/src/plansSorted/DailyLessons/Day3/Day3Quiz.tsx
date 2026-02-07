import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../Day1/Day1.css";

interface QuizOption {
  text: string;
  pronunciation?: string;
}

interface QuizQuestion {
  question: string;
  georgian?: string;
  georgianPronunciation?: string;
  options: QuizOption[];
  answer: string;
}

const allQuestions: QuizQuestion[] = [
  // Family - Georgian to English
  {
    question: "What does this mean?",
    georgian: "დედა",
    georgianPronunciation: "deda",
    options: [
      { text: "father" },
      { text: "mother" },
      { text: "sister" },
      { text: "brother" },
    ],
    answer: "mother",
  },
  {
    question: "What does this mean? (Careful — it's the opposite of what you might expect!)",
    georgian: "მამა",
    georgianPronunciation: "mama",
    options: [
      { text: "mother" },
      { text: "father" },
      { text: "grandmother" },
      { text: "grandfather" },
    ],
    answer: "father",
  },
  {
    question: "What does this mean?",
    georgian: "ძმა",
    georgianPronunciation: "dzma",
    options: [
      { text: "sister" },
      { text: "brother" },
      { text: "child" },
      { text: "parent" },
    ],
    answer: "brother",
  },
  {
    question: "How do you say 'grandmother' in Georgian?",
    options: [
      { text: "დედა", pronunciation: "deda" },
      { text: "მამა", pronunciation: "mama" },
      { text: "ბებია", pronunciation: "bebia" },
      { text: "დეიდა", pronunciation: "deida" },
    ],
    answer: "ბებია",
  },
  {
    question: "What does this mean?",
    georgian: "დეიდა",
    georgianPronunciation: "deida",
    options: [
      { text: "aunt (mother's sister)" },
      { text: "aunt (father's sister)" },
      { text: "uncle" },
      { text: "cousin" },
    ],
    answer: "aunt (mother's sister)",
  },
  // Possessives
  {
    question: "What does this mean?",
    georgian: "ჩემი",
    georgianPronunciation: "chemi",
    options: [
      { text: "your" },
      { text: "my/mine" },
      { text: "his/her" },
      { text: "their" },
    ],
    answer: "my/mine",
  },
  {
    question: "How do you say 'your' (informal) in Georgian?",
    options: [
      { text: "ჩემი", pronunciation: "chemi" },
      { text: "შენი", pronunciation: "sheni" },
      { text: "მისი", pronunciation: "misi" },
      { text: "მათი", pronunciation: "mati" },
    ],
    answer: "შენი",
  },
  {
    question: "What does this mean?",
    georgian: "მისი",
    georgianPronunciation: "misi",
    options: [
      { text: "my" },
      { text: "your" },
      { text: "his/her/its" },
      { text: "their" },
    ],
    answer: "his/her/its",
  },
  // Days
  {
    question: "What day is this?",
    georgian: "ორშაბათი",
    georgianPronunciation: "orshabati",
    options: [
      { text: "Sunday" },
      { text: "Monday" },
      { text: "Tuesday" },
      { text: "Wednesday" },
    ],
    answer: "Monday",
  },
  {
    question: "What day is this?",
    georgian: "პარასკევი",
    georgianPronunciation: "p'arask'evi",
    options: [
      { text: "Thursday" },
      { text: "Friday" },
      { text: "Saturday" },
      { text: "Sunday" },
    ],
    answer: "Friday",
  },
  {
    question: "How do you say 'Sunday' in Georgian?",
    options: [
      { text: "შაბათი", pronunciation: "shabati" },
      { text: "კვირა", pronunciation: "k'vira" },
      { text: "პარასკევი", pronunciation: "p'arask'evi" },
      { text: "ორშაბათი", pronunciation: "orshabati" },
    ],
    answer: "კვირა",
  },
  // Months
  {
    question: "What month is this?",
    georgian: "იანვარი",
    georgianPronunciation: "ianvari",
    options: [
      { text: "January" },
      { text: "February" },
      { text: "June" },
      { text: "July" },
    ],
    answer: "January",
  },
  {
    question: "How do you say 'December' in Georgian?",
    options: [
      { text: "ნოემბერი", pronunciation: "noemberi" },
      { text: "დეკემბერი", pronunciation: "dek'emberi" },
      { text: "სექტემბერი", pronunciation: "sekt'emberi" },
      { text: "ოქტომბერი", pronunciation: "okt'omberi" },
    ],
    answer: "დეკემბერი",
  },
  // When
  {
    question: "What does this mean?",
    georgian: "დღეს",
    georgianPronunciation: "dghes",
    options: [
      { text: "tomorrow" },
      { text: "yesterday" },
      { text: "today" },
      { text: "tonight" },
    ],
    answer: "today",
  },
  {
    question: "What does this mean?",
    georgian: "ხვალ",
    georgianPronunciation: "khval",
    options: [
      { text: "today" },
      { text: "tomorrow" },
      { text: "yesterday" },
      { text: "morning" },
    ],
    answer: "tomorrow",
  },
  // To be
  {
    question: "How do you say 'I am' in Georgian?",
    options: [
      { text: "შენ ხარ", pronunciation: "shen khar" },
      { text: "მე ვარ", pronunciation: "me var" },
      { text: "ის არის", pronunciation: "is aris" },
      { text: "ჩვენ ვართ", pronunciation: "chven vart" },
    ],
    answer: "მე ვარ",
  },
  {
    question: "What does this mean?",
    georgian: "შენ ხარ",
    georgianPronunciation: "shen khar",
    options: [
      { text: "I am" },
      { text: "you are" },
      { text: "he/she is" },
      { text: "we are" },
    ],
    answer: "you are",
  },
  {
    question: "How do you say 'they are' in Georgian?",
    options: [
      { text: "ის არის", pronunciation: "is aris" },
      { text: "ჩვენ ვართ", pronunciation: "chven vart" },
      { text: "თქვენ ხართ", pronunciation: "tkven khart" },
      { text: "ისინი არიან", pronunciation: "isini arian" },
    ],
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
            <p className="score-message success">ბრავო! (bravo!) You've completed all 3 days!</p>
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

export default Day3Quiz;
