import type { z } from "zod";

import { EventTypeDuplicateInput } from "@coachos/features/eventtypes/lib/schemas";

export const ZDuplicateInputSchema = EventTypeDuplicateInput;

export type TDuplicateInputSchema = z.infer<typeof ZDuplicateInputSchema>;
