import { z } from "zod";

export const ZGetDownloadLinkOfCoachosMeetRecordingsInputSchema = z.object({
  recordingId: z.string(),
});

export type TGetDownloadLinkOfCoachosMeetRecordingsInputSchema = z.infer<
  typeof ZGetDownloadLinkOfCoachosMeetRecordingsInputSchema
>;
