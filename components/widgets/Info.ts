import { Answer } from "../MyTypes";
import Parallel from "paralleljs";

function Text(data: { a: Answer[]; n: number }) {
  data.a.push({
    state: "maybe",
    text: [
      "About Numerus",
      "Numerus is a cool tool that gives you useful information about a specific integer",
      "You can even install it on your cellphone and use it offline! (magic, I know)",
      "It was created as a one week project. The information here is decently accurate, but don't use it for serious work... Only for fun, k?",
      "Do you want a specific tool here? Is there a bug? Of course there is. Send me a message at contact@koga.one!",
    ],
  });
  data.a.push({
    state: "maybe",
    text: [
      "About me",
      "If you want to know more about me, just go to my website koga.one!",
    ],
  });
  data.a.push({
    state: "maybe",
    text: [
      "Fun facts",
      "1 is my favorite number, followed by 5 and 0 (I like small numbers)",
      "My apartment number during high school used to be 101",
      "It took about 28 hours to create this website from scratch",
      'You can listen to "Unholy - The Wrecks" about 448 times in 28 hours. Seriously, this song bangs',
      "Numerus was an old project of mine that I coded with C# in Unity. Of course, now it is much better",
      "Octopuses can live up to 5 years. That's a lot!",
      "And, finally, you can put all of the Solar System planets between Earth and the Moon. Seriously, do the math!",
    ],
  });

  return data;
}
async function Info(n: number) {
  const p = new Parallel({ a: [{}] as Answer[], n });
  p.require(Text);
  await p.spawn((data) => Text(data));
  return p.data.a;
}

export default Info;
