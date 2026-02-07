import { useState } from "react";
import "../Day1/Day1.css";

const slides = [
  {
    title: "Welcome to Day 3!",
    content: "Today you'll learn family vocabulary, possessive pronouns, days of the week, months, and the essential verb 'to be'. Let's build on what you've learned!",
  },
  {
    title: "Family Members",
    content: "'დედა' (deda) = mother, 'მამა' (mama) = father, 'ძმა' (dzma) = brother, 'და' (da) = sister. Notice how 'mama' means father in Georgian — the opposite of many languages!",
  },
  {
    title: "Cousins in Georgian",
    content: "Georgian doesn't have one word for 'cousin'. Instead, it's literally 'aunt/uncle + child'. For example: 'მამიდაშვილი' (mamidashvili) = father's sister's child!",
  },
  {
    title: "Possessive Pronouns",
    content: "'ჩემი' (chemi) = my/mine, 'შენი' (sheni) = your/yours, 'მისი' (misi) = his/her. You can say 'ჩემი დედა' OR 'დედაჩემი' — both mean 'my mother'!",
  },
  {
    title: "Days of the Week",
    content: "Most Georgian weekdays are numbered! Monday = 'ორშაბათი' (second-day), Tuesday = 'სამშაბათი' (third-day)... but Friday 'პარასკევი' and Sunday 'კვირა' are unique.",
  },
  {
    title: "Months",
    content: "Good news: Georgian months sound similar to English! 'იანვარი' (January), 'თებერვალი' (February)... The endings change when saying dates though.",
  },
  {
    title: "The Verb 'To Be'",
    content: "'მე ვარ' (I am), 'შენ ხარ' (you are), 'ის არის' (he/she is). Fun tip: Georgians often drop 'არის' and add 'ა' to the word before it. 'დღეს სამშაბათია' = Today is Tuesday!",
  },
  {
    title: "Let's Practice!",
    content: "This is a lot of vocabulary! Let's review with flashcards and then test your knowledge with a quiz.",
  },
];

interface Day3IntroProps {
  onFinish?: () => void;
}

function Day3Intro({ onFinish }: Day3IntroProps) {
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

export default Day3Intro;
