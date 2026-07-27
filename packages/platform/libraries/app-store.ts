import getEnabledAppsFromCredentials from "@coachos/app-store/_utils/getEnabledAppsFromCredentials";
import getApps, { type CredentialDataWithTeamName } from "@coachos/app-store/utils";
import handleDeleteCredential from "@coachos/features/credentials/handleDeleteCredential";

export type { TDependencyData } from "@coachos/app-store/_appRegistry";
export { BuildCalendarService } from "@coachos/app-store/applecalendar/lib";
export { BuildCalendarService as BuildIcsFeedCalendarService } from "@coachos/app-store/ics-feedcalendar/lib";
export type { CredentialOwner } from "@coachos/app-store/types";
export type { CredentialDataWithTeamName, LocationOption } from "@coachos/app-store/utils";
export { getAppFromSlug } from "@coachos/app-store/utils";

export { getApps };

export { handleDeleteCredential };

export type { App } from "@coachos/types/App";

export { getEnabledAppsFromCredentials };

export type { ConnectedApps } from "@coachos/app-store/_utils/getConnectedApps";
export { getConnectedApps } from "@coachos/app-store/_utils/getConnectedApps";
export { OAuth2UniversalSchema } from "@coachos/app-store/_utils/oauth/universalSchema";
export {
  CalendarAppDelegationCredentialClientIdNotAuthorizedError,
  CalendarAppDelegationCredentialConfigurationError,
  CalendarAppDelegationCredentialError,
  CalendarAppDelegationCredentialInvalidGrantError,
  CalendarAppDelegationCredentialNotSetupError,
  CalendarAppError,
} from "@coachos/lib/CalendarAppError";
export type { TServiceAccountKeySchema } from "@coachos/prisma/zod-utils";
export type { AppsStatus } from "@coachos/types/Calendar";
export type { CredentialPayload } from "@coachos/types/Credential";

// Delegation credentials removed (EE feature) — stub for API v2
export const DelegationCredentialRepository = {
  findByIdIncludeSensitiveServiceAccountKey(_args: {
    id: string;
  }): Promise<{ serviceAccountKey: { client_email: string; private_key: string } | null } | null> {
    return Promise.resolve(null);
  },
};

export { getUsersCredentialsIncludeServiceAccountKey } from "@coachos/app-store/delegationCredential";

// enrichUserWithDelegationConferencingCredentialsWithoutOrgId removed (EE feature) — stub for API v2
export async function enrichUserWithDelegationConferencingCredentialsWithoutOrgId(_args: {
  user: { credentials: unknown[]; [key: string]: unknown };
}): Promise<{ credentials: unknown[] }> {
  return { credentials: (_args.user.credentials as unknown[]) || [] };
}
