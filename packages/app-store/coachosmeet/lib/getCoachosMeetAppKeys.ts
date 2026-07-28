import { z } from "zod";

import getAppKeysFromSlug from "../../_utils/getAppKeysFromSlug";

const coachosMeetAppKeysSchema = z.object({
  api_key: z.string(),
  scale_plan: z.string().default("false"),
});

export const getCoachosMeetAppKeys = async () => {
  const appKeys = await getAppKeysFromSlug("coachos-meet");
  return coachosMeetAppKeysSchema.parse(appKeys);
};
