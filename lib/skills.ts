export interface SkillItem {
  id: number;
  icon: string;
}

export const skills: SkillItem[] = [
  {
    id: 1,
    icon: "/skills/01.png",
  },
  {
    id: 2,
    icon: "/skills/02.png",
  },
  {
    id: 3,
    icon: "/skills/03.png",
  },
  {
    id: 4,
    icon: "/skills/04.png",
  },
  {
    id: 5,
    icon: "/skills/05.png",
  },
  {
    id: 6,
    icon: "/skills/06.png",
  },
  {
    id: 7,
    icon: "/skills/07.png",
  },
  {
    id: 8,
    icon: "/skills/08.png",
  },
  {
    id: 9,
    icon: "/skills/09.png",
  },
  {
    id: 10,
    icon: "/skills/10.png",
  },
  {
    id: 11,
    icon: "/skills/11.png",
  },
  {
    id: 12,
    icon: "/skills/12.png",
  },
  {
    id: 13,
    icon: "/skills/13.png",
  },
  {
    id: 14,
    icon: "/skills/14.png",
  },
  {
    id: 15,
    icon: "/skills/15.png",
  },
  {
    id: 16,
    icon: "/skills/16.png",
  },
  {
    id: 17,
    icon: "/skills/17.png",
  },
  {
    id: 18,
    icon: "/skills/18.png",
  },
  {
    id: 19,
    icon: "/skills/19.png",
  },
  {
    id: 20,
    icon: "/skills/20.png",
  },
  {
    id: 21,
    icon: "/skills/21.png",
  },
  {
    id: 22,
    icon: "/skills/22.png",
  },
  {
    id: 23,
    icon: "/skills/23.png",
  },
  {
    id: 24,
    icon: "/skills/24.png",
  },

  {
    id: 25,
    icon: "/skills/25.png",
  },
  {
    id: 26,
    icon: "/skills/26.png",
  },
  {
    id: 27,
    icon: "/skills/27.png",
  },
  {
    id: 28,
    icon: "/skills/28.png",
  },
  {
    id: 29,
    icon: "/skills/29.png",
  },
  {
    id: 30,
    icon: "/skills/30.png",
  },
  {
    id: 31,
    icon: "/skills/31.png",
  },
  {
    id: 32,
    icon: "/skills/32.png",
  },
  {
    id: 33,
    icon: "/skills/33.png",
  },
];

export async function getSkills(): Promise<SkillItem[]> {
  return Promise.resolve(skills);
}
