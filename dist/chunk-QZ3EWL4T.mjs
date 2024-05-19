import {
  generateSlug
} from "./chunk-KDMJHR3Z.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post(
    "/events",
    {
      schema: {
        summary: "Create an event",
        tags: ["events"],
        body: z.object({
          title: z.string({ invalid_type_error: "The title must be a text" }).min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable()
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid()
          })
        }
      }
    },
    async (req, res) => {
      const data = req.body;
      const slug = generateSlug(data.title);
      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug
        }
      });
      if (eventWithSameSlug !== null) {
        throw new BadRequest("Another event with same title already exists");
      }
      const event = await prisma.event.create({
        data: {
          title: data.title,
          details: data.details,
          maximunAttendees: data.maximumAttendees,
          slug
        }
      });
      return res.status(201).send({ eventId: event.id });
    }
  );
}

export {
  createEvent
};
