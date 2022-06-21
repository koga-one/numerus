import { useEffect, useState } from "react";
import { Answer } from "./MyTypes";

type Props = {
  answer: Promise<Answer>;
};

const Line = ({ answer }: Props) => {
  const [finalAnswer, setFinalAnswer] = useState<Answer>({
    state: "maybe",
    text: "Calculating...",
  });

  useEffect(() => {
    answer.then((result) => setFinalAnswer(result));
  }, [answer]);

  if (typeof finalAnswer.text === "string")
    return (
      <p className={`break-all k-${finalAnswer.state}`}>
        <span>{">"}</span> {finalAnswer.text}
      </p>
    );
  else return finalAnswer.text;
};

export default Line;
