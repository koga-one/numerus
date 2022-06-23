import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

// function FindFactorization(data: { a: Answer[]; n: number }) {
//   let storedPrimes: number[] = [2, 3];

//   function IsPrime(n: number) {
//     let sqrt = Math.sqrt(n);
//     for (let i = 0; i < storedPrimes.length; i++) {
//       if (n % storedPrimes[i] === 0) return false;
//       else if (storedPrimes[i] > sqrt) return true;
//     }
//     return true;
//   }

//   function FindNextPrime() {
//     let pp = storedPrimes[storedPrimes.length - 1] + 2;
//     while (true) {
//       if (IsPrime(pp)) {
//         storedPrimes.push(pp);
//         break;
//       } else pp += 2;
//     }
//   }

//   if (data.n === 0 || data.n === 1 || data.n === -1) {
//     data.a.push({
//       state: "no",
//       text: "N has no factorization!",
//     });

//     return data;
//   }

//   let i = 0;
//   let pow = 0;
//   let factorization: string[] = [];

//   while (data.n > 1) {
//     while (data.n % storedPrimes[i] === 0) {
//       pow++;
//       data.n /= storedPrimes[i];
//     }

//     if (pow > 0) factorization.push(`${storedPrimes[i]}^${pow}`);
//     pow = 0;
//     i++;

//     // Check if we need to find the next prime
//     if (storedPrimes.length <= i) FindNextPrime();
//   }

//   data.a.push({
//     state: "yes",
//     text: factorization.reduce((acc, cur) => acc + ` * ${cur}`),
//   });
//   return data;
// }

function FindFactorization(data: { a: Answer[]; n: number }): {
  a: Answer[];
  n: number;
} {
  if (isNaN(data.n) || !isFinite(data.n) || data.n % 1 !== 0 || data.n === 0) {
    data.a.push({ state: "no", text: "It has no factorization!" });
    return data;
  }
  if (data.n < 0) {
    data.n = -data.n;
    return FindFactorization(data);
  }

  let factors = [`Factorization of N:`];
  let rawPows = [];

  while (data.n > 1) {
    const minFactor = SmallestFactor(data.n);
    let pow = 1;
    data.n /= minFactor;
    while (minFactor === SmallestFactor(data.n)) {
      pow++;
      data.n /= minFactor;
    }
    rawPows.push(pow);
    factors.push(`${minFactor}^${pow}`);
  }

  data.a.push({
    state: "yes",
    text: `It has ${rawPows.reduce((acc, cur) => acc * (cur + 1), 1)} divisors`,
  });
  data.a.push({
    state: "yes",
    text: `It has ${rawPows.length} prime divisors`,
  });
  data.a.push({
    state: "yes",
    text: `It is a perfect root by ${findGCD(rawPows)}`,
  });
  data.a.push({ state: "yes", text: factors });
  return data;
}

// Function to return gcd of a and b
function gcd(a: number, b: number): number {
  if (a == 0) return b;
  return gcd(b % a, a);
}

// Function to find gcd of array
// of numbers
function findGCD(arr: number[]): number {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = gcd(arr[i], result);

    if (result == 1) {
      return 1;
    }
  }
  return result;
}

function SmallestFactor(n: number) {
  if (isNaN(n) || !isFinite(n)) return NaN;
  if (n === 0) return 0;
  if (n % 1 || n * n < 2) return 1;
  if (n % 2 === 0) return 2;
  if (n % 3 === 0) return 3;
  if (n % 5 === 0) return 5;
  var m = Math.sqrt(n);
  for (var i = 7; i <= m; i += 30) {
    if (n % i === 0) return i;
    if (n % (i + 4) === 0) return i + 4;
    if (n % (i + 6) === 0) return i + 6;
    if (n % (i + 10) === 0) return i + 10;
    if (n % (i + 12) === 0) return i + 12;
    if (n % (i + 16) === 0) return i + 16;
    if (n % (i + 22) === 0) return i + 22;
    if (n % (i + 24) === 0) return i + 24;
  }
  return n;
}

async function Factorization(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(FindFactorization);
  p.require(SmallestFactor);
  p.require(gcd);
  p.require(findGCD);
  await p.spawn((data) => FindFactorization(data));
  return p.data.a;
}

export default Factorization;
