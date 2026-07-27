import { createContainer } from "@coachos/features/di/di";
import { CalendarsTasker } from "@coachos/features/calendars/lib/tasker/CalendarsTasker";

import { moduleLoader as taskerModuleLoader } from "./CalendarsTasker.module";

const container = createContainer();

export function getCalendarsTasker(): CalendarsTasker {
  taskerModuleLoader.loadModule(container);
  return container.get<CalendarsTasker>(taskerModuleLoader.token);
}
