import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { travelSchedulesRouter } from "@coachos/trpc/server/routers/viewer/travelSchedules/_router";

export default createNextApiHandler(travelSchedulesRouter);
