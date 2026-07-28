import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { coachosMeetRouter } from "@coachos/trpc/server/routers/viewer/coachosMeet/_router";

export default createNextApiHandler(coachosMeetRouter);
