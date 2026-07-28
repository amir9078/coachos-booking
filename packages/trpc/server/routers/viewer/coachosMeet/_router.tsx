import authedProcedure from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";
import { ZGetCoachosMeetRecordingsInputSchema } from "./getCoachosMeetRecordings.schema";
import { ZGetDownloadLinkOfCoachosMeetRecordingsInputSchema } from "./getDownloadLinkOfCoachosMeetRecordings.schema";
import { ZGetMeetingInformationInputSchema } from "./getMeetingInformation.schema";

type CoachosMeetRouterHandlerCache = {
  getCoachosMeetRecordings?: typeof import("./getCoachosMeetRecordings.handler").getCoachosMeetRecordingsHandler;
  getDownloadLinkOfCoachosMeetRecordings?: typeof import("./getDownloadLinkOfCoachosMeetRecordings.handler").getDownloadLinkOfCoachosMeetRecordingsHandler;
  getMeetingInformation?: typeof import("./getMeetingInformation.handler").getMeetingInformationHandler;
};

export const coachosMeetRouter = router({
  getCoachosMeetRecordings: authedProcedure
    .input(ZGetCoachosMeetRecordingsInputSchema)
    .query(async ({ ctx, input }) => {
      const { getCoachosMeetRecordingsHandler } = await import("./getCoachosMeetRecordings.handler");

      return getCoachosMeetRecordingsHandler({ ctx, input });
    }),

  getDownloadLinkOfCoachosMeetRecordings: authedProcedure
    .input(ZGetDownloadLinkOfCoachosMeetRecordingsInputSchema)
    .query(async ({ ctx, input }) => {
      const { getDownloadLinkOfCoachosMeetRecordingsHandler } = await import(
        "./getDownloadLinkOfCoachosMeetRecordings.handler"
      );

      return getDownloadLinkOfCoachosMeetRecordingsHandler({ ctx, input });
    }),

  getMeetingInformation: authedProcedure
    .input(ZGetMeetingInformationInputSchema)
    .query(async ({ ctx, input }) => {
      const { getMeetingInformationHandler } = await import("./getMeetingInformation.handler");

      return getMeetingInformationHandler({ ctx, input });
    }),
});
