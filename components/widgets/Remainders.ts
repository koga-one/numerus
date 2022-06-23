import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function Remainder(data: { a: Answer[]; n: number }) {
  const chosenRemainders = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 16, 24];
  let remainders = [`N's remainder by different numbers:`];

  for (let i = 0; i < chosenRemainders.length; i++) {
    remainders.push(
      `N % ${chosenRemainders[i]} = ${
        data.n % chosenRemainders[i]
      } (q = ${Math.floor(data.n / chosenRemainders[i])})`
    );
  }

  data.a.push({ state: "yes", text: remainders });
  return data;
}

async function Remainders(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(Remainder);
  await p.spawn((data) => Remainder(data));
  return p.data.a;
}

export default Remainders;
