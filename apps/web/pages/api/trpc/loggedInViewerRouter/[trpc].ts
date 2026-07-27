import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { loggedInViewerRouter } from "@coachos/trpc/server/routers/loggedInViewer/_router";

export default createNextApiHandler(loggedInViewerRouter);
