import { Answer } from "../../components/MyTypes";

const minMax = { min: 2, max: 9 };

async function Remainder(n: number) {
  let remainders = [`N's remainder by ${minMax.min} through ${minMax.max}:`];

  for (let i = minMax.min; i <= minMax.max; i++) {
    remainders.push(`N % ${i} = ${n % i} (q = ${Math.floor(n / i)})`);
  }

  return {
    state: "yes",
    text: remainders,
  } as Answer;
}

self.onmessage = async (event) => {
  await Remainder(event.data.n).then((result) => {
    postMessage(result);
  });
};
