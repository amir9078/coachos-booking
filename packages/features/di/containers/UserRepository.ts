import { createContainer } from "@coachos/features/di/di";
import { moduleLoader as userRepositoryModuleLoader } from "@coachos/features/di/modules/User";
import type { UserRepository } from "@coachos/features/users/repositories/UserRepository";

const userRepositoryContainer = createContainer();

export function getUserRepository(): UserRepository {
  userRepositoryModuleLoader.loadModule(userRepositoryContainer);
  return userRepositoryContainer.get<UserRepository>(userRepositoryModuleLoader.token);
}
