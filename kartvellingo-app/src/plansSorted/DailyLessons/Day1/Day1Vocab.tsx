import { useState } from "react";
import "./Day1.css";

interface VocabItem {
  georgian: string;
  pronunciation: string;
  english: string;
  category: string;
}

const vocabulary: VocabItem[] = [
  // Greetings
  { georgian: "გამარჯობა", pronunciation: "gamarjoba", english: "Hello (formal/universal)", category: "Greetings" },
  { georgian: "სალამი", pronunciation: "salami", english: "Hi (informal)", category: "Greetings" },
  { georgian: "ნახვამდის", pronunciation: "nakhvamdis", english: "Goodbye", category: "Greetings" },
  { georgian: "კარგად", pronunciation: "k'argad", english: "Bye / Take care", category: "Greetings" },
  { georgian: "დილა მშვიდობისა", pronunciation: "dila mshvidobisa", english: "Good morning", category: "Greetings" },
  { georgian: "ღამე მშვიდობისა", pronunciation: "ghame mshvidobisa", english: "Good night (farewell)", category: "Greetings" },
  { georgian: "ძილი ნებისა", pronunciation: "dzili nebisa", english: "Good night (going to sleep)", category: "Greetings" },
  
  // Names & Introductions
  { georgian: "მე მქვია...", pronunciation: "me mkvia...", english: "My name is...", category: "Names" },
  { georgian: "რა გქვია?", pronunciation: "ra gkvia?", english: "What's your name?", category: "Names" },
  
  // How are you
  { georgian: "როგორ ხარ?", pronunciation: "rogor khar?", english: "How are you?", category: "How are you" },
  { georgian: "კარგად", pronunciation: "k'argad", english: "Good", category: "How are you" },
  { georgian: "ისე რა", pronunciation: "ise ra", english: "So-so", category: "How are you" },
  { georgian: "ცუდად", pronunciation: "tsudad", english: "Bad", category: "How are you" },
  { georgian: "კარგად, შენ?", pronunciation: "k'argad, shen?", english: "Good, you?", category: "How are you" },
  { georgian: "რას შვრები?", pronunciation: "ras shvrebi?", english: "What's up?", category: "How are you" },
  
  // Where are you from
  { georgian: "საიდან ხარ?", pronunciation: "saidan khar?", english: "Where are you from?", category: "Origin" },
  { georgian: "მე...დან ვარ", pronunciation: "me...-dan var", english: "I'm from...", category: "Origin" },
  { georgian: "მე ამერიკიდან ვარ", pronunciation: "me amerikidan var", english: "I'm from the USA", category: "Origin" },
  { georgian: "მე საქართველოდან ვარ", pronunciation: "me sakartvelodan var", english: "I'm from Georgia", category: "Origin" },
  
  // Polite words
  { georgian: "მადლობა", pronunciation: "madloba", english: "Thank you", category: "Polite" },
  { georgian: "ძალიან", pronunciation: "dzalian", english: "Very", category: "Polite" },
  
  // Pronouns
  { georgian: "მე", pronunciation: "me", english: "I / me", category: "Pronouns" },
  { georgian: "შენ", pronunciation: "shen", english: "You (informal)", category: "Pronouns" },
  { georgian: "ის", pronunciation: "is", english: "He / She / It", category: "Pronouns" },
  { georgian: "ჩვენ", pronunciation: "chven", english: "We / Us", category: "Pronouns" },
  { georgian: "თქვენ", pronunciation: "tkven", english: "You (formal/plural)", category: "Pronouns" },
  { georgian: "ისინი", pronunciation: "isini", english: "They", category: "Pronouns" },
  
  // Yes/No
  { georgian: "კი", pronunciation: "ki", english: "Yes (informal)", category: "Yes/No" },
  { georgian: "დიახ", pronunciation: "diakh", english: "Yes (formal)", category: "Yes/No" },
  { georgian: "არა", pronunciation: "ara", english: "No", category: "Yes/No" },
];

interface Day1VocabProps {
  onFinish?: () => void;
}

function Day1Vocab({ onFinish }: Day1VocabProps) {
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
        <h2>Day 1 Vocabulary</h2>
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

export default Day1Vocab;
