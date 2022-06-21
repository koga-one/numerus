import { Answer } from "../MyTypes";

async function DigitCount(n: number) {
  const count = n >= 0 ? n.toString().length : n.toString().length - 1;

  return {
    state: "yes",
    text: `It has ${count} ${count > 1 ? "digits:" : "digit:"}`,
  } as Answer;
}

async function AmountPerDigit(n: number, d: number) {
  const amount = n.toString().split(d.toString()).length - 1;

  return {
    state: amount === 0 ? "meh" : "yes",
    text: `${d} appears ${amount} ${amount > 1 ? "times" : "time"}`,
  } as Answer;
}

function Amounts(n: number) {
  let answers: Promise<Answer>[] = [DigitCount(n)];

  for (let i = 0; i <= 9; i++) {
    answers.push(AmountPerDigit(n, i));
  }

  return answers;
}

export default Amounts;
