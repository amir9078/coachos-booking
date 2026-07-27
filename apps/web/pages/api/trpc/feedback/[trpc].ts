import { createNextApiHandler } from "@coachos/trpc/server/createNextApiHandler";
import { feedbackRouter } from "@coachos/trpc/server/routers/viewer/feedback/_router";

export default createNextApiHandler(feedbackRouter);
