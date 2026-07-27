import { deleteStripeCustomer } from "@coachos/app-store/stripepayment/lib/customer";
import { ErrorCode } from "@coachos/features/auth/lib/ErrorCode";
import { prisma } from "@coachos/prisma";
import { IdentityProvider } from "@coachos/prisma/enums";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

type DeleteMeWithoutPasswordOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const deleteMeWithoutPasswordHandler = async ({ ctx }: DeleteMeWithoutPasswordOptions) => {
  const user = await prisma.user.findUnique({
    where: {
      email: ctx.user.email.toLowerCase(),
    },
  });
  if (!user) {
    throw new Error(ErrorCode.UserNotFound);
  }

  if (user.identityProvider === IdentityProvider.CAL) {
    throw new Error(ErrorCode.SocialIdentityProviderRequired);
  }

  if (user.twoFactorEnabled) {
    throw new Error(ErrorCode.SocialIdentityProviderRequired);
  }

  // Remove me from Stripe
  await deleteStripeCustomer(user).catch(console.warn);

  // Remove my account
  await prisma.user.delete({
    where: {
      id: ctx.user.id,
    },
  });

  return;
};
