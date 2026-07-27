import { z } from "zod";

import { eventTypeAppCardZod } from "@coachos/app-store/eventTypeAppCardZod";

export const appDataSchema = eventTypeAppCardZod.merge(
  z.object({
    trackingId: z.string().default("").optional(),
    trackingEvent: z.enum(["Lead", "CompleteRegistration", "Schedule", "PageView"]).optional(),
  })
);
export const appKeysSchema = z.object({});
