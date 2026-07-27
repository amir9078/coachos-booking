import { getHolidayService } from "@coachos/lib/holidays";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

import type { TGetUserSettingsSchema } from "./getUserSettings.schema";

type GetUserSettingsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetUserSettingsSchema;
};

export async function getUserSettingsHandler({ ctx }: GetUserSettingsOptions) {
  const holidayService = getHolidayService();
  return holidayService.getUserSettings(ctx.user.id);
}

export default getUserSettingsHandler;
