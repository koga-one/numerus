import { useEffect, useState } from "react";
import { Answer } from "./MyTypes";

type Props = {
  answer: Promise<Answer>;
};

const Line = ({ answer }: Props) => {
  const [finalAnswer, setFinalAnswer] = useState<Answer>({} as Answer);

  useEffect(() => {
    answer.then((result) => setFinalAnswer(result));
  }, [answer]);

  return (
    <p>
      <span>{">"}</span> {finalAnswer.text}
    </p>
  );
};

export default Line;
