import { z } from "zod";

import { CoachosMeetLocationType } from "@coachos/app-store/constants";

import { commonBookingSchema } from "./types";

export const ZEditLocationInputSchema = commonBookingSchema.extend({
  newLocation: z.string().transform((val) => val || CoachosMeetLocationType),
  credentialId: z.number().nullable(),
});

export type TEditLocationInputSchema = z.infer<typeof ZEditLocationInputSchema>;
