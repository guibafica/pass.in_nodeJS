import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attendee badge",
        tags: ["events"],
        params: z.object({
          attendeeId: z.coerce.number().int(), // coerce -> convert the value to a number
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              title: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (req, res) => {
      const { attendeeId } = req.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      });

      if (attendee === null) throw new Error("Attendee not found");

      const baseURL = `${req.protocol}://${req.hostname}`;

      const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);

      return res.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          title: attendee.event.title,
          checkInURL: checkInURL.toString(),
        },
      });
    }
  );
}
