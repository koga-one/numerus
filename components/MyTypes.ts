export type Answer = {
  state: "yes" | "no" | "maybe" | "meh";
  text: string | string[];
};
