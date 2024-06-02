import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

import { prisma } from "../src/lib/prisma";

async function seed() {
  const eventId = "9e9bd979-9d10-4915-b339-3786b1634f33";

  await prisma.event.deleteMany();

  await prisma.event.create({
    data: {
      id: eventId,
      title: "Unite Summit",
      slug: "unite-summit",
      details: "An event made by developers for developers!",
      maximunAttendees: 120,
    },
  });

  const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = [];

  for (let i = 0; i <= 120; i++) {
    attendeesToInsert.push({
      id: 10000 + i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      eventId,
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, "days").toDate(),
      }),
      CheckIn: faker.helpers.arrayElement<
        Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined
      >([
        undefined,
        {
          create: {
            createdAt: faker.date.recent({ days: 7 }),
          },
        },
      ]),
    });
  }

  await Promise.all(
    attendeesToInsert.map((data) => {
      return prisma.attendee.create({
        data,
      });
    })
  );
}

seed().then(() => {
  console.log("--------------------------------------");
  console.log("Database seeded successfully!");
  console.log("--------------------------------------");

  prisma.$disconnect();
});
