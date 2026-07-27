import { BookingEmailAndSmsTriggerDevTasker } from "@coachos/features/bookings/lib/tasker/BookingEmailAndSmsTriggerTasker";
import { createContainer } from "@coachos/features/di/di";

import { moduleLoader as BookingEmailAndSmsTriggerDevTaskerModule } from "./BookingEmailAndSmsTriggerDevTasker.module";

const container = createContainer();

export function getBookingEmailAndSmsTriggerDevTasker(): BookingEmailAndSmsTriggerDevTasker {
  BookingEmailAndSmsTriggerDevTaskerModule.loadModule(container);
  return container.get<BookingEmailAndSmsTriggerDevTasker>(BookingEmailAndSmsTriggerDevTaskerModule.token);
}
