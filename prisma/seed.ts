import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "ce88aebf-0b19-4066-b9c1-4c39ddd5e7bf",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "An event made by developers for developers!",
      maximunAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("--------------------------------------");
  console.log("Database seeded successfully!");
  console.log("--------------------------------------");

  prisma.$disconnect();
});
