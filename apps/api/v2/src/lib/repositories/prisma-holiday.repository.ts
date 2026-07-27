import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaHolidayRepository as PrismaHolidayRepositoryLib } from "@coachos/platform-libraries/repositories";
import type { PrismaClient } from "@coachos/prisma";

@Injectable()
export class PrismaHolidayRepository extends PrismaHolidayRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}

