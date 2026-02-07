import { useState } from "react";
import Day2Intro from "./Day2Intro";
import Day2Vocab from "./Day2Vocab";
import Day2Quiz from "./Day2Quiz";

type Step = "intro" | "vocab" | "quiz";

function Day2Flow() {
  const [step, setStep] = useState<Step>("intro");

  if (step === "intro") {
    return <Day2Intro onFinish={() => setStep("vocab")} />;
  }
  if (step === "vocab") {
    return <Day2Vocab onFinish={() => setStep("quiz")} />;
  }
  return <Day2Quiz />;
}

export default Day2Flow;
