import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LettersIntro from "./LettersIntro";
import Vowels from "./vowels/Vowels";
import VowelQuiz from "./vowels/VowelQuiz";
import ConsonantsIntro from "./consonants/ConsonantsIntro";
import ConsonantsGroup1 from "./consonants/ConsonantsGroup1";
import ConsonantsQuiz1 from "./consonants/ConsonantsQuiz1";
import ConsonantsGroup2 from "./consonants/ConsonantsGroup2";
import ConsonantsQuiz2 from "./consonants/ConsonantsQuiz2";
import ConsonantsGroup3 from "./consonants/ConsonantsGroup3";
import ConsonantsQuiz3 from "./consonants/ConsonantsQuiz3";

type Step = 
  | "intro" 
  | "vowels" 
  | "vowelQuiz" 
  | "consonantsIntro"
  | "consonants1"
  | "consonantsQuiz1"
  | "consonants2"
  | "consonantsQuiz2"
  | "consonants3"
  | "consonantsQuiz3"
  | "done";

function LettersIntroFlow() {
  const [step, setStep] = useState<Step>("intro");
  const navigate = useNavigate();

  useEffect(() => {
    if (step === "done") {
      localStorage.setItem("lettersIntroCompleted", "true");
      navigate("/letters", { state: { jumpToFull: true } });
    }
  }, [step, navigate]);

  // Vowels section
  if (step === "intro")
    return <LettersIntro onExit={() => setStep("done")} onFinish={() => setStep("vowels")} />;
  if (step === "vowels")
    return <Vowels onExit={() => setStep("done")} onFinish={() => setStep("vowelQuiz")} />;
  if (step === "vowelQuiz")
    return <VowelQuiz onExit={() => setStep("done")} onFinish={() => setStep("consonantsIntro")} />;
  
  // Consonants section
  if (step === "consonantsIntro")
    return <ConsonantsIntro onFinish={() => setStep("consonants1")} />;
  if (step === "consonants1")
    return <ConsonantsGroup1 onFinish={() => setStep("consonantsQuiz1")} />;
  if (step === "consonantsQuiz1")
    return <ConsonantsQuiz1 onFinish={() => setStep("consonants2")} />;
  if (step === "consonants2")
    return <ConsonantsGroup2 onFinish={() => setStep("consonantsQuiz2")} />;
  if (step === "consonantsQuiz2")
    return <ConsonantsQuiz2 onFinish={() => setStep("consonants3")} />;
  if (step === "consonants3")
    return <ConsonantsGroup3 onFinish={() => setStep("consonantsQuiz3")} />;
  if (step === "consonantsQuiz3")
    return <ConsonantsQuiz3 />;

  return null;
}

export default LettersIntroFlow;
