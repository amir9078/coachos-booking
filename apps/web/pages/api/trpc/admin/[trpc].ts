import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { adminRouter } from "@coachos/trpc/server/routers/viewer/admin/_router";

export default createNextApiHandler(adminRouter);
