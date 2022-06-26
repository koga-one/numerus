import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function Powers(data: { a: Answer[]; n: number }) {
  let multis = ["Multiplications:"];

  for (let i = 2; i <= 9; i++) {
    multis.push(`N * ${i} = ${data.n * i}`);
  }

  data.a.push({
    state: "yes",
    text: multis,
  });
  data.a.push({
    state: "yes",
    text: [
      "Powers of N:",
      `Square: ${data.n * data.n}`,
      `Cube: ${data.n * data.n * data.n}`,
    ],
  });
  data.a.push({
    state: "yes",
    text: [
      "Roots of N:",
      `Square root: ${Math.sqrt(data.n)}`,
      `Cube root: ${Math.cbrt(data.n)}`,
    ],
  });
  if (data.n <= 100) {
    let f = 1;
    for (let i = 1; i <= data.n; i++) f *= i;
    data.a.push({
      state: "yes",
      text: `N!: ${f}`,
    });
  } else {
    data.a.push({
      state: "no",
      text: `Can't calculate N! because it is too big`,
    });
  }
  return data;
}

async function Operations(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(Powers);
  await p.spawn((data) => Powers(data));
  return p.data.a;
}

export default Operations;
