import { Answer } from "../MyTypes";

async function IsEven(n: number) {
  return {
    state: "yes",
    text: n % 2 === 0 ? "It is even!" : "It is odd!",
  } as Answer;
}

export default IsEven;
