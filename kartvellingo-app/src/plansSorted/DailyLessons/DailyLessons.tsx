import { useNavigate } from "react-router-dom";
import "./DailyLessons.css";

interface DayInfo {
  day: number;
  title: string;
  description: string;
  topics: string[];
  route: string;
}

const days: DayInfo[] = [
  {
    day: 1,
    title: "First Conversations",
    description: "Learn greetings, introductions, and polite expressions",
    topics: ["Greetings", "Names", "How are you?", "Where are you from?", "Yes/No"],
    route: "/daily-lessons/day1",
  },
  {
    day: 2,
    title: "Numbers & Time",
    description: "Master Georgian numbers and learn to tell time and age",
    topics: ["Numbers 1-20", "How numbers work", "Asking age", "Telling time"],
    route: "/daily-lessons/day2",
  },
  {
    day: 3,
    title: "Family & Calendar",
    description: "Talk about family, possessions, days, and months",
    topics: ["Family members", "Possessives", "Days of week", "Months", "Verb 'to be'"],
    route: "/daily-lessons/day3",
  },
];

function DailyLessons() {
  const navigate = useNavigate();

  return (
    <div className="daily-lessons-page">
      <div className="daily-lessons-header">
        <button className="back-button" onClick={() => navigate("/plans")}>
          ← Back to Plans
        </button>
        <h1>Daily Lessons</h1>
        <p>Follow along with structured lessons to build your Georgian skills day by day</p>
      </div>

      <div className="days-grid">
        {days.map((day) => (
          <div
            key={day.day}
            className="day-card"
            onClick={() => navigate(day.route)}
          >
            <div className="day-number">Day {day.day}</div>
            <h2>{day.title}</h2>
            <p>{day.description}</p>
            <div className="day-topics">
              {day.topics.map((topic, idx) => (
                <span key={idx} className="topic-tag">{topic}</span>
              ))}
            </div>
            <button className="start-day-button">Start Lesson →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyLessons;
