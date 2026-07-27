import prisma from "@coachos/prisma";
import { credentialForCalendarServiceSelect } from "@coachos/prisma/selects/credential";
import type { CredentialPayload } from "@coachos/types/Credential";

/**
 * Refreshes a Credential with fresh data from the database.
 *
 * @param credential
 */
export async function refreshCredential(credential: CredentialPayload): Promise<CredentialPayload> {
  const newCredential = await prisma.credential.findUnique({
    where: {
      id: credential.id,
    },
    select: credentialForCalendarServiceSelect,
  });

  if (!newCredential) {
    return credential;
  } else {
    return newCredential;
  }
}
