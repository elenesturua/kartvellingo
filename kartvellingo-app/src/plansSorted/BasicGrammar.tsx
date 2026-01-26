import "./BasicGrammar.css";

function BasicGrammar() {
  return (
    <div className="letters-page">
      <h2>Georgian Alphabet</h2>
      <p>
        Georgian grammar is quite different from English. Here are some basic rules before we dive deeper into it:

      </p>
      <ol>
        <li>1. The Georgian Language is a completely phonetic language, meaning that the pronunciation of the letters is the same as the pronunciation of the word.</li>
        <li>2. The Georgian Language has no gender. Whether refering to  a person, an animal, or an object, the pronoun and verb conjugation is the same.</li>
      </ol>

  
      <button className="start-button" onClick={() => window.history.back()}>
        ← Back to Plans
      </button>
    </div>
  );
}

export default BasicGrammar;
