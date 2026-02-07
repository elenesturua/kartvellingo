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
  // Number recognition - Georgian to English
  {
    question: "What number is this?",
    georgian: "ერთი",
    georgianPronunciation: "erti",
    options: [{ text: "1" }, { text: "2" }, { text: "3" }, { text: "4" }],
    answer: "1",
  },
  {
    question: "What number is this?",
    georgian: "ხუთი",
    georgianPronunciation: "khuti",
    options: [{ text: "4" }, { text: "5" }, { text: "6" }, { text: "7" }],
    answer: "5",
  },
  {
    question: "What number is this?",
    georgian: "ათი",
    georgianPronunciation: "ati",
    options: [{ text: "8" }, { text: "9" }, { text: "10" }, { text: "11" }],
    answer: "10",
  },
  {
    question: "What number is this?",
    georgian: "ოცი",
    georgianPronunciation: "otsi",
    options: [{ text: "12" }, { text: "15" }, { text: "18" }, { text: "20" }],
    answer: "20",
  },
  {
    question: "What number is this?",
    georgian: "თხუთმეტი",
    georgianPronunciation: "tkhutmeti",
    options: [{ text: "13" }, { text: "14" }, { text: "15" }, { text: "16" }],
    answer: "15",
  },
  // English to Georgian - with transliterations
  {
    question: "How do you say '3' in Georgian?",
    options: [
      { text: "ორი", pronunciation: "ori" },
      { text: "სამი", pronunciation: "sami" },
      { text: "ოთხი", pronunciation: "otkhi" },
      { text: "ხუთი", pronunciation: "khuti" },
    ],
    answer: "სამი",
  },
  {
    question: "How do you say '7' in Georgian?",
    options: [
      { text: "ექვსი", pronunciation: "ekvsi" },
      { text: "შვიდი", pronunciation: "shvidi" },
      { text: "რვა", pronunciation: "rva" },
      { text: "ცხრა", pronunciation: "tskhra" },
    ],
    answer: "შვიდი",
  },
  {
    question: "How do you say '9' in Georgian?",
    options: [
      { text: "რვა", pronunciation: "rva" },
      { text: "ცხრა", pronunciation: "tskhra" },
      { text: "ათი", pronunciation: "ati" },
      { text: "თერთმეტი", pronunciation: "tertmeti" },
    ],
    answer: "ცხრა",
  },
  // Number system understanding
  {
    question: "What does this mean? (twenty-and-one)",
    georgian: "ოცდაერთი",
    georgianPronunciation: "otsdaerti",
    options: [{ text: "11" }, { text: "12" }, { text: "20" }, { text: "21" }],
    answer: "21",
  },
  {
    question: "How would you say 21 in Georgian? (twenty-and-one)",
    options: [
      { text: "ოცდაერთი", pronunciation: "otsdaerti" },
      { text: "ერთოცი", pronunciation: "ertotsi" },
      { text: "ოციერთ", pronunciation: "otsiert" },
      { text: "ოცერთი", pronunciation: "otserti" },
    ],
    answer: "ოცდაერთი",
  },
  {
    question: "What is 'ორმოცი' (two-twenties)?",
    georgian: "ორმოცი",
    georgianPronunciation: "ormotsi",
    options: [{ text: "22" }, { text: "30" }, { text: "40" }, { text: "42" }],
    answer: "40",
  },
  // Age questions
  {
    question: "How do you ask 'How old are you?' in Georgian?",
    options: [
      { text: "როგორ ხარ?", pronunciation: "rogor khar?" },
      { text: "რამდენი წლის ხარ?", pronunciation: "ramdeni ts'lis khar?" },
      { text: "რა გქვია?", pronunciation: "ra gkvia?" },
      { text: "საიდან ხარ?", pronunciation: "saidan khar?" },
    ],
    answer: "რამდენი წლის ხარ?",
  },
  {
    question: "What does this mean?",
    georgian: "მე ვარ ოცი წლის",
    georgianPronunciation: "me var otsi ts'lis",
    options: [
      { text: "I am 12 years old" },
      { text: "I am 20 years old" },
      { text: "I am 21 years old" },
      { text: "I am 30 years old" },
    ],
    answer: "I am 20 years old",
  },
  // Time questions
  {
    question: "How do you ask 'What time is it?' in Georgian?",
    options: [
      { text: "რამდენი საათია?", pronunciation: "ramdeni saatia?" },
      { text: "რომელი საათია?", pronunciation: "romeli saatia?" },
      { text: "რა დღეა?", pronunciation: "ra dghea?" },
      { text: "როდის?", pronunciation: "rodis?" },
    ],
    answer: "რომელი საათია?",
  },
  {
    question: "What does this mean?",
    georgian: "ოთხი საათია",
    georgianPronunciation: "otkhi saatia",
    options: [
      { text: "It's three o'clock" },
      { text: "It's four o'clock" },
      { text: "It's five o'clock" },
      { text: "It's half past four" },
    ],
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
            <p className="score-message success">შესანიშნავი! (shesanishnavi - Excellent!) You've mastered the numbers!</p>
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

export default Day2Quiz;
