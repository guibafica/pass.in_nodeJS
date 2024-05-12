import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { generateSlug } from "./utils/generate-slug";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/", () => "Hello world");

app.withTypeProvider<ZodTypeProvider>().post(
  "/events",
  {
    schema: {
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
      }),
      response: {
        // 201
      },
    },
  },
  async (req, res) => {
    const data = req.body;

    const slug = generateSlug(data.title);

    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    if (eventWithSameSlug !== null) {
      throw new Error("Another event with same title already exists");
    }

    const event = await prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        maximunAttendees: data.maximumAttendees,
        slug,
      },
    });

    return res.status(201).send({ eventId: event.id });
  }
);

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 HTTP server running! 🚀");
});
