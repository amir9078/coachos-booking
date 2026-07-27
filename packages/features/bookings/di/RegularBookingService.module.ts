import { moduleLoader as bookingEventHandlerModuleLoader } from "@coachos/features/bookings/di/BookingEventHandlerService.module";
import { RegularBookingService } from "@coachos/features/bookings/lib/service/RegularBookingService";
import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@coachos/features/di/di";
import { moduleLoader as bookingRepositoryModuleLoader } from "@coachos/features/di/modules/Booking";
import { moduleLoader as checkBookingAndDurationLimitsModuleLoader } from "@coachos/features/di/modules/CheckBookingAndDurationLimits";
import { moduleLoader as luckyUserServiceModuleLoader } from "@coachos/features/di/modules/LuckyUser";
import { moduleLoader as prismaModuleLoader } from "@coachos/features/di/modules/Prisma";
import { moduleLoader as userRepositoryModuleLoader } from "@coachos/features/di/modules/User";
import { DI_TOKENS } from "@coachos/features/di/tokens";
import { moduleLoader as webhookProducerModuleLoader } from "@coachos/features/di/webhooks/modules/WebhookProducerService.module";
import { moduleLoader as hashedLinkServiceModuleLoader } from "@coachos/features/hashedLink/di/HashedLinkService.module";
import { moduleLoader as bookingEmailAndSmsTaskerModuleLoader } from "./tasker/BookingEmailAndSmsTasker.module";

const thisModule = createModule();
const token = DI_TOKENS.REGULAR_BOOKING_SERVICE;
const moduleToken = DI_TOKENS.REGULAR_BOOKING_SERVICE_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: RegularBookingService,
  depsMap: {
    // TODO: In a followup PR, we aim to remove prisma dependency and instead inject the repositories as dependencies.
    prismaClient: prismaModuleLoader,
    checkBookingAndDurationLimitsService: checkBookingAndDurationLimitsModuleLoader,
    bookingRepository: bookingRepositoryModuleLoader,
    luckyUserService: luckyUserServiceModuleLoader,
    userRepository: userRepositoryModuleLoader,
    hashedLinkService: hashedLinkServiceModuleLoader,
    bookingEmailAndSmsTasker: bookingEmailAndSmsTaskerModuleLoader,
    bookingEventHandler: bookingEventHandlerModuleLoader,
    webhookProducer: webhookProducerModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
} satisfies ModuleLoader;

export type { RegularBookingService };
