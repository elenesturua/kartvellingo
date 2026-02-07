import { useState } from "react";
import "../../Letters.css";
import LearningNav from "../../../../components/LearningNav.tsx";

interface ConsonantData {
  letter: string;
  latin: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
}

const consonantsGroup3: ConsonantData[] = [
  { letter: "ჩ", latin: "Ch", pronunciation: "like 'ch' in 'cheese'", example: "ჩანთა (chanta)", exampleTranslation: "bag" },
  { letter: "ც", latin: "Ts", pronunciation: "like 'ts' in 'cats'", example: "ცოლი (tsoli)", exampleTranslation: "wife" },
  { letter: "ძ", latin: "Dz", pronunciation: "like 'ds' in 'seeds'", example: "ძმა (dzma)", exampleTranslation: "brother" },
  { letter: "წ", latin: "Ts'", pronunciation: "ejective 'ts' (harder)", example: "წელი (ts'eli)", exampleTranslation: "year" },
  { letter: "ჭ", latin: "Ch'", pronunciation: "ejective 'ch' (harder)", example: "საჭმელი (sach'meli)", exampleTranslation: "food" },
  { letter: "ხ", latin: "Kh", pronunciation: "like 'ch' in German 'Bach'", example: "ხელი (kheli)", exampleTranslation: "hand" },
  { letter: "ჯ", latin: "J", pronunciation: "like 'j' in 'jam'", example: "ჯამი (jami)", exampleTranslation: "bowl" },
  { letter: "ჰ", latin: "H", pronunciation: "like 'h' in 'hello'", example: "ჰაერი (haeri)", exampleTranslation: "air" },
];

interface ConsonantsGroup3Props {
  onFinish?: () => void;
}

function ConsonantsGroup3({ onFinish }: ConsonantsGroup3Props) {
  const [selectedLetter, setSelectedLetter] = useState<ConsonantData | null>(null);

  return (
    <div className="letters-page">
      <LearningNav
        jumpLabel="Jump to Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />

      <h2>Consonants — Group 3 (Final!)</h2>
      <p style={{ maxWidth: "500px", margin: "0 auto 1.5rem", color: "#666" }}>
        The last 8 consonants! This group includes affricates (ჩ, ც, ძ, წ, ჭ, ჯ) — sounds that combine two consonants into one.
      </p>

      <ul className="letter-list">
        {consonantsGroup3.map((item, index) => (
          <li key={index} onClick={() => setSelectedLetter(item)}>
            <span style={{ fontSize: "1.5rem" }}>{item.letter}</span>
            <span style={{ fontSize: "0.9rem", color: "#888" }}> — {item.latin}</span>
          </li>
        ))}
      </ul>

      {selectedLetter && (
        <div className="letter-modal" onClick={() => setSelectedLetter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-letter">{selectedLetter.letter}</div>
            <div className="modal-latin">{selectedLetter.latin}</div>
            <p>
              <strong>Pronunciation:</strong> {selectedLetter.pronunciation}
            </p>
            <p>
              <strong>Example:</strong> {selectedLetter.example}
            </p>
            <p>
              <strong>Meaning:</strong> {selectedLetter.exampleTranslation}
            </p>
            <button
              className="close-button"
              onClick={() => setSelectedLetter(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="start-section">
        <button className="start-button" onClick={onFinish}>
          Take Final Quiz →
        </button>
      </div>
    </div>
  );
}

export default ConsonantsGroup3;
