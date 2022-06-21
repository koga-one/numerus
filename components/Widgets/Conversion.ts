import { Answer } from "../MyTypes";

const chosenBases: { base: number; name: string }[] = [
  { base: 2, name: "Binary" },
  { base: 3, name: "Ternary" },
  { base: 6, name: "Seximal" },
  { base: 8, name: "Octal" },
  { base: 12, name: "Duodecimal" },
  { base: 16, name: "Hexadecimal" },
  { base: 20, name: "Vigesimal" },
];

async function SingleConversion(n: number, e: { base: number; name: string }) {
  return {
    state: "yes",
    text: `${n.toString(e.base)} in ${e.name.toLowerCase()} (${e.base})`,
  } as Answer;
}

function Conversion(n: number) {
  let answers: Promise<Answer>[] = [];
  chosenBases.forEach((element) => {
    answers.push(SingleConversion(n, element));
  });

  return answers;
}

export default Conversion;
