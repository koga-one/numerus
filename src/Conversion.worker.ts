import { Answer } from "../components/MyTypes";

const chosenBases: { base: number; name: string }[] = [
  { base: 2, name: "Binary" },
  { base: 3, name: "Ternary" },
  { base: 6, name: "Seximal" },
  { base: 8, name: "Octal" },
  { base: 12, name: "Duodecimal" },
  { base: 16, name: "Hexadecimal" },
  { base: 20, name: "Vigesimal" },
];

async function SingleConversion(n: number) {
  let conversions = [`N in ${chosenBases.length} different bases:`];
  for (let i = 0; i < chosenBases.length; i++) {
    conversions.push(
      `${n.toString(chosenBases[i].base)} in base ${chosenBases[i].base}`
    );
  }

  return {
    state: "yes",
    text: conversions,
  } as Answer;
}

self.onmessage = async (event) => {
  await SingleConversion(event.data.n).then((result) => {
    self.postMessage(result);
  });
};
