import { Transform } from "class-transformer";

import { normalizeTimezone } from "@coachos/platform-types";

export function CapitalizeTimeZone(): PropertyDecorator {
  return Transform(({ value }) => normalizeTimezone(value));
}
