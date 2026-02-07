import { useState } from "react";
import "../DailyLessons.css";
import "./Day1.css";

const slides = [
  {
    title: "Welcome to Day 1!",
    content: "Today you'll learn your first Georgian conversations — greetings, introductions, and essential polite words.",
  },
  {
    title: "გამარჯობა! (Gamarjoba)",
    content: "This is the universal Georgian greeting meaning 'Hello'. Fun fact: it literally means 'victory to you' — Georgians greet each other by wishing victory!",
  },
  {
    title: "Formal vs Informal",
    content: "Georgian has formal and informal speech. 'გამარჯობა' works everywhere, but 'სალამი' (salami) is more casual — like saying 'Hi' to friends.",
  },
  {
    title: "Introducing Yourself",
    content: "'მე მქვია...' (me mkvia...) means 'My name is...'. To ask someone's name, say 'რა გქვია?' (ra gkvia?) — 'What's your name?'",
  },
  {
    title: "How Are You?",
    content: "'როგორ ხარ?' (rogor khar?) means 'How are you?'. Common responses: 'კარგად' (good), 'ისე რა' (so-so), or 'ცუდად' (bad).",
  },
  {
    title: "Yes & No",
    content: "'კი' (ki) or 'დიახ' (diakh) = Yes (informal/formal). 'არა' (ara) = No. These are essential for any conversation!",
  },
  {
    title: "Ready to Practice!",
    content: "Now let's review all the vocabulary with flashcards, then test yourself with a quiz!",
  },
];

interface Day1IntroProps {
  onFinish?: () => void;
}

function Day1Intro({ onFinish }: Day1IntroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="day-lesson-page">
      <div className="lesson-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
        <span>{currentSlide + 1} / {slides.length}</span>
      </div>

      <div className="intro-slide">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].content}</p>
      </div>

      <div className="slide-controls">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="nav-btn"
        >
          ← Back
        </button>
        {currentSlide < slides.length - 1 ? (
          <button onClick={nextSlide} className="nav-btn primary">
            Next →
          </button>
        ) : (
          <button onClick={onFinish} className="nav-btn primary">
            Continue to Vocabulary →
          </button>
        )}
      </div>
    </div>
  );
}

export default Day1Intro;
