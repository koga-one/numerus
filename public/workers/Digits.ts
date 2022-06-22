import { Answer } from "../../components/MyTypes";

async function AmountPerDigit(n: number) {
  const count = n >= 0 ? n.toString().length : n.toString().length - 1;
  let amounts = [`${count} ${count > 1 ? "digits:" : "digit:"}`];
  for (let i = 0; i <= 9; i++) {
    const amount = n.toString().split(i.toString()).length - 1;
    if (amount > 0)
      amounts.push(
        `${i} appears ${n.toString().split(i.toString()).length - 1}x`
      );
  }

  return {
    state: "yes",
    text: amounts,
  } as Answer;
}

async function MultiDigits(n: number) {
  return {
    state: "yes",
    text: `Product of digits: ${String(n)
      .split("")
      .reduce((acc, curr) => {
        return acc * Number(curr);
      }, 1)}`,
  } as Answer;
}

async function SumDigits(n: number) {
  return {
    state: "yes",
    text: `Sum of digits: ${String(n)
      .split("")
      .reduce((acc, curr) => {
        return acc + Number(curr);
      }, 0)}`,
  } as Answer;
}

self.onmessage = async (event) => {
  await SumDigits(event.data.n).then((result) => {
    self.postMessage(result);
  });

  await MultiDigits(event.data.n).then((result) => {
    self.postMessage(result);
  });

  await AmountPerDigit(event.data.n).then((result) => {
    self.postMessage(result);
  });
};
