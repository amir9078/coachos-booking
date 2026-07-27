import { DI_TOKENS } from "@coachos/features/di/tokens";
import { PrismaSelectedSlotRepository } from "@coachos/features/selectedSlots/repositories/PrismaSelectedSlotRepository";

import { createModule } from "../di";

export const selectedSlotsRepositoryModule = createModule();
selectedSlotsRepositoryModule
  .bind(DI_TOKENS.SELECTED_SLOT_REPOSITORY)
  .toClass(PrismaSelectedSlotRepository, [DI_TOKENS.PRISMA_CLIENT]);
