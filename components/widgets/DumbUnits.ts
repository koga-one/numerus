import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function Imperial(data: { a: Answer[]; n: number }) {
  let imperial = [
    data.n === 0
      ? "Now everything equals zero... Finally peace!"
      : "But why tf would you use the imperial units... why?! Please don't...",
  ];

  const dumbConsts: { c: number; n: string }[] = [
    { c: 56692.91, n: "twip" },
    { c: 2834.65, n: "point" },
    { c: 472.43, n: "line/poppyseed" },
    { c: 236.22, n: "pica" },
    { c: 118.11, n: "barleycorn" },
    { c: 52.63, n: "digit" },
    { c: 44.99, n: "finger" },
    { c: 39.37, n: "inch" },
    { c: 19.68, n: "stick" },
    { c: 17.5, n: "nail" },
    { c: 13.33, n: "palm" },
    { c: 9.84, n: "hand" },
    { c: 6.56, n: "shaftment" },
    { c: 4.97, n: "link" },
    { c: 4.37, n: "span" },
    { c: 3.28, n: "foot" },
    { c: 2.16, n: "cubit" },
    { c: 1.31, n: "pace" },
    { c: 1.09, n: "yard" },
    { c: 0.87, n: "ell" },
    { c: 0.66, n: "grade/step" },
    { c: 0.55, n: "fathom" },
    { c: 0.2, n: "rod" },
    { c: 0.16, n: "rope" },
    { c: 0.0497, n: "Gunter's chain" },
    { c: 0.0364, n: "shackle" },
    { c: 0.0328, n: "Ramsden's chain" },
    { c: 0.009113, n: "skein" },
    { c: 0.00539, n: "cable" },
    { c: 0.00497, n: "furlong" },
    { c: 0.0006757, n: "Roman mile" },
    { c: 0.000621, n: "mile" },
    { c: 0.0001799, n: "league" },
    { c: 0.00007594, n: "spindle" },
  ];

  dumbConsts.forEach((e) => {
    imperial.push(`= ${data.n * e.c} ${e.n}`);
  });

  data.a.push({
    state: data.n === 0 ? "yes" : "no",
    text: imperial,
  });

  return data;
}

async function DumbUnits(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(Imperial);
  await p.spawn((data) => Imperial(data));
  return p.data.a;
}

export default DumbUnits;
