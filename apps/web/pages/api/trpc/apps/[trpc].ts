import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { appsRouter } from "@coachos/trpc/server/routers/viewer/apps/_router";

export default createNextApiHandler(appsRouter);
