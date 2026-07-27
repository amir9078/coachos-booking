import type { BookingEmailSmsHandler } from "@coachos/features/bookings/lib/BookingEmailSmsHandler";
import { createContainer } from "@coachos/features/di/di";
import { moduleLoader as BookingEmailSmsHandlerModule } from "./BookingEmailSmsHandler.module";

const container = createContainer();

export function getBookingEmailSmsHandler(): BookingEmailSmsHandler {
  BookingEmailSmsHandlerModule.loadModule(container);
  return container.get<BookingEmailSmsHandler>(BookingEmailSmsHandlerModule.token);
}
