import { CSSProperties, useState } from "react";
import Line from "./Line";
import { Answer } from "./MyTypes";

type Props = {
  title: string;
  version: number;
  rows: number;
  func: (n: number) => Promise<Answer[]>;
  n: number;
};

const Block = ({ title, version, rows, func, n }: Props) => {
  const [toggled, setToggled] = useState(true);

  const toggleBlock = () => {
    setToggled(!toggled);
  };

  return (
    <div className="overflow-auto rounded-md border-2 border-gure">
      <style jsx>{`
        div {
          grid-row: span ${rows};
        }
      `}</style>
      <div className="relative bg-gure px-4 py-1">
        <h1 className="inline text-xl uppercase italic">{title}</h1>
        <p className="inline text-kami dark:font-black dark:text-katsu">
          {" "}
          {version}
        </p>
        {toggled && (
          <button
            className="absolute right-2 bottom-1/2 h-4 w-4 translate-y-1/2 rounded-md bg-midori"
            onClick={toggleBlock}
          ></button>
        )}
        {!toggled && (
          <button
            className="absolute right-2 bottom-1/2 h-4 w-4 translate-y-1/2 rounded-md bg-aka"
            onClick={toggleBlock}
          ></button>
        )}
      </div>
      <div className="flex flex-col gap-2 px-4 py-2">
        {toggled && <Line func={func} n={n} />}
        {!toggled && <p className="italic text-gure">{"-"} Turned off...</p>}
      </div>
    </div>
  );
};

export default Block;
