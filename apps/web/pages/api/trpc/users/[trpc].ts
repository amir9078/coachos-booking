import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { userAdminRouter } from "@coachos/trpc/server/routers/viewer/users/_router";

export default createNextApiHandler(userAdminRouter);
