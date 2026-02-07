import { useState } from "react";
import Day1Intro from "./Day1Intro";
import Day1Vocab from "./Day1Vocab";
import Day1Quiz from "./Day1Quiz";

type Step = "intro" | "vocab" | "quiz";

function Day1Flow() {
  const [step, setStep] = useState<Step>("intro");

  if (step === "intro") {
    return <Day1Intro onFinish={() => setStep("vocab")} />;
  }
  if (step === "vocab") {
    return <Day1Vocab onFinish={() => setStep("quiz")} />;
  }
  return <Day1Quiz />;
}

export default Day1Flow;
