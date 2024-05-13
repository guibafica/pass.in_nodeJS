import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { createEvent } from "./routes/create-event";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);

app.get("/", () => "Hello world");

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 HTTP server running! 🚀");
});
