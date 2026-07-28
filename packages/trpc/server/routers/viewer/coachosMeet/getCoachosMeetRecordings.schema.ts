import { z } from "zod";

export const ZGetCoachosMeetRecordingsInputSchema = z.object({
  roomName: z.string(),
});

export type TGetCoachosMeetRecordingsInputSchema = z.infer<typeof ZGetCoachosMeetRecordingsInputSchema>;
