export { getBookingAttendeesService } from "@coachos/features/bookings/di/BookingAttendeesService.container";
export { BookingEmailSmsHandler } from "@coachos/features/bookings/lib/BookingEmailSmsHandler";
export { CheckBookingLimitsService } from "@coachos/features/bookings/lib/checkBookingLimits";
export type { RegularBookingCreateResult } from "@coachos/features/bookings/lib/dto/types";
export { LuckyUserService } from "@coachos/features/bookings/lib/getLuckyUser";
export { BookingCancelService } from "@coachos/features/bookings/lib/handleCancelBooking";
export { CheckBookingAndDurationLimitsService } from "@coachos/features/bookings/lib/handleNewBooking/checkBookingAndDurationLimits";
export { BookingEventHandlerService } from "@coachos/features/bookings/lib/onBookingEvents/BookingEventHandlerService";
export { RecurringBookingService } from "@coachos/features/bookings/lib/service/RecurringBookingService";
export { RegularBookingService } from "@coachos/features/bookings/lib/service/RegularBookingService";
export { BookingEmailAndSmsSyncTasker } from "@coachos/features/bookings/lib/tasker/BookingEmailAndSmsSyncTasker";
export { BookingEmailAndSmsTasker } from "@coachos/features/bookings/lib/tasker/BookingEmailAndSmsTasker";
export { BookingEmailAndSmsTaskService } from "@coachos/features/bookings/lib/tasker/BookingEmailAndSmsTaskService";
export { BookingEmailAndSmsTriggerDevTasker } from "@coachos/features/bookings/lib/tasker/BookingEmailAndSmsTriggerTasker";
export { BookingAttendeesRemoveService } from "@coachos/features/bookings/services/BookingAttendeesRemoveService";
export { BookingAttendeesService } from "@coachos/features/bookings/services/BookingAttendeesService";
export { getWebhookProducer } from "@coachos/features/di/webhooks/containers/webhook";
export { PrismaOrgMembershipRepository } from "@coachos/features/membership/repositories/PrismaOrgMembershipRepository";
export type { IWebhookProducerService } from "@coachos/features/webhooks/lib/interface/WebhookProducerService";
export {
  type BookingWithUserAndEventDetails,
  bookingWithUserAndEventDetailsSelect,
} from "@coachos/prisma/selects/booking";
export { addGuestsHandler } from "@coachos/trpc/server/routers/viewer/bookings/addGuests.handler";

// Booking audit was removed during EE cleanup — makeUserActor stub for API v2
export function makeUserActor(_uuid: string): { type: string; actorId: string } {
  return { type: "user", actorId: _uuid };
}
