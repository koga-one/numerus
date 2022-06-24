import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function WorldComparisons(data: { a: Answer[]; n: number }) {
  let comparisons = ["Cool real-life comparisons!"];
  comparisons.push(
    `N = ${+(data.n / 77530000).toFixed(10)}% of the world population`
  );
  comparisons.push(
    `N = ${+(data.n / 1000000000).toFixed(
      10
    )}% of the amount of stars in the Milky Way`
  );
  comparisons.push(
    `N drops of water = ${+(data.n / 20000).toFixed(10)} liters`
  );
  comparisons.push(
    `N kilometers = ${+(data.n / 3844).toFixed(
      10
    )}% of the distance between Earth and the Moon`
  );
  comparisons.push(
    `N kilometers = ${+(data.n / 1500000).toFixed(
      10
    )}% of the distance between Earth and the Sun`
  );
  comparisons.push(
    `N kilometers = ${+(data.n / 59063800).toFixed(
      10
    )}% of the distance between the Sun and Pluto`
  );
  comparisons.push(
    `N seconds = ${+(data.n / 354).toFixed(
      10
    )} times you can play Bohemian Rhapsody`
  );
  comparisons.push(
    `N minutes = ${+(data.n / 194).toFixed(
      10
    )} times you can watch Titanic (the movie)`
  );
  data.a.push({ state: "yes", text: comparisons });
  return data;
}

async function Comparisons(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(WorldComparisons);
  await p.spawn((data) => WorldComparisons(data));
  return p.data.a;
}

export default Comparisons;
