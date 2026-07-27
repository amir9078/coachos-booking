import handleDeleteCredential from "@coachos/features/credentials/handleDeleteCredential";
import type { TrpcSessionUser } from "@coachos/trpc/server/types";

import type { TDeleteCredentialInputSchema } from "./deleteCredential.schema";

type DeleteCredentialOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TDeleteCredentialInputSchema;
};

export const deleteCredentialHandler = async ({ ctx, input }: DeleteCredentialOptions) => {
  const { user } = ctx;
  const { id, teamId } = input;

  await handleDeleteCredential({ userId: user.id, userMetadata: user.metadata, credentialId: id, teamId });
};
