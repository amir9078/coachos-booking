import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { credentialsRouter } from "@coachos/trpc/server/routers/viewer/credentials/_router";

export default createNextApiHandler(credentialsRouter);
