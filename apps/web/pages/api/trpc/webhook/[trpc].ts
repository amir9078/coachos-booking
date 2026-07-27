import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { webhookRouter } from "@coachos/trpc/server/routers/viewer/webhook/_router";

export default createNextApiHandler(webhookRouter);
