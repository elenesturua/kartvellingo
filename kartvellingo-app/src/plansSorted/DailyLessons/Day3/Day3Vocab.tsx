import { useState } from "react";
import "../Day1/Day1.css";

interface VocabItem {
  georgian: string;
  pronunciation: string;
  english: string;
  category: string;
}

const vocabulary: VocabItem[] = [
  // Family
  { georgian: "დედა", pronunciation: "deda", english: "mother", category: "Family" },
  { georgian: "მამა", pronunciation: "mama", english: "father", category: "Family" },
  { georgian: "ძმა", pronunciation: "dzma", english: "brother", category: "Family" },
  { georgian: "და", pronunciation: "da", english: "sister", category: "Family" },
  { georgian: "შვილი", pronunciation: "shvili", english: "child", category: "Family" },
  { georgian: "მშობელი", pronunciation: "mshobeli", english: "parent", category: "Family" },
  { georgian: "მშობლები", pronunciation: "mshoblebi", english: "parents", category: "Family" },
  { georgian: "ბებია", pronunciation: "bebia", english: "grandmother", category: "Family" },
  { georgian: "ბაბუა / პაპა", pronunciation: "babua / p'ap'a", english: "grandfather", category: "Family" },
  { georgian: "მამიდა", pronunciation: "mamida", english: "aunt (father's sister)", category: "Family" },
  { georgian: "დეიდა", pronunciation: "deida", english: "aunt (mother's sister)", category: "Family" },
  { georgian: "ბიძა", pronunciation: "bidza", english: "uncle", category: "Family" },
  
  // Possessives
  { georgian: "ჩემი", pronunciation: "chemi", english: "my / mine", category: "Possessives" },
  { georgian: "შენი", pronunciation: "sheni", english: "your / yours (informal)", category: "Possessives" },
  { georgian: "მისი", pronunciation: "misi", english: "his / her / its", category: "Possessives" },
  { georgian: "ჩვენი", pronunciation: "chveni", english: "our / ours", category: "Possessives" },
  { georgian: "თქვენი", pronunciation: "tkveni", english: "your / yours (formal/plural)", category: "Possessives" },
  { georgian: "მათი", pronunciation: "mati", english: "their / theirs", category: "Possessives" },
  
  // When
  { georgian: "როდის?", pronunciation: "rodis?", english: "when?", category: "When" },
  { georgian: "დღეს", pronunciation: "dghes", english: "today", category: "When" },
  { georgian: "ხვალ", pronunciation: "khval", english: "tomorrow", category: "When" },
  { georgian: "გუშინ", pronunciation: "gushin", english: "yesterday", category: "When" },
  { georgian: "დილას", pronunciation: "dilas", english: "in the morning", category: "When" },
  { georgian: "საღამოს", pronunciation: "saghamos", english: "in the evening", category: "When" },
  { georgian: "ამაღამ", pronunciation: "amagham", english: "tonight", category: "When" },
  
  // Days of the week
  { georgian: "ორშაბათი", pronunciation: "orshabati", english: "Monday", category: "Days" },
  { georgian: "სამშაბათი", pronunciation: "samshabati", english: "Tuesday", category: "Days" },
  { georgian: "ოთხშაბათი", pronunciation: "otkhshabati", english: "Wednesday", category: "Days" },
  { georgian: "ხუთშაბათი", pronunciation: "khutshabati", english: "Thursday", category: "Days" },
  { georgian: "პარასკევი", pronunciation: "p'arask'evi", english: "Friday", category: "Days" },
  { georgian: "შაბათი", pronunciation: "shabati", english: "Saturday", category: "Days" },
  { georgian: "კვირა", pronunciation: "k'vira", english: "Sunday", category: "Days" },
  
  // Months
  { georgian: "იანვარი", pronunciation: "ianvari", english: "January", category: "Months" },
  { georgian: "თებერვალი", pronunciation: "tebervali", english: "February", category: "Months" },
  { georgian: "მარტი", pronunciation: "mart'i", english: "March", category: "Months" },
  { georgian: "აპრილი", pronunciation: "ap'rili", english: "April", category: "Months" },
  { georgian: "მაისი", pronunciation: "maisi", english: "May", category: "Months" },
  { georgian: "ივნისი", pronunciation: "ivnisi", english: "June", category: "Months" },
  { georgian: "ივლისი", pronunciation: "ivlisi", english: "July", category: "Months" },
  { georgian: "აგვისტო", pronunciation: "agvist'o", english: "August", category: "Months" },
  { georgian: "სექტემბერი", pronunciation: "sekt'emberi", english: "September", category: "Months" },
  { georgian: "ოქტომბერი", pronunciation: "okt'omberi", english: "October", category: "Months" },
  { georgian: "ნოემბერი", pronunciation: "noemberi", english: "November", category: "Months" },
  { georgian: "დეკემბერი", pronunciation: "dek'emberi", english: "December", category: "Months" },
  
  // To be
  { georgian: "მე ვარ", pronunciation: "me var", english: "I am", category: "To Be" },
  { georgian: "შენ ხარ", pronunciation: "shen khar", english: "you are (informal)", category: "To Be" },
  { georgian: "ის არის", pronunciation: "is aris", english: "he/she/it is", category: "To Be" },
  { georgian: "ჩვენ ვართ", pronunciation: "chven vart", english: "we are", category: "To Be" },
  { georgian: "თქვენ ხართ", pronunciation: "tkven khart", english: "you are (formal/plural)", category: "To Be" },
  { georgian: "ისინი არიან", pronunciation: "isini arian", english: "they are", category: "To Be" },
];

interface Day3VocabProps {
  onFinish?: () => void;
}

function Day3Vocab({ onFinish }: Day3VocabProps) {
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
        <h2>Day 3 Vocabulary</h2>
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

export default Day3Vocab;
