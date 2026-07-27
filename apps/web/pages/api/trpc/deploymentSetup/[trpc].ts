import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { deploymentSetupRouter } from "@coachos/trpc/server/routers/viewer/deploymentSetup/_router";

export default createNextApiHandler(deploymentSetupRouter);
