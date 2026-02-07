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

const consonantsGroup2: ConsonantData[] = [
  { letter: "პ", latin: "P'", pronunciation: "ejective 'p' (harder, from throat)", example: "პირი (p'iri)", exampleTranslation: "mouth" },
  { letter: "ჟ", latin: "Zh", pronunciation: "like 's' in 'pleasure'", example: "ჟირაფი (zhirapi)", exampleTranslation: "giraffe" },
  { letter: "რ", latin: "R", pronunciation: "rolled/tapped 'r' (like Spanish)", example: "კარი (k'ari)", exampleTranslation: "door" },
  { letter: "ს", latin: "S", pronunciation: "like 's' in 'sun'", example: "სახლი (sakhli)", exampleTranslation: "house" },
  { letter: "ტ", latin: "T'", pronunciation: "ejective 't' (harder, from throat)", example: "ტანი (t'ani)", exampleTranslation: "body" },
  { letter: "ფ", latin: "P", pronunciation: "like 'p' in 'pen' (soft)", example: "ფული (puli)", exampleTranslation: "money" },
  { letter: "ქ", latin: "K", pronunciation: "like 'k' in 'kite' (soft)", example: "ქალი (qali)", exampleTranslation: "woman" },
  { letter: "ღ", latin: "Gh", pronunciation: "like French 'r' in 'rouge'", example: "ღამე (ghame)", exampleTranslation: "night" },
  { letter: "ყ", latin: "Q'", pronunciation: "ejective 'q' (unique Georgian sound)", example: "ყავა (q'ava)", exampleTranslation: "coffee" },
  { letter: "შ", latin: "Sh", pronunciation: "like 'sh' in 'shoe'", example: "შავი (shavi)", exampleTranslation: "black" },
];

interface ConsonantsGroup2Props {
  onFinish?: () => void;
}

function ConsonantsGroup2({ onFinish }: ConsonantsGroup2Props) {
  const [selectedLetter, setSelectedLetter] = useState<ConsonantData | null>(null);

  return (
    <div className="letters-page">
      <LearningNav
        jumpLabel="Jump to Alphabet"
        jumpPath="/letters"
        jumpState={{ jumpToFull: true }}
      />

      <h2>Consonants — Group 2</h2>
      <p style={{ maxWidth: "500px", margin: "0 auto 1.5rem", color: "#666" }}>
        This group includes more ejectives (პ, ტ, ყ) and some unique sounds. Pay attention to the apostrophe marks!
      </p>

      <ul className="letter-list">
        {consonantsGroup2.map((item, index) => (
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
          Take Group 2 Quiz →
        </button>
      </div>
    </div>
  );
}

export default ConsonantsGroup2;
