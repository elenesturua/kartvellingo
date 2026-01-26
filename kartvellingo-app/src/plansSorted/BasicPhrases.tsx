import "./BasicPhrases.css";

interface Phrase {
  english: string;
  georgian: string;
  pronunciation: string;
  note?: string;
}

const phrases: Phrase[] = [
  { english: "Hello", georgian: "გამარჯობა", pronunciation: "gamarjoba" },
  { english: "Nice to meet you", georgian: "სასიამოვნოა", pronunciation: "sasiamovnoa" },
  { english: "Good morning!", georgian: "დილა მშვიდობისა!", pronunciation: "dila mschidobisa" },
  { english: "How are you?", georgian: "როგორ ხარ?", pronunciation: "rogor khar" },
  { english: "Thank you", georgian: "მადლობა", pronunciation: "madloba" },
  { english: "You're welcome", georgian: "არაფრის", pronunciation: "arapris" },
  { 
    english: "Yes", 
    georgian: "ჰო/კი/კაი/დიახ", 
    pronunciation: "ho/ki/kai/diakh",
    note: "There are 4 ways to say 'yes' in Georgian"
  },
  { english: "No", georgian: "არა", pronunciation: "ara" },
  { english: "Excuse me", georgian: "უკაცრავად", pronunciation: "ukatsravad" },
  { english: "Sorry", georgian: "ბოდიში", pronunciation: "bodishi" },
  { english: "I don't understand", georgian: "ვერ გავიგე", pronunciation: "ver gavige" },
  { english: "I don't know Georgian", georgian: "მე არ ვიცი ქართული", pronunciation: "me ar vitsi kartuli" },
  { english: "Do you know English?", georgian: "ინგლისური იცი?", pronunciation: "inglisuri itsi" },
  { english: "How do you say __ in Georgian?", georgian: "როგორ იქნება ქართულად __?", pronunciation: "rogor ikneba kartulad __?" },
  { english: "Where is the toilet?", georgian: "სად არის ტუალეტი?", pronunciation: "sad aris tualeti" },
  { english: "Goodbye", georgian: "ნახვამდის", pronunciation: "nakhvamdis" },
  { english: "Turn Left/Turn Right", georgian: "მარცხნივ/მარჯვნივ", pronunciation: "marjvniv/martkshinv" },
  { english: "What do you want?", georgian: "რა გინდათ?", pronunciation: "ra gindat" },
  { english: "How much does it cost?", georgian: "რა ღირს?", pronunciation: "ra ghirs" },
  { english: "One minute", georgian: "ერთი წუთით", pronunciation: "erti tsutit" },
  { english: "It was very tasty", georgian: "ძალიან გემრიელია", pronunciation: "dzalian gemrelia" },
];

function BasicPhrases() {
  return (
    <div className="phrases-page">
      <div className="phrases-header">
        <button className="start-button" onClick={() => window.history.back()}>
          ← Back to Plans
        </button>
        <h2>Basic Phrases and Words</h2>
        <p>Learn essential Georgian phrases for everyday conversations</p>
      </div>

      <div className="phrases-grid">
        {phrases.map((phrase, index) => (
          <div key={index} className="phrase-card">
            <div className="phrase-english">{phrase.english}</div>
            <div className="phrase-georgian">{phrase.georgian}</div>
            <div className="phrase-pronunciation">({phrase.pronunciation})</div>
            {phrase.note && (
              <div className="phrase-note">{phrase.note}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BasicPhrases;
