import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function AmountPerDigit(data: { a: Answer[]; n: number }) {
  const count =
    data.n >= 0 ? data.n.toString().length : data.n.toString().length - 1;
  let amounts = [`${count} ${count > 1 ? "digits:" : "digit:"}`];
  for (let i = 0; i <= 9; i++) {
    const amount = data.n.toString().split(i.toString()).length - 1;
    if (amount > 0)
      amounts.push(
        `${i} appears ${data.n.toString().split(i.toString()).length - 1}x`
      );
  }

  data.a.push({ state: "yes", text: amounts });
  return data;
}

function MultiDigits(data: { a: Answer[]; n: number }) {
  data.a.push({
    state: "yes",
    text: `Product of digits: ${String(data.n)
      .split("")
      .reduce((acc, curr) => {
        return acc * Number(curr);
      }, 1)}`,
  });
  return data;
}

function SumDigits(data: { a: Answer[]; n: number }) {
  data.a.push({
    state: "yes",
    text: `Sum of digits: ${String(data.n)
      .split("")
      .reduce((acc, curr) => {
        return acc + Number(curr);
      }, 0)}`,
  });
  return data;
}

async function Digits(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(SumDigits);
  p.require(MultiDigits);
  p.require(AmountPerDigit);
  await p.spawn((data) => AmountPerDigit(data));
  await p.spawn((data) => SumDigits(data));
  await p.spawn((data) => MultiDigits(data));
  return p.data.a;
}

export default Digits;
