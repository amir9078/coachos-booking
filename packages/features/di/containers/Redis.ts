import { DI_TOKENS } from "@coachos/features/di/tokens";
import { redisModule } from "@coachos/features/redis/di/redisModule";
import type { IRedisService } from "@coachos/features/redis/IRedisService";
import { type Container, createContainer } from "../di";

const container: Container = createContainer();
container.load(DI_TOKENS.REDIS_CLIENT, redisModule);

export function getRedisService(): IRedisService {
  return container.get<IRedisService>(DI_TOKENS.REDIS_CLIENT);
}
