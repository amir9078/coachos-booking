import { PrismaAuditActorRepository } from "@coachos/features/booking-audit/lib/repository/PrismaAuditActorRepository";
import { BOOKING_AUDIT_DI_TOKENS } from "@coachos/features/booking-audit/di/tokens";
import { bindModuleToClassOnToken } from "@coachos/features/di/di";
import { moduleLoader as prismaModuleLoader } from "@coachos/features/di/modules/Prisma";
import { createModule } from "../../di/di";

export const actorRepositoryModule = createModule();
const token = BOOKING_AUDIT_DI_TOKENS.AUDIT_ACTOR_REPOSITORY;
const moduleToken = BOOKING_AUDIT_DI_TOKENS.AUDIT_ACTOR_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: actorRepositoryModule,
  moduleToken,
  token,
  classs: PrismaAuditActorRepository,
  depsMap: {
    prismaClient: prismaModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};
