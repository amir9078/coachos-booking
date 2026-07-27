import BaseCalendarService from "@coachos/lib/CalendarService";
import type { Calendar } from "@coachos/types/Calendar";
import type { CredentialPayload } from "@coachos/types/Credential";

class AppleCalendarService extends BaseCalendarService {
  constructor(credential: CredentialPayload) {
    super(credential, "apple_calendar", "https://caldav.icloud.com");
  }
}

/**
 * Factory function that creates an Apple Calendar service instance.
 * This is exported instead of the class to prevent internal types
 * from leaking into the emitted .d.ts file.
 */
export default function BuildCalendarService(credential: CredentialPayload): Calendar {
  return new AppleCalendarService(credential);
}
