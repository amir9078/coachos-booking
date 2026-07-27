import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { oooRouter } from "@coachos/trpc/server/routers/viewer/ooo/_router";

export default createNextApiHandler(oooRouter);
