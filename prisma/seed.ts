import { prisma } from "../src/server/db";

const colors = [
  { name: "Pink", hex: "#ff75e8", index: 0 },
  { name: "Red", hex: "#e81e25", index: 1 },
  { name: "Dark Red", hex: "#800509", index: 2 },
  { name: "Light Orange", hex: "#f29122", index: 3 },
  { name: "Orange", hex: "#ed840c", index: 4 },
  { name: "Dark Orange", hex: "#ad6109", index: 5 },
  { name: "Light Yellow", hex: "#f6ff45", index: 6 },
  { name: "Yellow", hex: "#eddf13", index: 7 },
  { name: "Dark Yellow", hex: "#998f09", index: 8 },
  { name: "Light Green", hex: "#62d633", index: 9 },
  { name: "Green", hex: "#21b514", index: 10 },
  { name: "Dark Green", hex: "#128008", index: 11 },
  { name: "Light Blue", hex: "#34ceed", index: 12 },
  { name: "Blue", hex: "#1f90e0", index: 13 },
  { name: "Dark Blue", hex: "#0e44a1", index: 14 },
  { name: "Light Purple", hex: "#a45df0", index: 15 },
  { name: "Purple", hex: "#7b17e6", index: 16 },
  { name: "Dark Purple", hex: "#3c0d6e", index: 17 },
  { name: "White", hex: "#ffffff", index: 18 },
  { name: "Light Gray", hex: "#bdbdbd", index: 19 },
  { name: "Gray", hex: "#828282", index: 20 },
  { name: "Dark Gray", hex: "#3d3d3d", index: 21 },
  { name: "Black", hex: "#000000", index: 22 },
  { name: "Brown", hex: "#612f00", index: 23 },
];

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await prisma.color.createMany({ data: colors });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
