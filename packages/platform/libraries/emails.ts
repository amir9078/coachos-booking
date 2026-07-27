import AttendeeAddGuestsEmail from "@coachos/emails/templates/attendee-add-guests-email";
import AttendeeCancelledEmail from "@coachos/emails/templates/attendee-cancelled-email";
import AttendeeDeclinedEmail from "@coachos/emails/templates/attendee-declined-email";
import AttendeeRequestEmail from "@coachos/emails/templates/attendee-request-email";
import AttendeeRescheduledEmail from "@coachos/emails/templates/attendee-rescheduled-email";
import AttendeeScheduledEmail from "@coachos/emails/templates/attendee-scheduled-email";
import AttendeeUpdatedEmail from "@coachos/emails/templates/attendee-updated-email";
import AttendeeVerifyEmail from "@coachos/emails/templates/attendee-verify-email";
import OrganizerAddGuestsEmail from "@coachos/emails/templates/organizer-add-guests-email";
import OrganizerCancelledEmail from "@coachos/emails/templates/organizer-cancelled-email";
import OrganizerReassignedEmail from "@coachos/emails/templates/organizer-reassigned-email";
import OrganizerRequestEmail from "@coachos/emails/templates/organizer-request-email";
import OrganizerRescheduledEmail from "@coachos/emails/templates/organizer-rescheduled-email";
import OrganizerScheduledEmail from "@coachos/emails/templates/organizer-scheduled-email";
import {
  sendChangeOfEmailVerification,
  sendEmailVerificationByCode,
} from "@coachos/features/auth/lib/verifyEmail";
// sendSignupToOrganizationEmail removed (EE/org feature)
// verifyEmailCodeHandler removed (EE/workflows feature)

export { AttendeeVerifyEmail };

export { AttendeeAddGuestsEmail };

export { OrganizerAddGuestsEmail };

export { AttendeeScheduledEmail };

export { OrganizerScheduledEmail };

export { AttendeeDeclinedEmail };

export { AttendeeCancelledEmail };

export { OrganizerCancelledEmail };

export { OrganizerReassignedEmail };

export { OrganizerRescheduledEmail };

export { AttendeeRescheduledEmail };

export { AttendeeUpdatedEmail };

export { OrganizerRequestEmail };

export { AttendeeRequestEmail };

export { sendEmailVerificationByCode };
export { sendChangeOfEmailVerification };

// sendSignupToOrganizationEmail stub — org feature removed
export async function sendSignupToOrganizationEmail(_args: {
  usernameOrEmail: string;
  team: { name: string; slug?: string | null; id?: number; parent?: unknown | null };
  inviterName: string;
  teamId: number;
  isOrg: boolean;
  translation?: unknown;
}): Promise<void> {
  // No-op: organization signup emails are not available in community edition
}

// verifyEmailCodeHandler stub — used by verified-resources service
export async function verifyEmailCodeHandler(_opts: {
  input: { code: string; email: string; teamId?: number };
  ctx?: { user?: { id: number } };
}): Promise<boolean> {
  return false;
}
