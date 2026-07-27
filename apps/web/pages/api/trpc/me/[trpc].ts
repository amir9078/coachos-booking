import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { meRouter } from "@coachos/trpc/server/routers/viewer/me/_router";

export default createNextApiHandler(meRouter);
