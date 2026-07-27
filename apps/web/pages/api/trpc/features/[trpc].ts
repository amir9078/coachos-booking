import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { featureFlagRouter } from "@coachos/trpc/server/routers/features/_router";

export default createNextApiHandler(featureFlagRouter, true, "features");
