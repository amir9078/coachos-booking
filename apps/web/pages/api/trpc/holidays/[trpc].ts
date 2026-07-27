import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { holidaysRouter } from "@coachos/trpc/server/routers/viewer/holidays/_router";

export default createNextApiHandler(holidaysRouter);
