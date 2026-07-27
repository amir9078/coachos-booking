import { enrichUserWithDelegationCredentialsIncludeServiceAccountKey } from "@coachos/app-store/delegationCredential";
import { withSelectedCalendars } from "@coachos/lib/server/withSelectedCalendars";
import { availabilityUserSelect } from "@coachos/prisma";
import { prisma } from "@coachos/prisma";
import type { Prisma } from "@coachos/prisma/client";
import { credentialForCalendarServiceSelect } from "@coachos/prisma/selects/credential";

export async function findUsersForAvailabilityCheck({ where }: { where: Prisma.UserWhereInput }) {
  const user = await prisma.user.findFirst({
    where,
    select: {
      ...availabilityUserSelect,
      selectedCalendars: true,
      credentials: {
        select: credentialForCalendarServiceSelect,
      },
    },
  });

  if (!user) {
    return null;
  }

  return await enrichUserWithDelegationCredentialsIncludeServiceAccountKey({
    user: withSelectedCalendars(user),
  });
}
