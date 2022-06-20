import Line from "./Line";
import { Answer } from "./MyTypes";

type Props = {
  title: string;
  version: number;
  answers: Promise<Answer>[];
};

const Block = ({ title, version, answers }: Props) => {
  return (
    <div className="border-2 border-gure rounded-md">
      <div className="bg-gure px-4 py-1 relative">
        <h1 className="text-xl inline italic uppercase">{title}</h1>
        <p className="text-katsu font-black inline"> {version}</p>
        <button className="bg-aka absolute right-2 w-4 rounded-md h-4 bottom-1/2 translate-y-1/2"></button>
      </div>
      <div className="flex flex-col px-4 py-2 gap-1">
        {answers.map((answer) => (
          <Line answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default Block;
