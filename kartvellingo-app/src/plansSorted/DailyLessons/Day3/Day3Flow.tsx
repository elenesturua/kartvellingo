import { useState } from "react";
import Day3Intro from "./Day3Intro";
import Day3Vocab from "./Day3Vocab";
import Day3Quiz from "./Day3Quiz";

type Step = "intro" | "vocab" | "quiz";

function Day3Flow() {
  const [step, setStep] = useState<Step>("intro");

  if (step === "intro") {
    return <Day3Intro onFinish={() => setStep("vocab")} />;
  }
  if (step === "vocab") {
    return <Day3Vocab onFinish={() => setStep("quiz")} />;
  }
  return <Day3Quiz />;
}

export default Day3Flow;
