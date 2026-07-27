import { createContainer } from "@coachos/features/di/di";

import {
  type RecurringBookingService,
  moduleLoader as recurringBookingServiceModule,
} from "./RecurringBookingService.module";

const container = createContainer();

export function getRecurringBookingService(): RecurringBookingService {
  recurringBookingServiceModule.loadModule(container);

  return container.get<RecurringBookingService>(recurringBookingServiceModule.token);
}
