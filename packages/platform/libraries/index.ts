import { getBookingForReschedule } from "@coachos/features/bookings/lib/get-booking";
import getAllUserBookings from "@coachos/features/bookings/lib/getAllUserBookings";
import { getBookingFieldsWithSystemFields } from "@coachos/features/bookings/lib/getBookingFields";
import getBookingInfo from "@coachos/features/bookings/lib/getBookingInfo";
import handleCancelBooking from "@coachos/features/bookings/lib/handleCancelBooking";
import handleMarkNoShow from "@coachos/features/handleMarkNoShow";
import { getTranslation } from "@coachos/i18n/server";
import { symmetricDecrypt, symmetricEncrypt } from "@coachos/lib/crypto";
import type { Prisma } from "@coachos/prisma/client";
import { credentialForCalendarServiceSelect } from "@coachos/prisma/selects/credential";
import { paymentDataSelect } from "@coachos/prisma/selects/payment";

export { slugify } from "@coachos/lib/slugify";
export { slugifyLenient } from "@coachos/lib/slugify-lenient";
export { getBookingForReschedule };

export { getWebhookProducer } from "@coachos/features/di/webhooks/containers/webhook";
export { getUsernameList } from "@coachos/features/eventtypes/lib/defaultEvents";
export {
  DEFAULT_WEBHOOK_VERSION,
  WebhookVersion,
} from "@coachos/features/webhooks/lib/interface/IWebhookRepository";
export type { IWebhookProducerService } from "@coachos/features/webhooks/lib/interface/WebhookProducerService";
export {
  AttributeType,
  CreationSource,
  MembershipRole,
  PeriodType,
  SchedulingType,
  TimeUnit,
  WebhookTriggerEvents,
} from "@coachos/prisma/enums";
export type { CalendarEvent, EventBusyDate } from "@coachos/types/Calendar";

export { handleMarkNoShow };

export type {
  BookingCreateBody,
  BookingResponse,
} from "@coachos/features/bookings/types";
export type { ConnectedCalendar } from "@coachos/features/calendars/lib/CalendarManager";
export {
  getBusyCalendarTimes,
  updateEvent,
} from "@coachos/features/calendars/lib/CalendarManager";
export type { ConnectedDestinationCalendars } from "@coachos/features/calendars/lib/getConnectedDestinationCalendars";
export { getConnectedDestinationCalendarsAndEnsureDefaultsInDb } from "@coachos/features/calendars/lib/getConnectedDestinationCalendars";
export type { CityTimezones } from "@coachos/features/cityTimezones/cityTimezonesHandler";
export { cityTimezonesHandler } from "@coachos/features/cityTimezones/cityTimezonesHandler";
export { ENABLE_ASYNC_TASKER, MINUTES_TO_BOOK } from "@coachos/lib/constants";
export { TRPCError } from "@trpc/server";

export { getAllUserBookings };
export { getBookingInfo };
export { handleCancelBooking };

export { dynamicEvent } from "@coachos/features/eventtypes/lib/defaultEvents";
export { parseBookingLimit } from "@coachos/lib/intervalLimits/isBookingLimits";
export { parseRecurringEvent } from "@coachos/lib/isRecurringEvent";
export {
  bookingMetadataSchema,
  teamMetadataSchema,
  userMetadata,
} from "@coachos/prisma/zod-utils";

export { symmetricEncrypt, symmetricDecrypt };

export { getTranslation };

export { validateCustomEventName } from "@coachos/features/eventtypes/lib/eventNaming";

export type TeamQuery = Prisma.TeamGetPayload<{
  select: {
    id: true;
    credentials: {
      select: typeof import("@coachos/prisma/selects/credential").credentialForCalendarServiceSelect;
    };
    name: true;
    logoUrl: true;
    members: {
      select: {
        role: true;
      };
    };
  };
}>;

export { credentialForCalendarServiceSelect };
export { paymentDataSelect };
export { confirmHandler as confirmBookingHandler } from "@coachos/trpc/server/routers/viewer/bookings/confirm.handler";
export { getBookingFieldsWithSystemFields };

export { checkAdminOrOwner } from "@coachos/features/auth/lib/checkAdminOrOwner";
export { sendLocationChangeEmailsAndSMS } from "@coachos/emails/email-manager";
export { verifyCodeUnAuthenticated } from "@coachos/features/auth/lib/verifyCodeUnAuthenticated";
export { sendEmailVerificationByCode } from "@coachos/features/auth/lib/verifyEmail";
export { getCalendarLinks } from "@coachos/features/bookings/lib/getCalendarLinks";
export { BookingReferenceRepository } from "@coachos/features/bookingReference/repositories/BookingReferenceRepository";
export { BookingAccessService } from "@coachos/features/bookings/services/BookingAccessService";
export { CredentialRepository } from "@coachos/features/credentials/repositories/CredentialRepository";
export type { OrgMembershipLookup } from "@coachos/features/di/modules/OrgMembershipLookup";
export type { OAuth2Tokens } from "@coachos/features/oauth/services/OAuthService";
export { OAuthService } from "@coachos/features/oauth/services/OAuthService";
export { generateSecret } from "@coachos/features/oauth/utils/generateSecret";
export { ProfileRepository } from "@coachos/features/profile/repositories/ProfileRepository";
export { SelectedCalendarRepository } from "@coachos/features/selectedCalendar/repositories/SelectedCalendarRepository";
export type { Tasker } from "@coachos/features/tasker/tasker";
export { getTasker } from "@coachos/features/tasker/tasker-factory";
export { buildCalEventFromBooking } from "@coachos/lib/buildCalEventFromBooking";
export { getVideoCallUrlFromCalEvent } from "@coachos/lib/CalEventParser";
export { verifyCodeChallenge } from "@coachos/lib/pkce";
export { encryptServiceAccountKey } from "@coachos/lib/server/serviceAccountKey";
export { validateUrlForSSRFSync } from "@coachos/lib/ssrfProtection";
export type { TraceContext } from "@coachos/lib/tracing";
export { distributedTracing } from "@coachos/lib/tracing/factory";
export {
  type BookingWithUserAndEventDetails,
  bookingWithUserAndEventDetailsSelect,
} from "@coachos/prisma/selects/booking";
export { checkEmailVerificationRequired } from "@coachos/trpc/server/routers/publicViewer/checkIfUserEmailVerificationRequired.handler";
export type { CredentialForCalendarService } from "@coachos/types/Credential";

// === Stubs for deleted EE features still imported by API v2 ===

// Round-robin reassignment removed (EE feature) — stubs for API v2
export async function roundRobinManualReassignment(_args: {
  bookingId: number;
  newUserId: number;
  orgId?: number | null;
  reassignReason?: string;
  reassignedById?: number;
  emailsEnabled?: boolean;
  platformClientParams?: unknown;
  actionSource?: string;
  reassignedByUuid?: string;
}): Promise<void> {
  // No-op in community edition
}

export async function roundRobinReassignment(_args: {
  bookingId: number;
  orgId?: number | null;
  emailsEnabled?: boolean;
  platformClientParams?: unknown;
  reassignedById?: number;
  actionSource?: string;
  reassignedByUuid?: string;
}): Promise<void> {
  // No-op in community edition
}

// createApiKeyHandler removed (EE feature) — stub for API v2
export async function createApiKeyHandler(_args: {
  ctx: { user: { id: number } };
  input: {
    note?: string | null;
    neverExpires?: boolean;
    expiresAt?: Date | null;
    teamId?: number;
  };
}): Promise<string> {
  throw new Error("API key creation is not available in community edition");
}

// getClientSecretFromPayment removed (EE feature) — stub for API v2
export function getClientSecretFromPayment(payment: { data: Record<string, unknown> }): string | null {
  const data = payment.data;
  if (data && typeof data === "object" && "client_secret" in data) {
    return data.client_secret as string;
  }
  return null;
}

// verifyCodeAuthenticated removed (EE feature) — stub for API v2
export async function verifyCodeAuthenticated(_args: {
  user: { id: number; email?: string; [key: string]: unknown };
  email: string;
  code: string;
}): Promise<boolean> {
  return false;
}

// createNewUsersConnectToOrgIfExists removed (EE feature) — stub for API v2
export async function createNewUsersConnectToOrgIfExists(_args: {
  invitations: { usernameOrEmail: string; role: string }[];
  creationSource?: string;
  teamId: number;
  isOrg: boolean;
  parentId: number | null;
  autoAcceptEmailDomain: string;
  orgConnectInfoByUsernameOrEmail: Record<string, { orgId: number; autoAccept: boolean }>;
  isPlatformManaged?: boolean;
  timeFormat?: number;
  weekStart?: string;
  timeZone?: string;
  language?: string;
}): Promise<{ id: number; email: string; username: string }[]> {
  throw new Error("Organization user creation is not available in community edition");
}

// sendVerificationCode removed (EE feature) — stub for API v2
export async function sendVerificationCode(_phoneNumber: string): Promise<void> {
  throw new Error("Phone verification is not available in community edition");
}

// verifyPhoneNumber removed (EE feature) — stub for API v2
export async function verifyPhoneNumber(
  _phoneNumber: string,
  _code: string,
  _userId: number,
  _teamId?: number
): Promise<boolean> {
  throw new Error("Phone verification is not available in community edition");
}
