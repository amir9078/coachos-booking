import { DestinationCalendarRepository } from "@coachos/features/calendars/repositories/DestinationCalendarRepository";
import { DI_TOKENS } from "@coachos/features/di/tokens";
import { moduleLoader as prismaModuleLoader } from "@coachos/features/di/modules/Prisma";

import { createModule, bindModuleToClassOnToken, type ModuleLoader } from "../di";

export const destinationCalendarRepositoryModule = createModule();
const token = DI_TOKENS.DESTINATION_CALENDAR_REPOSITORY;
const moduleToken = DI_TOKENS.DESTINATION_CALENDAR_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: destinationCalendarRepositoryModule,
  moduleToken,
  token,
  classs: DestinationCalendarRepository,
  dep: prismaModuleLoader,
});

export const moduleLoader: ModuleLoader = {
  token,
  loadModule,
};
