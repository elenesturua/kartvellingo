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

const consonantsGroup1: ConsonantData[] = [
  { letter: "ბ", latin: "B", pronunciation: "like 'b' in 'bat'", example: "ბავშვი (bavshvi)", exampleTranslation: "child" },
  { letter: "გ", latin: "G", pronunciation: "like 'g' in 'girl'", example: "გოგონა (gogona)", exampleTranslation: "girl" },
  { letter: "დ", latin: "D", pronunciation: "like 'd' in 'drums'", example: "დათვი (datvi)", exampleTranslation: "bear" },
  { letter: "ვ", latin: "V", pronunciation: "like 'v' in 'vase'", example: "ვარდი (vardi)", exampleTranslation: "rose" },
  { letter: "ზ", latin: "Z", pronunciation: "like 'z' in 'zoo'", example: "ზარი (zari)", exampleTranslation: "bell" },
  { letter: "თ", latin: "T", pronunciation: "like 't' in 'top' (aspirated)", example: "თევზი (tevzi)", exampleTranslation: "fish" },
  { letter: "კ", latin: "K'", pronunciation: "ejective 'k' (harder, from throat)", example: "კაცი (k'atsi)", exampleTranslation: "man" },
  { letter: "ლ", latin: "L", pronunciation: "like 'l' in 'love'", example: "ლომი (lomi)", exampleTranslation: "lion" },
  { letter: "მ", latin: "M", pronunciation: "like 'm' in 'mother'", example: "მამა (mama)", exampleTranslation: "father" },
  { letter: "ნ", latin: "N", pronunciation: "like 'n' in 'nice'", example: "ნიავი (niavi)", exampleTranslation: "breeze" },
];

interface ConsonantsGroup1Props {
  onFinish?: () => void;
}

function ConsonantsGroup1({ onFinish }: ConsonantsGroup1Props) {
  const [selectedLetter, setSelectedLetter] = useState<ConsonantData | null>(null);

  return (
    <div className="letters-page">
      <LearningNav
        jumpLabel="Jump to Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />

      <h2>Consonants — Group 1</h2>
      <p style={{ maxWidth: "500px", margin: "0 auto 1.5rem", color: "#666" }}>
        These 10 consonants are mostly similar to English sounds. Click on each to see examples and pronunciation.
      </p>

      <ul className="letter-list">
        {consonantsGroup1.map((item, index) => (
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
          Take Group 1 Quiz →
        </button>
      </div>
    </div>
  );
}

export default ConsonantsGroup1;
