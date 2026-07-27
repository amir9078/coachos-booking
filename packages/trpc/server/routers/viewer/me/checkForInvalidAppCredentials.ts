import { getAppFromSlug } from "@coachos/app-store/utils";
import type { InvalidAppCredentialBannerProps } from "@coachos/features/users/types/invalidAppCredentials";
import { prisma } from "@coachos/prisma";
import { MembershipRole } from "@coachos/prisma/enums";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

class PermissionCheckService {
  constructor(_prisma?: unknown) {}
  async checkPermission(..._args: unknown[]) { return true; }
  async hasPermission(..._args: unknown[]) { return true; }
  async getTeamIdsWithPermission(..._args: unknown[]): Promise<number[]> { return []; }
}

type checkInvalidAppCredentialsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const checkInvalidAppCredentials = async ({ ctx }: checkInvalidAppCredentialsOptions) => {
  const userId = ctx.user.id;

  const permissionCheckService = new PermissionCheckService();
  const userTeamIds = await permissionCheckService.getTeamIdsWithPermission({
    userId,
    permission: "team.update",
    fallbackRoles: [MembershipRole.ADMIN, MembershipRole.OWNER],
  });

  const apps = await prisma.credential.findMany({
    where: {
      OR: [{ userId }, { teamId: { in: userTeamIds } }],
      invalid: true,
    },
    select: {
      appId: true,
    },
  });

  const appNamesAndSlugs: InvalidAppCredentialBannerProps[] = [];
  for (const app of apps) {
    if (app.appId) {
      const appId = app.appId;
      const appMeta = await getAppFromSlug(appId);
      const name = appMeta ? appMeta.name : appId;
      appNamesAndSlugs.push({ slug: appId, name });
    }
  }

  return appNamesAndSlugs;
};
