import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { authRouter } from "@coachos/trpc/server/routers/viewer/auth/_router";

export default createNextApiHandler(authRouter);
