import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { oAuthRouter } from "@coachos/trpc/server/routers/viewer/oAuth/_router";

export default createNextApiHandler(oAuthRouter);
