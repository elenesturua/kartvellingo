import { useState } from "react";
import "../Day1/Day1.css";

const slides = [
  {
    title: "Welcome to Day 2!",
    content: "Today you'll master Georgian numbers, learn to ask someone's age, and tell time. These are essential for daily conversations!",
  },
  {
    title: "Numbers 1-10",
    content: "Georgian numbers have unique words for 1-10. Good news: once you learn these, the rest follow patterns! Let's start with ერთი (erti) = 1, ორი (ori) = 2, სამი (sami) = 3...",
  },
  {
    title: "Numbers 11-20",
    content: "Numbers 11-19 follow a pattern: they combine elements from the base numbers. 20 is 'ოცი' (otsi) — remember this, it's important for the Georgian number system!",
  },
  {
    title: "How Georgian Numbers Work",
    content: "After 20, Georgian uses a base-20 (vigesimal) system! Numbers are built as: twenty + and + number. So 21 = ოცდაერთი (otsdaerti) = 'twenty-and-one'",
  },
  {
    title: "The Pattern Continues",
    content: "This 'twenty-and-X' pattern applies to 40 (ორმოცი = two-twenties), 60 (სამოცი = three-twenties), and 80 (ოთხმოცი = four-twenties). It's like counting by twenties!",
  },
  {
    title: "How Old Are You?",
    content: "'რამდენი წლის ხარ?' (ramdeni ts'lis khar?) = How old are you? Answer with 'მე ვარ ... წლის' (me var ... ts'lis) = I am ... years old.",
  },
  {
    title: "Telling Time",
    content: "'რომელი საათია?' (romeli saatia?) = What time is it? Answer: 'X საათია' (X saatia) = It's X o'clock. For half past, use 'X-ის ნახევარია' (X-is nakhevaria).",
  },
  {
    title: "Let's Practice!",
    content: "Now let's review all the numbers and time expressions with flashcards, then test your knowledge!",
  },
];

interface Day2IntroProps {
  onFinish?: () => void;
}

function Day2Intro({ onFinish }: Day2IntroProps) {
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

export default Day2Intro;
