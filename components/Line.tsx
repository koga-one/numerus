import { useEffect, useState } from "react";
import { Answer } from "./MyTypes";

type Props = {
  func: (n: number) => Promise<Answer[]>;
  n: number;
};

const Line = ({ func, n }: Props) => {
  const [finalAnswers, setFinalAnswers] = useState<Answer[]>([
    {
      state: "maybe",
      text: "Calculating...",
    },
  ]);

  useEffect(() => {
    if (!isNaN(n)) {
      setFinalAnswers([
        {
          state: "maybe",
          text: "Calculating...",
        },
      ]);
      const trigger = async () => {
        const data = await func(n);
        setFinalAnswers(data);
      };

      trigger().catch((err) => console.log(err));
    }
  }, [n, func]);

  return (
    <div>
      {finalAnswers.map((finalAnswer, index) => (
        <ul key={index} className={`mb-1 k-${finalAnswer.state}`}>
          {!Array.isArray(finalAnswer.text) && (
            <li>
              <p className="break-all">
                <span className="font-black"></span> {finalAnswer.text}
              </p>
            </li>
          )}
          {Array.isArray(finalAnswer.text) &&
            finalAnswer.text.map((line, index) => (
              <li key={index}>
                <p className="break-all">
                  <span className="font-black"></span> {line}
                </p>
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
};

export default Line;
