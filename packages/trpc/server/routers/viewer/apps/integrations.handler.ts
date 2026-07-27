import { getConnectedApps } from "@coachos/app-store/_utils/getConnectedApps";
import { prisma } from "@coachos/prisma";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

import type { TIntegrationsInputSchema } from "./integrations.schema";

type IntegrationsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TIntegrationsInputSchema;
};

export const integrationsHandler = async ({ ctx, input }: IntegrationsOptions) => {
  const user = ctx.user;
  return getConnectedApps({ user, input, prisma });
};
