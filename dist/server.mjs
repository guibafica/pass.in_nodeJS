import {
  registerForEvent
} from "./chunk-XGEDKACX.mjs";
import {
  errorHandler
} from "./chunk-MREOHDF2.mjs";
import {
  checkIn
} from "./chunk-G62B76OJ.mjs";
import {
  createEvent
} from "./chunk-QZ3EWL4T.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-L2VQH24D.mjs";
import {
  getEventAttendees
} from "./chunk-3TOP2WEC.mjs";
import {
  getEvent
} from "./chunk-TA3GSJD7.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "API specifications for the backend of the pass.in application.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.get("/", () => "Hello world");
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("\u{1F680} HTTP server running! \u{1F680}");
});
export {
  app
};
