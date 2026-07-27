import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaBookingRepository as PrismaBookingRepositoryLib } from "@coachos/platform-libraries/repositories";
import type { PrismaClient } from "@coachos/prisma";

@Injectable()
export class PrismaBookingRepository extends PrismaBookingRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}
