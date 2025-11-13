export interface WordItem {
  id: number;
  title: string;
}

export const words = [
  {
    id: 1,
    title:
      "In which situations do they work best, when do they fail us, and how can we determine whether we need them orshould steer clear?",
  },
  {
    id: 2,
    title:
      "When does something become our greatest ally, when does it let us down, and how can we know whether to embrace it or let it go?",
  },
  {
    id: 3,
    title:
      "I can debug thousands of errors, but I can’t debug this feeling for you 😅💻❤️.",
  },
  {
    id: 4,
    title:
      "What is the true cost of convenience, when is it a worthy trade-off, and how do we assess its value in the grand scheme?",
  },
];

export async function getWords(): Promise<WordItem[]> {
  return Promise.resolve(words);
}
