import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { calendarsRouter } from "@coachos/trpc/server/routers/viewer/calendars/_router";

export default createNextApiHandler(calendarsRouter);
