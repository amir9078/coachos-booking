import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@coachos/features/di/di";
import { DI_TOKENS } from "@coachos/features/di/tokens";
import { ProfileRepository } from "@coachos/features/profile/repositories/ProfileRepository";
import { moduleLoader as prismaModuleLoader } from "@coachos/features/di/modules/Prisma";

export const profileRepositoryModule = createModule();
const token = DI_TOKENS.PROFILE_REPOSITORY;
const moduleToken = DI_TOKENS.PROFILE_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: profileRepositoryModule,
  moduleToken,
  token,
  classs: ProfileRepository,
  depsMap: {
    prismaClient: prismaModuleLoader,
  },
});

export const moduleLoader: ModuleLoader = {
  token,
  loadModule,
};
