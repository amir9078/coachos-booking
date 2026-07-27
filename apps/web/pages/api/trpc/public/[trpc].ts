import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { publicViewerRouter } from "@coachos/trpc/server/routers/publicViewer/_router";

export default createNextApiHandler(publicViewerRouter, true);
