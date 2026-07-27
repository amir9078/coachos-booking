import { PrismaBookingAuditRepository } from "@coachos/features/booking-audit/lib/repository/PrismaBookingAuditRepository";
import { BOOKING_AUDIT_DI_TOKENS } from "@coachos/features/booking-audit/di/tokens";
import { bindModuleToClassOnToken } from "@coachos/features/di/di";
import { moduleLoader as prismaModuleLoader } from "@coachos/features/di/modules/Prisma";
import { createModule } from "../../di/di";

export const bookingAuditRepositoryModule = createModule();
const token = BOOKING_AUDIT_DI_TOKENS.BOOKING_AUDIT_REPOSITORY;
const moduleToken = BOOKING_AUDIT_DI_TOKENS.BOOKING_AUDIT_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: bookingAuditRepositoryModule,
  moduleToken,
  token,
  classs: PrismaBookingAuditRepository,
  depsMap: {
    prismaClient: prismaModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};
