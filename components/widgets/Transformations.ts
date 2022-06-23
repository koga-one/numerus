import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function Backwards(data: { a: Answer[]; n: number }) {
  if (data.n < 0) {
    data.a.push({
      state: "yes",
      text: `Backwards: -${(-data.n).toString().split("").reverse().join("")}`,
    });
  } else {
    data.a.push({
      state: "yes",
      text: `Backwards: ${data.n.toString().split("").reverse().join("")}`,
    });
  }
  return data;
}

function RomanChunks(digits: string[]): string[] {
  let chunks: string[] = [];
  let cur = "";

  for (let i = 0; i < digits.length; i++) {
    if (i % 3 === 0 && i !== 0 && +digits[i] >= 4) {
      // Break the chunk now
      chunks.push(cur);
      cur = "";
    } else if (i % 3 === 1 && i !== 1 && +digits[i - 1] <= 3) {
      // Break the chunk one later
      chunks.push(cur);
      cur = "";
    }

    cur = digits[i] + cur;
  }

  if (cur !== "") chunks.push(cur);

  return chunks;
}

function Roman(data: { a: Answer[]; n: number }) {
  if (data.n <= 0) {
    data.a.push({ state: "no", text: "Roman: N needs to be greater than 0!" });
    return data;
  }

  let chunks = RomanChunks(
      String(+data.n)
        .split("")
        .reverse()
    ),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ];

  let bigRoman = "";

  for (let i = 0; i < chunks.length; i++) {
    let digits = chunks[i].split("");
    let roman = "";
    let j = 3;
    while (j--) roman = (key[+digits.pop()! + j * 10] || "") + roman;

    bigRoman =
      ` ${Array(i + 1).join("(")}${
        Array(+digits.join("") + 1).join("M") + roman
      }${Array(i + 1).join(")")}` + bigRoman;
  }

  data.a.push({
    state: "yes",
    text: `Roman: ${bigRoman}`,
  });
  return data;
}

async function Transformations(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(Backwards);
  p.require(RomanChunks);
  p.require(Roman);
  await p.spawn((data) => Backwards(data));
  await p.spawn((data) => Roman(data));
  return p.data.a;
}

export default Transformations;
