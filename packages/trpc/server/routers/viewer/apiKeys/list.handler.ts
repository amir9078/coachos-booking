import { PrismaApiKeyRepository } from "@coachos/features/api-keys-legacy/api-keys/repositories/PrismaApiKeyRepository";
import type { PrismaClient } from "@coachos/prisma";

import type { TrpcSessionUser } from "../../../types";

type ListOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
};

export const listHandler = async ({ ctx: { user, prisma } }: ListOptions) => {
  return new PrismaApiKeyRepository(prisma).findApiKeysFromUserId({ userId: user.id });
};
