import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function SingleConversion(data: { a: Answer[]; n: number }) {
  const chosenBases = [2, 3, 4, 5, 6, 7, 8, 9, 12, 16, 20, 32];
  let conversions = [`N in ${chosenBases.length} different bases:`];

  for (let i = 0; i < chosenBases.length; i++) {
    conversions.push(
      `${data.n.toString(chosenBases[i])} in base ${chosenBases[i]}`
    );
  }

  data.a.push({ state: "yes", text: conversions });
  return data;
}

async function Conversion(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(SingleConversion);
  await p.spawn((data) => SingleConversion(data));
  return p.data.a;
}

export default Conversion;
