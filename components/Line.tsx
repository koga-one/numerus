import { useCallback, useEffect, useState } from "react";
import { Answer } from "./MyTypes";

type Props = {
  file: string;
  n: number;
};

const Line = ({ file, n }: Props) => {
  const [finalAnswer, setFinalAnswer] = useState<Answer>({
    state: "maybe",
    text: "",
  });

  useEffect(() => {
    const worker: Worker = new Worker(`./workers/${file}`);
    worker.postMessage(n);
    worker.onmessage = (event: MessageEvent) => {
      setFinalAnswer(event.data);
      console.log("hey!");
    };
    console.log(worker);
  }, [n]);

  // const postMessage = useCallback(() => {

  // }, [worker]);

  return (
    <ul className={`k-${finalAnswer.state}`}>
      {!Array.isArray(finalAnswer.text) && (
        <li>
          <p className="break-all">
            <span></span> {finalAnswer.text}
          </p>
        </li>
      )}
      {Array.isArray(finalAnswer.text) &&
        finalAnswer.text.map((line) => (
          <li>
            <p className="break-all">
              <span></span> {line}
            </p>
          </li>
        ))}
    </ul>
  );
};

export default Line;
