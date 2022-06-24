import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function Diagonals(data: { a: Answer[]; n: number }) {
  data.a.push({
    state: "yes",
    text: `Diagonals of a N-gon: ${(data.n * (data.n - 3)) / 2}`,
  });
  return data;
}

function Angles(data: { a: Answer[]; n: number }) {
  data.a.push({
    state: "yes",
    text: `Internal angle of a N-gon: ${360 / data.n}`,
  });
  data.a.push({
    state: "yes",
    text: `External angle of a N-gon: ${180 - 360 / data.n}`,
  });
  return data;
}

function Triangle(data: { a: Answer[]; n: number }) {
  let delta = 1 + 8 * data.n;

  const completeLayers = Math.floor((Math.sqrt(delta) - 1) / 2);
  const totalLayers = Math.ceil((Math.sqrt(delta) - 1) / 2);
  const ballsLacking = ((totalLayers + 1) * totalLayers) / 2 - data.n;

  if (ballsLacking === 0) {
    data.a.push({
      state: "yes",
      text: [
        "Triangle of N balls:",
        `It is a perfect triangle of ${completeLayers} layers!`,
      ],
    });
  } else {
    const remainingBalls = data.n - ((completeLayers + 1) * completeLayers) / 2;
    data.a.push({
      state: "yes",
      text: [
        "Triangle of N balls:",
        `Complete layers: ${completeLayers}`,
        `Balls lacking for the next layer: ${ballsLacking}`,
        `or`,
        `Extra balls: ${remainingBalls}`,
      ],
    });
  }
  return data;
}

async function Geometry(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(Diagonals);
  p.require(Angles);
  p.require(Triangle);
  await p.spawn((data) => Diagonals(data));
  await p.spawn((data) => Angles(data));
  await p.spawn((data) => Triangle(data));
  return p.data.a;
}

export default Geometry;
