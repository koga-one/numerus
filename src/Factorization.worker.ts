import { Answer } from "../components/MyTypes";

let storedPrimes: number[] = [2, 3];

function IsPrime(n: number) {
  let sqrt = Math.sqrt(n);
  for (let i = 0; i < storedPrimes.length; i++) {
    if (n % storedPrimes[i] === 0) return false;
    else if (storedPrimes[i] > sqrt) return true;
  }
  return true;
}

function FindNextPrime() {
  let pp = storedPrimes[storedPrimes.length - 1] + 2;
  while (true) {
    if (IsPrime(pp)) {
      storedPrimes.push(pp);
      break;
    } else pp += 2;
  }
}

async function FindFactorization(n: number) {
  if (n === 0 || n === 1 || n === -1)
    return {
      state: "no",
      text: "N has no factorization!",
    } as Answer;

  let i = 0;
  let pow = 0;
  let factorization: string[] = [];

  while (n > 1) {
    while (n % storedPrimes[i] === 0) {
      pow++;
      n /= storedPrimes[i];
    }

    if (pow > 0) factorization.push(`${storedPrimes[i]}^${pow}`);
    pow = 0;
    i++;

    // Check if we need to find the next prime
    if (storedPrimes.length <= i) FindNextPrime();
  }

  return {
    state: "yes",
    text: factorization.reduce((acc, cur) => acc + ` * ${cur}`),
  } as Answer;
}

self.onmessage = async (event) => {
  console.log("received" + event.data.n);

  await FindFactorization(event.data.n).then((result) => {
    self.postMessage(result);
  });
};
