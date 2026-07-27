import { AVATAR_FALLBACK, COACHOS_URL } from "@coachos/lib/constants";
import type { User } from "@coachos/prisma/client";
import { z } from "zod";

export const getAbsoluteAvatarUrl = (url: string): string => {
  const isAbsolute = z.string().url().safeParse(url).success;
  return isAbsolute ? url : COACHOS_URL + url;
};

/**
 * Gives an organization aware avatar url for a user
 * It ensures that the wrong avatar isn't fetched by ensuring that organizationId is always passed
 * It should always return a fully formed url
 */
export const getUserAvatarUrl = (user: Pick<User, "avatarUrl"> | undefined): string => {
  if (user?.avatarUrl) {
    return getAbsoluteAvatarUrl(user.avatarUrl);
  }
  return COACHOS_URL + AVATAR_FALLBACK;
};
