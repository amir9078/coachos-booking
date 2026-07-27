import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { availabilityRouter } from "@coachos/trpc/server/routers/viewer/availability/_router";

export default createNextApiHandler(availabilityRouter);
