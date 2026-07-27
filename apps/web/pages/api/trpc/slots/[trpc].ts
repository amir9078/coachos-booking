import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { slotsRouter } from "@coachos/trpc/server/routers/viewer/slots/_router";

export default createNextApiHandler(slotsRouter);
