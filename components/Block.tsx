import { CSSProperties, useState } from "react";
import Line from "./Line";
import { Answer } from "./MyTypes";

type Props = {
  title: string;
  info: string;
  version: number;
  rows: number;
  func: (n: number) => Promise<Answer[]>;
  n: number;
};

const Block = ({ title, info, version, rows, func, n }: Props) => {
  const [toggled, setToggled] = useState(true);
  const toggleBlock = () => {
    setToggled(!toggled);
  };

  return (
    <div
      className={`relative overflow-auto rounded-md rounded-b-md border-2 border-t-0 border-gure  ${
        toggled ? "auto-row" : "no-auto-row"
      }`}
    >
      <style jsx>{`
        .auto-row {
          grid-row: span ${rows};
        }
        .no-auto-row {
          grid-row: span 2;
        }
      `}</style>
      <div className="bg-gure py-1">
        <div className="flex content-center">
          <h1 className="px-4 text-xl uppercase italic">
            {title}
            <span className="text-sm text-kami dark:font-black dark:text-katsu">
              {" "}
              {version}
            </span>
          </h1>
          <div className="ml-auto flex gap-1 px-1 text-sm font-black">
            <button
              className={`rounded-md text-katsu ${
                toggled ? "bg-midori" : "bg-aka"
              }`}
              onClick={toggleBlock}
            >
              <p className="px-1">{toggled ? "On" : "Off"}</p>
            </button>
          </div>
        </div>
        <div className="px-4 text-sm italic">{info}</div>
      </div>
      <div className="flex flex-col gap-2 px-4 py-2">
        {toggled && <Line func={func} n={n} />}
        {!toggled && <p className="italic text-gure">{"-"} Turned off...</p>}
      </div>
    </div>
  );
};

export default Block;
