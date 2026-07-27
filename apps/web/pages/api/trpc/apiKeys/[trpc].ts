import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { apiKeysRouter } from "@coachos/trpc/server/routers/viewer/apiKeys/_router";

export default createNextApiHandler(apiKeysRouter);