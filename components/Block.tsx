import { useState } from "react";
import Line from "./Line";
import { Answer } from "./MyTypes";

type Props = {
  title: string;
  version: number;
  func: (n: number) => Promise<Answer[]>;
  n: number;
};

const Block = ({ title, version, func, n }: Props) => {
  const [toggled, setToggled] = useState(true);

  const toggleBlock = () => {
    setToggled(!toggled);
  };

  return (
    <div
      className={`border-2 min-h-[20rem] border-gure rounded-md ${
        !toggled && "order-1"
      }`}
    >
      <div className="bg-gure px-4 py-1 relative">
        <h1 className="text-xl inline italic uppercase">{title}</h1>
        <p className="text-katsu font-black inline"> {version}</p>
        {toggled && (
          <button
            className="bg-midori absolute right-2 w-4 rounded-md h-4 bottom-1/2 translate-y-1/2"
            onClick={toggleBlock}
          ></button>
        )}
        {!toggled && (
          <button
            className="bg-aka absolute right-2 w-4 rounded-md h-4 bottom-1/2 translate-y-1/2"
            onClick={toggleBlock}
          ></button>
        )}
      </div>
      <div className="flex flex-col px-4 py-2 gap-2">
        {toggled && <Line func={func} n={n} />}
        {!toggled && <p className="italic text-gure">{"-"} Turned off...</p>}
      </div>
    </div>
  );
};

export default Block;
