import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { googleWorkspaceRouter } from "@coachos/trpc/server/routers/viewer/googleWorkspace/_router";

export default createNextApiHandler(googleWorkspaceRouter);
