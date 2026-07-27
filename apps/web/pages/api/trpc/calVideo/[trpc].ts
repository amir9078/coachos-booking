import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { calVideoRouter } from "@coachos/trpc/server/routers/viewer/calVideo/_router";

export default createNextApiHandler(calVideoRouter);
