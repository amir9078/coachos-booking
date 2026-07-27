import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { eventTypesRouter } from "@coachos/trpc/server/routers/viewer/eventTypes/_router";

export default createNextApiHandler(eventTypesRouter);
