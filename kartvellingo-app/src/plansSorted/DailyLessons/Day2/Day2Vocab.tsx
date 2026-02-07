import { useState } from "react";
import "../Day1/Day1.css";

interface VocabItem {
  georgian: string;
  pronunciation: string;
  english: string;
  category: string;
}

const vocabulary: VocabItem[] = [
  // Numbers 1-10
  { georgian: "ერთი", pronunciation: "erti", english: "1 (one)", category: "Numbers 1-10" },
  { georgian: "ორი", pronunciation: "ori", english: "2 (two)", category: "Numbers 1-10" },
  { georgian: "სამი", pronunciation: "sami", english: "3 (three)", category: "Numbers 1-10" },
  { georgian: "ოთხი", pronunciation: "otkhi", english: "4 (four)", category: "Numbers 1-10" },
  { georgian: "ხუთი", pronunciation: "khuti", english: "5 (five)", category: "Numbers 1-10" },
  { georgian: "ექვსი", pronunciation: "ekvsi", english: "6 (six)", category: "Numbers 1-10" },
  { georgian: "შვიდი", pronunciation: "shvidi", english: "7 (seven)", category: "Numbers 1-10" },
  { georgian: "რვა", pronunciation: "rva", english: "8 (eight)", category: "Numbers 1-10" },
  { georgian: "ცხრა", pronunciation: "tskhra", english: "9 (nine)", category: "Numbers 1-10" },
  { georgian: "ათი", pronunciation: "ati", english: "10 (ten)", category: "Numbers 1-10" },
  
  // Numbers 11-20
  { georgian: "თერთმეტი", pronunciation: "tertmeti", english: "11 (eleven)", category: "Numbers 11-20" },
  { georgian: "თორმეტი", pronunciation: "tormeti", english: "12 (twelve)", category: "Numbers 11-20" },
  { georgian: "ცამეტი", pronunciation: "tsameti", english: "13 (thirteen)", category: "Numbers 11-20" },
  { georgian: "თოთხმეტი", pronunciation: "totkhmeti", english: "14 (fourteen)", category: "Numbers 11-20" },
  { georgian: "თხუთმეტი", pronunciation: "tkhutmeti", english: "15 (fifteen)", category: "Numbers 11-20" },
  { georgian: "თექვსმეტი", pronunciation: "tekvsmeti", english: "16 (sixteen)", category: "Numbers 11-20" },
  { georgian: "ჩვიდმეტი", pronunciation: "chvidmeti", english: "17 (seventeen)", category: "Numbers 11-20" },
  { georgian: "თვრამეტი", pronunciation: "tvrameti", english: "18 (eighteen)", category: "Numbers 11-20" },
  { georgian: "ცხრამეტი", pronunciation: "tskhrameti", english: "19 (nineteen)", category: "Numbers 11-20" },
  { georgian: "ოცი", pronunciation: "otsi", english: "20 (twenty)", category: "Numbers 11-20" },
  
  // Example compound numbers
  { georgian: "ოცდაერთი", pronunciation: "otsdaerti", english: "21 (twenty-and-one)", category: "Compound" },
  { georgian: "ოცდაათი", pronunciation: "otsdaati", english: "30 (twenty-and-ten)", category: "Compound" },
  { georgian: "ორმოცი", pronunciation: "ormotsi", english: "40 (two-twenties)", category: "Compound" },
  
  // Age
  { georgian: "რამდენი წლის ხარ?", pronunciation: "ramdeni ts'lis khar?", english: "How old are you?", category: "Age" },
  { georgian: "მე ვარ ... წლის", pronunciation: "me var ... ts'lis", english: "I am ... years old", category: "Age" },
  { georgian: "მე ვარ ოცი წლის", pronunciation: "me var otsi ts'lis", english: "I am 20 years old", category: "Age" },
  { georgian: "მე ვარ ოცდაერთი წლის", pronunciation: "me var otsdaerti ts'lis", english: "I am 21 years old", category: "Age" },
  
  // Time
  { georgian: "რომელი საათია?", pronunciation: "romeli saatia?", english: "What time is it?", category: "Time" },
  { georgian: "ერთი საათია", pronunciation: "erti saatia", english: "It's one o'clock", category: "Time" },
  { georgian: "ორი საათია", pronunciation: "ori saatia", english: "It's two o'clock", category: "Time" },
  { georgian: "ოთხი საათია", pronunciation: "otkhi saatia", english: "It's four o'clock", category: "Time" },
  { georgian: "...ის ნახევარია", pronunciation: "...-is nakhevaria", english: "It's half past ...", category: "Time" },
  { georgian: "პირველი საათია", pronunciation: "pirveli saatia", english: "It's one o'clock (ordinal)", category: "Time" },
];

interface Day2VocabProps {
  onFinish?: () => void;
}

function Day2Vocab({ onFinish }: Day2VocabProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...new Set(vocabulary.map(v => v.category))];
  const filteredVocab = filter === "All" ? vocabulary : vocabulary.filter(v => v.category === filter);
  const current = filteredVocab[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredVocab.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
    }, 150);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="day-lesson-page">
      <div className="vocab-header">
        <h2>Day 2 Vocabulary</h2>
        <p>Click the card to flip it. Learn all {vocabulary.length} words!</p>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flashcard-container">
        <div 
          className={`flashcard ${isFlipped ? "flipped" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-front">
            <span className="card-category">{current.category}</span>
            <div className="card-georgian">{current.georgian}</div>
            <div className="card-pronunciation">({current.pronunciation})</div>
            <span className="flip-hint">Click to reveal</span>
          </div>
          <div className="flashcard-back">
            <span className="card-category">{current.category}</span>
            <div className="card-english">{current.english}</div>
            <div className="card-georgian-small">{current.georgian}</div>
            <span className="flip-hint">Click to flip back</span>
          </div>
        </div>
      </div>

      <div className="card-progress">
        {currentIndex + 1} / {filteredVocab.length}
      </div>

      <div className="vocab-controls">
        <button onClick={prevCard} className="nav-btn">
          ← Previous
        </button>
        <button onClick={nextCard} className="nav-btn">
          Next →
        </button>
      </div>

      <div className="vocab-footer">
        <button onClick={onFinish} className="nav-btn primary">
          Ready for Quiz →
        </button>
      </div>
    </div>
  );
}

export default Day2Vocab;
